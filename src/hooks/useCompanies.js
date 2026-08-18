import { useState, useEffect } from 'react';
import { companiesService } from '../services/companies';

export const useCompanies = (initialFilters = {}) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompanies = async (filters = initialFilters) => {
    setLoading(true);
    setError(null);
    try {
      // Mock data for MVP initial structure
      const mockCompanies = [
        {
          id: 'comp_1',
          name: 'Iberia Gourmet SL',
          sector: 'Alimentación y Bebidas (HORECA)',
          region: 'Cataluña',
          description: 'Fabricante de aceites de oliva virgen extra premium y conservas artesanales de alta gama.',
          productsCount: 12,
          seekingAgents: 4,
          commission: '15% sobre ventas netas',
          verified: true
        },
        {
          id: 'comp_2',
          name: 'SolarTech Solutions',
          sector: 'Energías Renovables',
          region: 'Comunidad de Madrid',
          description: 'Sistemas de autoconsumo fotovoltaico para naves industriales y pymes.',
          productsCount: 6,
          seekingAgents: 8,
          commission: '8% a 12% + Bonus',
          verified: true
        },
        {
          id: 'comp_3',
          name: 'NovaPharma Care',
          sector: 'Salud y Farmacia',
          region: 'Comunidad Valenciana',
          description: 'Línea de dermocosmética y complementos nutricionales para farmacias y clínicas.',
          productsCount: 24,
          seekingAgents: 5,
          commission: '20% recurrente',
          verified: false
        }
      ];
      setCompanies(mockCompanies);
    } catch (err) {
      setError(err.message || 'Error al cargar empresas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return { companies, loading, error, refetch: fetchCompanies };
};

export default useCompanies;
