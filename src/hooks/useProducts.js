import { useState, useEffect } from 'react';
import { productsService } from '../services/products';

export const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async (filters = initialFilters) => {
    setLoading(true);
    setError(null);
    try {
      const mockProducts = [
        {
          id: 'prod_1',
          name: 'Aceite de Oliva Virgen Extra Ecológico Gran Selección (500ml)',
          company: 'Iberia Gourmet SL',
          category: 'Alimentación y Bebidas (HORECA)',
          targetTerritory: 'Cataluña / Baleares',
          commissionRate: '15%',
          price: 18.50,
          description: 'Aceite monovarietal de cosecha temprana prensado en frío. Ideal para restaurantes de alta cocina y tiendas gourmet.',
          matchingScore: 94
        },
        {
          id: 'prod_2',
          name: 'Kit Autoconsumo Industrial SolarPro 50kW',
          company: 'SolarTech Solutions',
          category: 'Energías Renovables',
          targetTerritory: 'Nacional (España)',
          commissionRate: '10%',
          price: 14500.00,
          description: 'Solución completa llave en mano con paneles bifaciales y monitorización IoT en tiempo real para sector industrial.',
          matchingScore: 88
        },
        {
          id: 'prod_3',
          name: 'Sérum Rejuvenecedor Celular Bio-Peptide 30ml',
          company: 'NovaPharma Care',
          category: 'Salud y Farmacia',
          targetTerritory: 'Comunidad de Madrid / Levante',
          commissionRate: '22%',
          price: 46.00,
          description: 'Tratamiento dermocosmético con alta concentración de péptidos bioactivos para distribución en farmacias.',
          matchingScore: 79
        }
      ];
      setProducts(mockProducts);
    } catch (err) {
      setError(err.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};

export default useProducts;
