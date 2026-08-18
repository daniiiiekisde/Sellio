import { useState, useEffect } from 'react';
import { opportunitiesService } from '../services/opportunities';

export const useOpportunities = (initialFilters = {}) => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOpportunities = async (filters = initialFilters) => {
    setLoading(true);
    setError(null);
    try {
      const mockOpportunities = [
        {
          id: 'opp_1',
          title: 'Expansión de Canal HORECA y Tiendas Gourmet en Cataluña',
          company: 'Iberia Gourmet SL',
          sector: 'Alimentación y Bebidas (HORECA)',
          targetTerritory: 'Cataluña / Baleares',
          commissionRate: '15% sobre ventas netas',
          requirements: 'Cartera activa de restaurantes, hoteles o canal retail gourmet',
          status: 'Activa',
          productIds: ['prod_1'],
          description: 'Buscamos agente comercial colegiado o empresa de representación con experiencia demostrable para introducir nuestro AOVE de alta gama en restaurantes con estrella y tiendas gourmet de Barcelona y Girona.',
          matchScore: 95
        },
        {
          id: 'opp_2',
          title: 'Representante Técnico Comercial para Soluciones Fotovoltaicas Industriales',
          company: 'SolarTech Solutions',
          sector: 'Energías Renovables',
          targetTerritory: 'Zona Centro / Levante',
          commissionRate: '10% por proyecto cerrado (Media 3.500€/operación)',
          requirements: 'Conexión con naves industriales, pymes y sector agropecuario',
          status: 'Activa',
          productIds: ['prod_2'],
          description: 'Seleccionamos profesionales independientes para captar proyectos de autoconsumo industrial de 20kW a 200kW con respaldo de ingeniería propia y financiación directa.',
          matchScore: 89
        },
        {
          id: 'opp_3',
          title: 'Distribución Exclusiva en Farmacias y Clínicas de Medicina Estética',
          company: 'NovaPharma Care',
          sector: 'Salud y Farmacia',
          targetTerritory: 'Comunidad de Madrid',
          commissionRate: '22% recurrente sobre reposiciones',
          requirements: 'Acceso directo a titulares de oficina de farmacia o dermatólogos',
          status: 'Activa',
          productIds: ['prod_3'],
          description: 'Lanzamiento de línea dermocosmética con soporte publicitario, muestras gratuitas para captación y comisiones garantizadas sobre pedidos iniciales y reposición periódica.',
          matchScore: 82
        }
      ];
      setOpportunities(mockOpportunities);
    } catch (err) {
      setError(err.message || 'Error al cargar oportunidades');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return { opportunities, loading, error, refetch: fetchOpportunities };
};

export default useOpportunities;
