import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  MapPin,
  Briefcase,
  Layers,
  ArrowRight,
  ArrowLeft,
  Check,
  Building2,
  TrendingUp,
  Percent,
  X
} from 'lucide-react';
import { Modal, Button } from '../common';
import './onboarding.css';

const SECTORS_LIST = [
  'Alimentación y Bebidas (HORECA)',
  'Tecnología y Software B2B',
  'Industrial y Maquinaria',
  'Salud y Farmacia / Cosmética',
  'Construcción y Materiales',
  'Energías Renovables',
  'Servicios a Empresas'
];

const REGIONS_LIST = [
  'Cataluña',
  'Madrid',
  'Andalucía',
  'Comunidad Valenciana',
  'País Vasco',
  'España (Nacional)',
  'Internacional / Exportación'
];

export const SellerOnboardingModal = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [step, setStep] = useState(1);
  const [selectedSectors, setSelectedSectors] = useState(['Alimentación y Bebidas (HORECA)']);
  const [selectedRegions, setSelectedRegions] = useState(['Cataluña']);
  const [experienceYears, setExperienceYears] = useState('5-8 años');
  const [selectedLanguages, setSelectedLanguages] = useState(['Español', 'Catalán']);
  const [commissionPreference, setCommissionPreference] = useState('high_percentage'); // 'high_percentage' | 'fixed_recurring' | 'balanced'

  const toggleItem = (list, setList, item) => {
    if (list.includes(item)) {
      if (list.length > 1) {
        setList(list.filter(i => i !== item));
      }
    } else {
      setList([...list, item]);
    }
  };

  const handleFinish = () => {
    const preferences = {
      sectors: selectedSectors,
      regions: selectedRegions,
      years_experience: experienceYears === '5-8 años' ? 6 : experienceYears === '>8 años' ? 10 : 3,
      languages: selectedLanguages,
      commissionPreference
    };
    if (onComplete) {
      onComplete(preferences);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configuración de Perfil Comercial Inteligente"
      size="medium"
    >
      <div style={{ padding: '0.5rem 0' }}>
        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: '2px', background: '#e2e8f0', zIndex: 0 }} />
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: step >= num ? 'var(--primary)' : '#ffffff',
                border: step >= num ? '2px solid var(--primary)' : '2px solid #cbd5e1',
                color: step >= num ? '#ffffff' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 700,
                position: 'relative',
                zIndex: 1
              }}
            >
              {step > num ? <Check size={16} /> : num}
            </div>
          ))}
        </div>

        {/* Step 1: Sectors */}
        {step === 1 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.2rem', fontWeight: 800 }}>
                ¿En qué sectores tienes cartera o experiencia?
              </h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Sellio te recomendará oportunidades donde tu conversión sea máxima.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {SECTORS_LIST.map((sector) => {
                const isSelected = selectedSectors.includes(sector);
                return (
                  <div
                    key={sector}
                    className={`onboarding-option-pill ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleItem(selectedSectors, setSelectedSectors, sector)}
                  >
                    <span>{sector}</span>
                    {isSelected && <Check size={16} color="var(--primary)" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Regions */}
        {step === 2 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.2rem', fontWeight: 800 }}>
                ¿Qué territorio comercial cubres?
              </h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Selecciona tus zonas habituales de visita o distribución.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {REGIONS_LIST.map((region) => {
                const isSelected = selectedRegions.includes(region);
                return (
                  <div
                    key={region}
                    className={`onboarding-option-pill ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleItem(selectedRegions, setSelectedRegions, region)}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={16} color={isSelected ? 'var(--primary)' : '#94a3b8'} />
                      {region}
                    </span>
                    {isSelected && <Check size={16} color="var(--primary)" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Experience & Languages */}
        {step === 3 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.2rem', fontWeight: 800 }}>
                Tu madurez profesional e idiomas
              </h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Esto incrementará tu Sellio Score de reputación comercial.
              </p>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Años de experiencia en ventas B2B:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {['1-3 años', '5-8 años', '>8 años'].map((exp) => (
                  <button
                    key={exp}
                    type="button"
                    onClick={() => setExperienceYears(exp)}
                    style={{
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-md)',
                      border: experienceYears === exp ? '2px solid var(--primary)' : '1px solid #cbd5e1',
                      background: experienceYears === exp ? '#eff6ff' : '#ffffff',
                      color: experienceYears === exp ? 'var(--primary)' : 'var(--text-primary)',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Idiomas que dominas:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {['Español', 'Catalán', 'Inglés', 'Francés', 'Alemán', 'Italiano'].map((lang) => {
                  const isSelected = selectedLanguages.includes(lang);
                  return (
                    <div
                      key={lang}
                      className={`onboarding-option-pill ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleItem(selectedLanguages, setSelectedLanguages, lang)}
                    >
                      <span>{lang}</span>
                      {isSelected && <Check size={15} />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Outcome / Completion */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
              boxShadow: '0 8px 16px rgba(16, 185, 129, 0.3)'
            }}>
              <Sparkles size={32} />
            </div>

            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.35rem', fontWeight: 900 }}>
              ¡Perfil comercial configurado!
            </h3>
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Hemos analizado el catálogo y encontrado <strong style={{ color: '#059669' }}>14 oportunidades de alta compatibilidad</strong> para tu territorio ({selectedRegions.join(', ')}) y sectores afines.
            </p>

            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 'var(--radius-xl)',
              padding: '1.25rem',
              textAlign: 'left',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
                Resumen de Compatibilidad
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem' }}>
                <div>📍 Territorios: <strong>{selectedRegions.join(', ')}</strong></div>
                <div>🏷️ Sectores: <strong>{selectedSectors.join(', ')}</strong></div>
                <div>⭐ Sellio Match Promedio: <strong style={{ color: '#059669' }}>94%</strong></div>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={handleFinish}
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 800 }}
            >
              <span>Explorar Mis Oportunidades Recomendadas</span>
              <ArrowRight size={18} style={{ marginLeft: '6px' }} />
            </Button>
          </div>
        )}

        {/* Footer Navigation */}
        {step < 4 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              style={{
                background: 'transparent',
                border: 'none',
                color: step === 1 ? '#cbd5e1' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: step === 1 ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <ArrowLeft size={16} /> Atrás
            </button>

            <Button
              variant="primary"
              onClick={() => setStep(step + 1)}
            >
              <span>Siguiente</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SellerOnboardingModal;
