/**
 * SELLIO — Manejo de Errores Estandarizado
 * 
 * Regla: Los errores del backend deben transformarse en mensajes útiles para el usuario.
 * Nunca mostrar errores SQL o trazas de base de datos directamente en la UI.
 */

export const ERROR_CODES = {
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
  NOT_FOUND: 'not_found',
  CONFLICT: 'conflict',
  VALIDATION_ERROR: 'validation_error',
  RATE_LIMIT: 'rate_limit',
  INTERNAL_ERROR: 'internal_error',
  NETWORK_ERROR: 'network_error'
};

/**
 * Transforma un error de Supabase/red/negocio a una estructura amigable y segura
 */
export const normalizeError = (error) => {
  if (!error) return null;

  // Si ya es un objeto formateado
  if (error.isNormalized) return error;

  const rawMessage = error.message || String(error);

  // Errores de RLS / Permisos
  if (rawMessage.includes('row-level security') || rawMessage.includes('permission denied') || error.code === '42501') {
    return {
      code: ERROR_CODES.FORBIDDEN,
      message: 'No tienes permisos suficientes para realizar esta acción o consultar estos datos.',
      isNormalized: true
    };
  }

  // Errores de Clave Duplicada / Unique Constraint
  if (rawMessage.includes('duplicate key') || rawMessage.includes('unique constraint') || error.code === '23505') {
    return {
      code: ERROR_CODES.CONFLICT,
      message: 'El registro ya existe o se ha producido un conflicto con una operación duplicada.',
      isNormalized: true
    };
  }

  // Errores de Check Constraint / Límites
  if (rawMessage.includes('check_sellio_max_commission') || rawMessage.includes('check constraint')) {
    return {
      code: ERROR_CODES.VALIDATION_ERROR,
      message: 'Los valores proporcionados no cumplen con las reglas económicas o límites de la plataforma.',
      isNormalized: true
    };
  }

  // Errores de No Encontrado
  if (error.code === 'PGRST116' || rawMessage.includes('not found')) {
    return {
      code: ERROR_CODES.NOT_FOUND,
      message: 'El recurso solicitado no fue encontrado o ya no está disponible.',
      isNormalized: true
    };
  }

  // Errores de Red / Timeout
  if (rawMessage.includes('Failed to fetch') || rawMessage.includes('network') || rawMessage.includes('timeout')) {
    return {
      code: ERROR_CODES.NETWORK_ERROR,
      message: 'Error de conexión. Por favor, comprueba tu conexión a internet e inténtalo de nuevo.',
      isNormalized: true
    };
  }

  // Error genérico controlado
  return {
    code: ERROR_CODES.INTERNAL_ERROR,
    message: 'Se ha producido un error inesperado al procesar tu solicitud. Por favor, inténtalo de nuevo.',
    details: process.env.NODE_ENV === 'development' ? rawMessage : undefined,
    isNormalized: true
  };
};
