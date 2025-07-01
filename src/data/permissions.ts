import { Permission } from '../types';

export const permissions: Permission[] = [
  // Properties permissions
  {
    id: 'properties.view',
    name: 'Visualizar Imóveis',
    description: 'Pode visualizar a lista de imóveis',
    category: 'properties'
  },
  {
    id: 'properties.create',
    name: 'Criar Imóveis',
    description: 'Pode adicionar novos imóveis',
    category: 'properties'
  },
  {
    id: 'properties.edit',
    name: 'Editar Imóveis',
    description: 'Pode editar imóveis existentes',
    category: 'properties'
  },
  {
    id: 'properties.delete',
    name: 'Excluir Imóveis',
    description: 'Pode excluir imóveis',
    category: 'properties'
  },
  
  // Users permissions
  {
    id: 'users.view',
    name: 'Visualizar Usuários',
    description: 'Pode visualizar a lista de usuários administrativos',
    category: 'users'
  },
  {
    id: 'users.create',
    name: 'Criar Usuários',
    description: 'Pode criar novos usuários administrativos',
    category: 'users'
  },
  {
    id: 'users.edit',
    name: 'Editar Usuários',
    description: 'Pode editar usuários existentes',
    category: 'users'
  },
  {
    id: 'users.delete',
    name: 'Excluir Usuários',
    description: 'Pode excluir usuários administrativos',
    category: 'users'
  },
  
  // Agents permissions
  {
    id: 'agents.view',
    name: 'Visualizar Corretores',
    description: 'Pode visualizar a lista de corretores',
    category: 'agents'
  },
  {
    id: 'agents.create',
    name: 'Criar Corretores',
    description: 'Pode adicionar novos corretores',
    category: 'agents'
  },
  {
    id: 'agents.edit',
    name: 'Editar Corretores',
    description: 'Pode editar corretores existentes',
    category: 'agents'
  },
  {
    id: 'agents.delete',
    name: 'Excluir Corretores',
    description: 'Pode excluir corretores',
    category: 'agents'
  },
  
  // Messages permissions
  {
    id: 'messages.view',
    name: 'Visualizar Mensagens',
    description: 'Pode visualizar mensagens de contato',
    category: 'messages'
  },
  {
    id: 'messages.respond',
    name: 'Responder Mensagens',
    description: 'Pode responder mensagens de contato',
    category: 'messages'
  },
  {
    id: 'messages.delete',
    name: 'Excluir Mensagens',
    description: 'Pode excluir mensagens',
    category: 'messages'
  },
  
  // Settings permissions
  {
    id: 'settings.view',
    name: 'Visualizar Configurações',
    description: 'Pode visualizar configurações do sistema',
    category: 'settings'
  },
  {
    id: 'settings.edit',
    name: 'Editar Configurações',
    description: 'Pode editar configurações do sistema',
    category: 'settings'
  }
];

export const rolePermissions = {
  super_admin: permissions.map(p => p.id),
  admin: [
    'properties.view', 'properties.create', 'properties.edit', 'properties.delete',
    'agents.view', 'agents.create', 'agents.edit', 'agents.delete',
    'messages.view', 'messages.respond', 'messages.delete',
    'users.view', 'users.create', 'users.edit',
    'settings.view'
  ],
  editor: [
    'properties.view', 'properties.create', 'properties.edit',
    'agents.view', 'agents.edit',
    'messages.view', 'messages.respond'
  ],
  viewer: [
    'properties.view',
    'agents.view',
    'messages.view'
  ]
};