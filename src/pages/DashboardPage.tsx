import React, { useState, useEffect } from 'react';
import { Building, Users, MessageSquare, Settings, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContextSupabase';
import { useNavigate } from 'react-router-dom';
import UserManagement from '../components/UserManagement';
import Button from '../components/Button';

const DashboardPage: React.FC = () => {
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: Building, permission: null },
    { id: 'users', name: 'Usuários', icon: Users, permission: 'users.view' },
    { id: 'properties', name: 'Imóveis', icon: Building, permission: 'properties.view' },
    { id: 'messages', name: 'Mensagens', icon: MessageSquare, permission: 'messages.view' },
    { id: 'settings', name: 'Configurações', icon: Settings, permission: 'settings.view' }
  ].filter(tab => !tab.permission || hasPermission(tab.permission));

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'overview':
      default:
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Building className="text-blue-900" size={24} />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600">Total de Imóveis</p>
                    <p className="text-2xl font-bold text-gray-800">156</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Building className="text-green-700" size={24} />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600">Imóveis Ativos</p>
                    <p className="text-2xl font-bold text-gray-800">142</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Users className="text-amber-700" size={24} />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600">Corretores</p>
                    <p className="text-2xl font-bold text-gray-800">12</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <MessageSquare className="text-purple-700" size={24} />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600">Mensagens</p>
                    <p className="text-2xl font-bold text-gray-800">28</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Properties */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Imóveis Recentes</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#12345</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Apartamento Moderno</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Venda</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ 450.000</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Ativo
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
              <p className="text-gray-600">Bem-vindo, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield size={16} />
                <span>{user.role === 'super_admin' ? 'Super Admin' : 
                       user.role === 'admin' ? 'Admin' : 
                       user.role === 'editor' ? 'Editor' : 'Visualizador'}</span>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-sm p-4 mr-8">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} className="mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;