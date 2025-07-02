// Exemplo de componente que demonstra o uso do backend
import React, { useState } from 'react';
import { 
  useProperties, 
  useCreateProperty, 
  useUpdateProperty, 
  useDeleteProperty,
  usePagination,
  useSearchFilter
} from '../../hooks/useApi';
import { Property } from '../../types';
import { useAuth } from '../../contexts/AuthContextSupabase';

interface PropertyFilters {
  type?: 'sale' | 'rent';
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  featured?: boolean;
}

const PropertyManager: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const { page, limit, nextPage, prevPage } = usePagination(1, 10);
  const { filters, updateFilter, resetFilters } = useSearchFilter<PropertyFilters>({});
  
  // API hooks
  const { data: propertiesData, loading, error, refetch } = useProperties({ 
    page, 
    limit, 
    ...filters 
  });
  const { createProperty, loading: creating } = useCreateProperty();
  const { updateProperty, loading: updating } = useUpdateProperty();
  const { deleteProperty, loading: deleting } = useDeleteProperty();
  
  // Local state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Property>>({});

  // Form handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (selectedProperty) {
        // Update existing property
        await updateProperty(selectedProperty.id, formData);
        alert('Propriedade atualizada com sucesso!');
      } else {
        // Create new property
        await createProperty(formData as Omit<Property, 'id'>);
        alert('Propriedade criada com sucesso!');
      }
      
      // Reset form and refresh data
      setFormData({});
      setSelectedProperty(null);
      setShowForm(false);
      refetch();
    } catch (error) {
      alert('Erro ao salvar propriedade: ' + error);
    }
  };

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setFormData(property);
    setShowForm(true);
  };

  const handleDelete = async (propertyId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta propriedade?')) {
      try {
        await deleteProperty(propertyId);
        alert('Propriedade excluída com sucesso!');
        refetch();
      } catch (error) {
        alert('Erro ao excluir propriedade: ' + error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  // Check permissions
  const canCreate = hasPermission('properties.create');
  const canUpdate = hasPermission('properties.update');
  const canDelete = hasPermission('properties.delete');

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Acesso Negado</h2>
        <p>Você precisa estar logado para acessar esta página.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestão de Propriedades</h1>
        {canCreate && (
          <button
            onClick={() => {
              setSelectedProperty(null);
              setFormData({});
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Nova Propriedade
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.type || ''}
            onChange={(e) => updateFilter('type', e.target.value as 'sale' | 'rent' || undefined)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Todos os tipos</option>
            <option value="sale">Venda</option>
            <option value="rent">Aluguel</option>
          </select>
          
          <input
            type="text"
            placeholder="Cidade"
            value={filters.city || ''}
            onChange={(e) => updateFilter('city', e.target.value || undefined)}
            className="border rounded-lg px-3 py-2"
          />
          
          <input
            type="number"
            placeholder="Preço mínimo"
            value={filters.minPrice || ''}
            onChange={(e) => updateFilter('minPrice', parseFloat(e.target.value) || undefined)}
            className="border rounded-lg px-3 py-2"
          />
          
          <input
            type="number"
            placeholder="Preço máximo"
            value={filters.maxPrice || ''}
            onChange={(e) => updateFilter('maxPrice', parseFloat(e.target.value) || undefined)}
            className="border rounded-lg px-3 py-2"
          />
        </div>
        
        <div className="mt-4">
          <button
            onClick={resetFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Properties List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Carregando propriedades...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Erro: {error}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {propertiesData?.properties?.map((property: Property) => (
                  <tr key={property.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{property.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        property.type === 'sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {property.type === 'sale' ? 'Venda' : 'Aluguel'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R$ {property.price?.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        property.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {property.status === 'available' ? 'Disponível' : 'Indisponível'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {canUpdate && (
                          <button
                            onClick={() => handleEdit(property)}
                            className="text-blue-600 hover:text-blue-900"
                            disabled={updating}
                          >
                            Editar
                          </button>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => handleDelete(property.id)}
                            className="text-red-600 hover:text-red-900"
                            disabled={deleting}
                          >
                            Excluir
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-700">
              Mostrando {((page - 1) * limit) + 1} a {Math.min(page * limit, propertiesData?.total || 0)} de {propertiesData?.total || 0} propriedades
            </div>
            <div className="flex space-x-2">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="px-3 py-1">
                Página {page} de {Math.ceil((propertiesData?.total || 0) / limit)}
              </span>
              <button
                onClick={nextPage}
                disabled={page >= Math.ceil((propertiesData?.total || 0) / limit)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          </div>
        </>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {selectedProperty ? 'Editar Propriedade' : 'Nova Propriedade'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo *
                  </label>
                  <select
                    name="type"
                    value={formData.type || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="sale">Venda</option>
                    <option value="rent">Aluguel</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preço *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creating || updating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {creating || updating ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManager;