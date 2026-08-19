import { supabase, isSupabaseConfigured } from './supabaseClient';
import { salesService } from './sales';
import { agreementsService } from './agreements';
import { opportunitiesService } from './opportunities';
import { requestsService } from './requests';
import { disputesService } from './disputes';

export const analyticsService = {
  /**
   * Métricas reales y deterministas para el Dashboard de la Empresa
   */
  getCompanyMetrics: async (companyId = 'usr_comp_1') => {
    try {
      const sales = await salesService.getAll({ company_id: companyId });
      const agreements = await agreementsService.getAll({ company_id: companyId });
      const opportunities = await opportunitiesService.getAll({ company_id: companyId });
      const requests = await requestsService.getAll();
      const companyRequests = requests.filter(r => r.company_id === companyId || r.companyName === 'Iberia Gourmet SL');

      const totalVolume = sales.reduce((acc, s) => acc + (Number(s.sale_value) || 0), 0);
      const totalCommercialCommissions = sales.reduce((acc, s) => acc + (Number(s.commercial_commission_amount) || 0), 0);
      const totalSellioFee = sales.reduce((acc, s) => acc + (Number(s.sellio_commission_amount) || 0), 0);
      const netCompanyRevenue = totalVolume - totalCommercialCommissions - totalSellioFee;

      const activeSellersSet = new Set(agreements.filter(a => a.status === 'active').map(a => a.seller_id));
      const pendingRequests = companyRequests.filter(r => r.status === 'Pendiente' || r.status === 'pending');
      const conversionRate = companyRequests.length > 0
        ? Math.round((sales.length / companyRequests.length) * 100 * 10) / 10
        : 0;

      return {
        totalVolume,
        totalCommercialCommissions,
        totalSellioFee,
        netCompanyRevenue,
        activeSellersCount: activeSellersSet.size,
        activeOpportunitiesCount: opportunities.length,
        pendingRequestsCount: pendingRequests.length,
        conversionRate,
        hasRealData: sales.length > 0 || agreements.length > 0 || opportunities.length > 0
      };
    } catch (e) {
      console.error('Error computing company metrics:', e);
      return {
        totalVolume: 0,
        totalCommercialCommissions: 0,
        totalSellioFee: 0,
        netCompanyRevenue: 0,
        activeSellersCount: 0,
        activeOpportunitiesCount: 0,
        pendingRequestsCount: 0,
        conversionRate: 0,
        hasRealData: false
      };
    }
  },

  /**
   * Métricas reales para el Dashboard del Comercial
   */
  getSellerMetrics: async (sellerId = 'usr_seller_1') => {
    try {
      const sales = await salesService.getAll({ seller_id: sellerId });
      const agreements = await agreementsService.getAll({ seller_id: sellerId });
      const requests = await requestsService.getAll();
      const sellerRequests = requests.filter(r => r.seller_id === sellerId || r.sellerId === 'sell_1');

      const totalEarned = sales.reduce((acc, s) => acc + (Number(s.commercial_commission_amount) || 0), 0);
      const totalVolume = sales.reduce((acc, s) => acc + (Number(s.sale_value) || 0), 0);
      const activeAgreements = agreements.filter(a => a.status === 'active');

      return {
        totalEarned,
        totalVolume,
        confirmedSalesCount: sales.length,
        activeAgreementsCount: activeAgreements.length,
        sentRequestsCount: sellerRequests.length,
        rating: sales.length >= 5 ? 4.8 : null, // null si no tiene histórico suficiente
        level: sales.length >= 20 ? 'EXPERT' : sales.length >= 5 ? 'PRO' : sales.length > 0 ? 'ACTIVE' : 'NEW',
        hasRealData: sales.length > 0 || agreements.length > 0
      };
    } catch (e) {
      console.error('Error computing seller metrics:', e);
      return {
        totalEarned: 0,
        totalVolume: 0,
        confirmedSalesCount: 0,
        activeAgreementsCount: 0,
        sentRequestsCount: 0,
        rating: null,
        level: 'NEW',
        hasRealData: false
      };
    }
  },

  /**
   * Métricas reales para el Panel Global de Administrador
   */
  getAdminGlobalMetrics: async () => {
    try {
      if (isSupabaseConfigured() && supabase) {
        const [
          { count: compCount },
          { count: sellerCount },
          { count: oppCount },
          { data: salesData },
          { data: reqData },
          { data: agrData },
          { data: disputeData }
        ] = await Promise.all([
          supabase.from('company_profiles').select('*', { count: 'exact', head: true }),
          supabase.from('seller_profiles').select('*', { count: 'exact', head: true }),
          supabase.from('opportunities').select('*', { count: 'exact', head: true }),
          supabase.from('sales').select('sale_value, commercial_commission_amount, sellio_commission_amount'),
          supabase.from('seller_opportunity_requests').select('status'),
          supabase.from('agreements').select('status'),
          supabase.from('disputes').select('status')
        ]);

        const totalVol = (salesData || []).reduce((acc, s) => acc + (Number(s.sale_value) || 0), 0);
        const totalComm = (salesData || []).reduce((acc, s) => acc + (Number(s.commercial_commission_amount) || 0), 0);
        const totalSellio = (salesData || []).reduce((acc, s) => acc + (Number(s.sellio_commission_amount) || 0), 0);

        const totalRequests = (reqData || []).length;
        const totalAgreements = (agrData || []).length;
        const matchSuccess = totalRequests > 0 ? `${Math.round((totalAgreements / totalRequests) * 100 * 10) / 10}%` : '0%';

        const totalDisputes = (disputeData || []).length;
        const resolvedDisputes = (disputeData || []).filter(d => d.status === 'resolved' || d.status === 'rejected').length;
        const disputeRate = totalDisputes > 0 ? `${Math.round((resolvedDisputes / totalDisputes) * 100)}%` : '100%';

        return {
          totalCompanies: compCount || 0,
          totalSellers: sellerCount || 0,
          totalOpportunities: oppCount || 0,
          totalVolume: totalVol,
          totalCommissionsPaid: totalComm,
          totalPlatformRevenue: totalSellio,
          matchingSuccessRate: matchSuccess,
          disputeResolutionRate: disputeRate
        };
      }

      const allSales = await salesService.getAll();
      const allOpps = await opportunitiesService.getAll();
      const allAgr = await agreementsService.getAll();
      const allReqs = await requestsService.getAll();
      const allDisputes = await disputesService.getAll();

      const totalVol = allSales.reduce((acc, s) => acc + (Number(s.sale_value) || 0), 0);
      const totalComm = allSales.reduce((acc, s) => acc + (Number(s.commercial_commission_amount) || 0), 0);
      const totalSellio = allSales.reduce((acc, s) => acc + (Number(s.sellio_commission_amount) || 0), 0);

      const matchSuccess = allReqs.length > 0 ? `${Math.round((allAgr.length / allReqs.length) * 100 * 10) / 10}%` : '0%';
      const resolvedDisputes = allDisputes.filter(d => d.status === 'resolved').length;
      const disputeRate = allDisputes.length > 0 ? `${Math.round((resolvedDisputes / allDisputes.length) * 100)}%` : '100%';

      return {
        totalCompanies: 2,
        totalSellers: 2,
        totalOpportunities: allOpps.length,
        totalVolume: totalVol,
        totalCommissionsPaid: totalComm,
        totalPlatformRevenue: totalSellio,
        matchingSuccessRate: matchSuccess,
        disputeResolutionRate: disputeRate
      };
    } catch (e) {
      console.error('Error computing admin metrics:', e);
      return {
        totalCompanies: 0,
        totalSellers: 0,
        totalOpportunities: 0,
        totalVolume: 0,
        totalCommissionsPaid: 0,
        totalPlatformRevenue: 0,
        matchingSuccessRate: '0%',
        disputeResolutionRate: '100%'
      };
    }
  }
};

export default analyticsService;
