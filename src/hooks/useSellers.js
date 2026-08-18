import { useState, useEffect } from 'react';
import { sellersService } from '../services/sellers';

export const useSellers = (initialFilters = {}) => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSellers = async (filters = initialFilters) => {
    setLoading(true);
    setError(null);
    try {
      const mockSellers = [
        {
          id: 'sell_1',
          name: 'Carlos Méndez',
          sector: 'Alimentación y Bebidas (HORECA)',
          region: 'Cataluña (Barcelona y Girona)',
          experience: '12 años',
          portfolioCount: 65,
          headline: 'Especialista en distribución gourmet y canal horeca premium',
          bio: 'Agente comercial colegiado con cartera consolidada de restaurantes gastronómicos, cadenas hoteleras y tiendas de delicatessen.',
          rating: 4.9,
          verified: true
        },
        {
          id: 'sell_2',
          name: 'Marta Soler',
          sector: 'Salud y Farmacia',
          region: 'Comunidad de Madrid',
          experience: '8 años',
          portfolioCount: 42,
          headline: 'Delegada comercial de farmacias y parafarmacias',
          bio: 'Representación activa en más de 80 oficinas de farmacia y centros de estética avanzada en Madrid y Toledo.',
          rating: 4.8,
          verified: true
        },
        {
          id: 'sell_3',
          name: 'Javier Navarro',
          sector: 'Energías Renovables e Industria',
          region: 'Zona Levante / Valencia',
          experience: '15 años',
          portfolioCount: 110,
          headline: 'Consultor comercial para proyectos industriales B2B',
          bio: 'Foco en ahorro energético y soluciones técnicas para naves logísticas e industrias agroalimentarias.',
          rating: 4.7,
          verified: true
        }
      ];
      setSellers(mockSellers);
    } catch (err) {
      setError(err.message || 'Error al cargar comerciales');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return { sellers, loading, error, refetch: fetchSellers };
};

export default useSellers;
