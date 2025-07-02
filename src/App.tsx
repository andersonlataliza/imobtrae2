import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContextSupabase';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import PropertiesPage from './pages/PropertiesPage';
import AgentsPage from './pages/AgentsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="properties" element={<PropertiesPage />} />
            <Route path="properties/:id" element={<PropertyDetailsPage />} />
            <Route path="buy" element={<PropertiesPage />} />
            <Route path="rent" element={<PropertiesPage />} />
            <Route path="agents" element={<AgentsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;