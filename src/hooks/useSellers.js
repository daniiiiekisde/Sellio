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
          anonymousId: 'COMERCIAL #A482',
          isAnonymous: true,
          alias: 'Comercial #A482',
          sector: 'Alimentación y Bebidas (HORECA)',
          region: 'Cataluña (Barcelona y Girona)',
          experienceYears: 12,
          experience: '+12 años de experiencia',
          specialization: 'Canal HORECA y Alimentación Gourmet',
          languages: ['Español', 'Catalán', 'Inglés'],
          clientType: 'Restaurantes de alta gama, Hoteles, Tiendas Delicatessen',
          headline: 'Especialista en distribución gourmet y canal horeca premium',
          bio: 'Cartera consolidada de más de 80 restaurantes gastronómicos, cadenas hoteleras y tiendas de delicatessen. Enfoque en productos de alta rotación y margen.',
          portfolioCount: 65,
          rating: 4.9,
          verified: true,
          matchScore: 95
        },
        {
          id: 'sell_2',
          anonymousId: 'COMERCIAL #M719',
          isAnonymous: true,
          alias: 'Comercial #M719',
          sector: 'Salud y Farmacia',
          region: 'Comunidad de Madrid',
          experienceYears: 8,
          experience: '+8 años de experiencia',
          specialization: 'Oficinas de Farmacia y Centros Dermocosméticos',
          languages: ['Español', 'Inglés'],
          clientType: 'Farmacias, Clínicas estéticas, Parafarmacias',
          headline: 'Representación activa en oficinas de farmacia y parafarmacias',
          bio: 'Presencia continua en más de 80 farmacias y centros estéticos en Madrid y Toledo con alta capacidad de introducción de nuevos laboratorios.',
          portfolioCount: 42,
          rating: 4.8,
          verified: true,
          matchScore: 91
        },
        {
          id: 'sell_3',
          anonymousId: 'COMERCIAL #J304',
          isAnonymous: true,
          alias: 'Comercial #J304',
          sector: 'Energías Renovables e Industria',
          region: 'Zona Levante / Valencia',
          experienceYears: 15,
          experience: '+15 años de experiencia',
          specialization: 'Soluciones Técnicas B2B y Eficiencia Energética',
          languages: ['Español', 'Valenciano', 'Francés'],
          clientType: 'Naves industriales, Pymes logísticas, Cooperativas agroalimentarias',
          headline: 'Consultor comercial para proyectos industriales y fotovoltaica',
          bio: 'Foco en ahorro energético y soluciones técnicas para naves logísticas e industrias. Red de contactos a nivel gerencial y compras técnicas.',
          portfolioCount: 110,
          rating: 4.7,
          verified: true,
          matchScore: 88
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
