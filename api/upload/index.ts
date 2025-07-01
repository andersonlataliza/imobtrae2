import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'POST':
        return await uploadFile(req, res);
      case 'DELETE':
        return await deleteFile(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Upload API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function uploadFile(req: VercelRequest, res: VercelResponse) {
  const form = formidable({
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowEmptyFiles: false,
    multiples: true
  });

  try {
    const [fields, files] = await form.parse(req);
    const { bucket = 'property-images' } = fields;
    
    if (!files.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const fileArray = Array.isArray(files.file) ? files.file : [files.file];
    const uploadedFiles: Array<{
      fileName: string;
      filePath: string;
      publicUrl: string;
      size: number;
      type: string | null;
    }> = [];

    for (const file of fileArray) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.mimetype || '')) {
        return res.status(400).json({ 
          error: `Tipo de arquivo não permitido: ${file.mimetype}. Use JPEG, PNG, WebP ou GIF.` 
        });
      }

      // Generate unique filename
      const fileExtension = path.extname(file.originalFilename || '');
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}${fileExtension}`;
      const filePath = `${bucket}/${fileName}`;

      // Read file buffer
      const fileBuffer = fs.readFileSync(file.filepath);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket as string)
        .upload(filePath, fileBuffer, {
          contentType: file.mimetype || 'image/jpeg',
          upsert: false
        });

      if (error) {
        console.error('Supabase upload error:', error);
        return res.status(400).json({ error: `Erro ao fazer upload: ${error.message}` });
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket as string)
        .getPublicUrl(filePath);

      uploadedFiles.push({
        fileName,
        filePath,
        publicUrl: urlData.publicUrl,
        size: file.size,
        type: file.mimetype
      });

      // Clean up temporary file
      fs.unlinkSync(file.filepath);
    }

    return res.status(200).json({
      message: 'Upload realizado com sucesso',
      files: uploadedFiles
    });

  } catch (error) {
    console.error('Form parse error:', error);
    return res.status(400).json({ error: 'Erro ao processar upload' });
  }
}

async function deleteFile(req: VercelRequest, res: VercelResponse) {
  const { filePath, bucket = 'property-images' } = req.query;

  if (!filePath) {
    return res.status(400).json({ error: 'Caminho do arquivo é obrigatório' });
  }

  try {
    const { error } = await supabase.storage
      .from(bucket as string)
      .remove([filePath as string]);

    if (error) {
      console.error('Supabase delete error:', error);
      return res.status(400).json({ error: `Erro ao deletar arquivo: ${error.message}` });
    }

    return res.status(200).json({ message: 'Arquivo deletado com sucesso' });
  } catch (error) {
    console.error('Delete file error:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}