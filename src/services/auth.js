import { supabase, isSupabaseConfigured } from './supabaseClient';
import { USER_ROLES } from '../utils/constants';

// Local storage key for fallback/mock state
const MOCK_USER_STORAGE_KEY = 'sellio_user';

export const authService = {
  /**
   * Registro de nuevo usuario (Company o Seller)
   */
  register: async ({ email, password, role = USER_ROLES.COMPANY, profileData = {} }) => {
    if (isSupabaseConfigured() && supabase) {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            display_name: profileData.displayName || (role === USER_ROLES.COMPANY ? profileData.companyName : profileData.publicAlias)
          }
        }
      });

      if (authError) throw authError;
      const user = authData.user;
      const session = authData.session;
      if (!user) throw new Error('No se pudo crear el usuario.');

      // Si Supabase requiere confirmación de email y no hay sesión activa aún
      if (!session) {
        return {
          success: true,
          requiresConfirmation: true,
          message: 'Registro exitoso. Por favor revisa tu correo electrónico para confirmar tu cuenta.',
          user: { id: user.id, email, role, isDemo: false, ...profileData }
        };
      }

      // Crear perfil común en tabla `profiles`
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.id,
        role: role,
        account_status: 'active',
        display_name: profileData.displayName || (role === USER_ROLES.COMPANY ? profileData.companyName : (profileData.publicAlias || 'Comercial #' + user.id.slice(0, 4))),
        country: profileData.country || 'ES',
        language: profileData.language || 'es'
      });
      if (profileError) console.error('Error al crear profile:', profileError);

      if (role === USER_ROLES.COMPANY) {
        await supabase.from('company_profiles').upsert({
          id: user.id,
          company_name: profileData.companyName || 'Empresa Sin Nombre',
          trade_name: profileData.tradeName || profileData.companyName || 'Empresa Sin Nombre',
          description: profileData.description || '',
          website: profileData.website || '',
          verification_status: 'unverified'
        });
      } else if (role === USER_ROLES.SELLER) {
        const publicAlias = profileData.publicAlias || `Comercial #${user.id.slice(0, 4).toUpperCase()}`;
        await supabase.from('seller_profiles').upsert({
          id: user.id,
          public_alias: publicAlias,
          visibility: 'anonymous',
          professional_bio: profileData.professionalBio || '',
          years_experience: profileData.yearsExperience || 0,
          availability_status: 'available',
          verification_status: 'unverified'
        });

        // Datos privados protegidos por RLS
        await supabase.from('seller_private_data').upsert({
          seller_id: user.id,
          full_legal_name: profileData.fullLegalName || '',
          personal_email: email,
          phone: profileData.phone || ''
        });
      }

      return { 
        success: true, 
        requiresConfirmation: false,
        user: { id: user.id, email, role, isDemo: false, ...profileData } 
      };
    }

    // Mock fallback para desarrollo local
    const mockId = `usr_${Date.now()}`;
    const newUser = {
      id: mockId,
      email,
      role,
      isDemo: true,
      name: role === USER_ROLES.COMPANY 
        ? (profileData.companyName || 'TechNova Soluciones B2B')
        : (profileData.publicAlias || 'Comercial #A482'),
      displayName: profileData.displayName || (role === USER_ROLES.COMPANY ? profileData.companyName : profileData.publicAlias),
      companyName: role === USER_ROLES.COMPANY ? (profileData.companyName || 'TechNova SL') : null,
      publicAlias: role === USER_ROLES.SELLER ? (profileData.publicAlias || 'Comercial #A482') : null,
      verificationStatus: 'verified'
    };
    return { success: true, requiresConfirmation: false, user: newUser };
  },

  /**
   * Inicio de sesión
   */
  login: async ({ email, password, role = USER_ROLES.COMPANY }) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      const user = data.user;

      // Obtener rol y datos de la tabla `profiles`
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      let extendedProfile = {};
      const userRole = profile?.role || role;

      if (userRole === USER_ROLES.COMPANY) {
        const { data: comp } = await supabase.from('company_profiles').select('*').eq('id', user.id).single();
        extendedProfile = comp || {};
      } else if (userRole === USER_ROLES.SELLER) {
        const { data: sell } = await supabase.from('seller_profiles').select('*').eq('id', user.id).single();
        extendedProfile = sell || {};
      }

      const sessionUser = {
        id: user.id,
        email: user.email,
        role: userRole,
        isDemo: false,
        name: profile?.display_name || extendedProfile.company_name || extendedProfile.public_alias || user.email,
        companyName: extendedProfile.company_name,
        publicAlias: extendedProfile.public_alias,
        ...extendedProfile
      };

      return { success: true, user: sessionUser };
    }

    // Mock login
    const mockUser = {
      id: 'usr_demo_123',
      name: role === USER_ROLES.COMPANY ? 'TechNova Soluciones B2B' : 'Comercial #A482',
      email: email || 'demo@sellio.com',
      role: role || USER_ROLES.COMPANY,
      isDemo: true,
      companyName: role === USER_ROLES.COMPANY ? 'TechNova SL' : null,
      publicAlias: role === USER_ROLES.SELLER ? 'Comercial #A482' : null,
      verificationStatus: 'verified'
    };
    return { success: true, user: mockUser };
  },

  /**
   * Cierre de sesión
   */
  logout: async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(MOCK_USER_STORAGE_KEY);
    localStorage.removeItem('sellio_token');
    return { success: true };
  },

  /**
   * Obtener sesión / usuario actual
   */
  getCurrentUser: async () => {
    if (isSupabaseConfigured() && supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;

      const user = session.user;
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      const userRole = profile?.role || USER_ROLES.COMPANY;

      let extendedProfile = {};
      if (userRole === USER_ROLES.COMPANY) {
        const { data: comp } = await supabase.from('company_profiles').select('*').eq('id', user.id).single();
        extendedProfile = comp || {};
      } else if (userRole === USER_ROLES.SELLER) {
        const { data: sell } = await supabase.from('seller_profiles').select('*').eq('id', user.id).single();
        extendedProfile = sell || {};
      }

      return {
        id: user.id,
        email: user.email,
        role: userRole,
        name: profile?.display_name || extendedProfile.company_name || extendedProfile.public_alias || user.email,
        companyName: extendedProfile.company_name,
        publicAlias: extendedProfile.public_alias,
        ...extendedProfile
      };
    }

    const saved = localStorage.getItem(MOCK_USER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  }
};

export default authService;
