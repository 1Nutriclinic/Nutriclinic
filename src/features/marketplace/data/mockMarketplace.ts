import type { MarketplaceItem } from '../types'

export const MOCK_MARKETPLACE: MarketplaceItem[] = [
  { id: 'mp1', name: 'Plan Gestante Trimestre 2', author: 'NutriClinic Labs', category: 'template', description: 'Plantilla completa 2200 kcal para segundo trimestre.', longDescription: 'Incluye 7 días de menú, lista de compras y macros calculados.', price: 0, pricing: 'free', rating: 4.8, reviewCount: 124, installCount: 2840, icon: '🤰', tags: ['Gestante', '2200 kcal'], featured: true, installed: true, version: '2.1.0' },
  { id: 'mp2', name: 'Obesidad — Déficit 500 kcal', author: 'Dr. Fernández', category: 'template', description: 'Plan hipocalórico modular con 3 variantes de proteína.', longDescription: 'Adaptable a 1600–2000 kcal con intercambios de alimentos.', price: 49, pricing: 'paid', rating: 4.6, reviewCount: 89, installCount: 1520, icon: '⚖️', tags: ['Obesidad', 'Hipocalórico'], featured: true, installed: false, version: '1.4.2' },
  { id: 'mp3', name: 'Percentiles OMS Pediatría', author: 'OMS Digital', category: 'module', description: 'Curvas de crecimiento OMS integradas en historia clínica.', longDescription: 'Percentiles peso/talla/IMC con alertas automáticas.', price: 29, pricing: 'subscription', rating: 4.9, reviewCount: 56, installCount: 980, icon: '👶', tags: ['Pediatría', 'OMS'], featured: true, installed: true, version: '3.0.1' },
  { id: 'mp4', name: 'WhatsApp Campaigns Pro', author: 'ConnectHealth', category: 'extension', description: 'Automatizaciones avanzadas de campañas WhatsApp.', longDescription: 'Segmentación, A/B testing y métricas de conversión.', price: 79, pricing: 'subscription', rating: 4.4, reviewCount: 42, installCount: 620, icon: '📱', tags: ['CRM', 'WhatsApp'], featured: false, installed: false, version: '1.2.0' },
  { id: 'mp5', name: 'Reportes PDF Premium', author: 'NutriClinic Labs', category: 'extension', description: 'Plantillas PDF personalizables con logo de clínica.', longDescription: 'Informes de evolución, planes alimenticios y consentimientos.', price: 39, pricing: 'paid', rating: 4.7, reviewCount: 67, installCount: 1100, icon: '📄', tags: ['Reportes', 'PDF'], featured: false, installed: true, version: '2.0.0' },
  { id: 'mp6', name: 'Deportistas — Alto rendimiento', author: 'SportNutri', category: 'template', description: 'Plan 3200 kcal para atletas de resistencia.', longDescription: 'Periodización nutricional pre/durante/post entrenamiento.', price: 59, pricing: 'paid', rating: 4.5, reviewCount: 31, installCount: 410, icon: '🏋️', tags: ['Deportistas', '3200 kcal'], featured: false, installed: false, version: '1.1.0' },
  { id: 'mp7', name: 'Tema Clínico Oscuro Pro', author: 'UI Studio', category: 'theme', description: 'Tema oscuro optimizado para consultorios con poca luz.', longDescription: 'Contraste WCAG AA, colores suaves y tipografía legible.', price: 0, pricing: 'free', rating: 4.3, reviewCount: 28, installCount: 890, icon: '🌙', tags: ['Tema', 'Dark mode'], featured: false, installed: false, version: '1.0.3' },
  { id: 'mp8', name: 'Diabetes T2 — Low GI', author: 'EndoNutri', category: 'template', description: 'Plan 1800 kcal bajo índice glucémico.', longDescription: 'Control de carbohidratos, intercambios y guía de porciones.', price: 45, pricing: 'paid', rating: 4.8, reviewCount: 73, installCount: 1340, icon: '🩺', tags: ['Diabetes', 'Low GI'], featured: false, installed: false, version: '2.2.0' },
  { id: 'mp9', name: 'Integración LabCorp', author: 'LabConnect', category: 'module', description: 'Conector directo con laboratorios LabCorp LATAM.', longDescription: 'Importación HL7/FHIR de resultados en tiempo real.', price: 99, pricing: 'subscription', rating: 4.2, reviewCount: 19, installCount: 280, icon: '🔬', tags: ['Laboratorio', 'Integración'], featured: false, installed: false, version: '1.0.0' },
  { id: 'mp10', name: 'Adulto Mayor — MNA Completo', author: 'GeriatricNutri', category: 'template', description: 'Evaluación MNA y plan de fortificación proteica.', longDescription: 'Formulario MNA integrado + menús blandos y fortificados.', price: 35, pricing: 'paid', rating: 4.6, reviewCount: 24, installCount: 350, icon: '👴', tags: ['Adulto mayor', 'MNA'], featured: false, installed: false, version: '1.3.0' },
]

export function getMarketplaceStats(items: MarketplaceItem[]) {
  return {
    total: items.length,
    installed: items.filter((i) => i.installed).length,
    featured: items.filter((i) => i.featured).length,
    free: items.filter((i) => i.pricing === 'free').length,
  }
}
