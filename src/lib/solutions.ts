export interface SolutionServer {
  slug: string
  name: string
}

export interface SolutionGroup {
  id: string
  name: string
  shortName: string
  emoji: string
  hex: string
  description: string
  servers: SolutionServer[]
}

export interface Solution {
  slug: string
  title: string
  subtitle: string
  description: string
  emoji: string
  groups: SolutionGroup[]
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'despacho-legal',
    title: 'Despacho Legal',
    subtitle: 'De la investigación jurídica a la facturación, sin fricciones',
    description:
      'Un stack de IA conectado que cubre investigación de jurisprudencia, redacción de contratos, seguimiento de horas facturables, comunicación con clientes y due diligence corporativo. Cada pieza se comunica a través del asistente de IA.',
    emoji: '⚖️',
    groups: [
      {
        id: 'investigacion',
        name: 'Investigación Legal',
        shortName: 'Investigación',
        emoji: '🔍',
        hex: '#3b82f6',
        description:
          'Acceso instantáneo a legislación federal, estatal y verificación de cumplimiento normativo',
        servers: [
          { slug: 'legislacion-federal-eeuu-mcp', name: 'Legislación Federal EE.UU.' },
          { slug: 'inteligencia-legislativa-estatal-mcp', name: 'Legislación Estatal' },
          { slug: 'cumplimiento-gdpr-mcp', name: 'GDPR / AI Act' },
          { slug: 'investigacion-web-exa-mcp', name: 'Investigación Web' },
        ],
      },
      {
        id: 'documentos',
        name: 'Documentos',
        shortName: 'Documentos',
        emoji: '📄',
        hex: '#6366f1',
        description:
          'Genera, extrae y gestiona documentos jurídicos desde plantillas hasta conocimiento indexado',
        servers: [
          { slug: 'plantillas-juridicas-mcp', name: 'Plantillas Jurídicas' },
          { slug: 'extraccion-documentos-pdf-mcp', name: 'Extracción PDF' },
          { slug: 'generacion-pdf-mcp', name: 'Generación PDF' },
          { slug: 'plataforma-rag-conocimiento-mcp', name: 'Base de Conocimiento' },
          { slug: 'conversion-documentos-mcp', name: 'Conversión Documentos' },
        ],
      },
      {
        id: 'facturacion',
        name: 'Facturación y Tiempo',
        shortName: 'Facturación',
        emoji: '⏱️',
        hex: '#22c55e',
        description:
          'Registro automático de horas facturables, contabilidad e ingresos por retainer',
        servers: [
          { slug: 'seguimiento-tiempo-harvest-mcp', name: 'Harvest Tiempo' },
          { slug: 'toggl-tiempo-mcp', name: 'Toggl Track' },
          { slug: 'xero-contabilidad-mcp', name: 'Xero Contabilidad' },
          { slug: 'chargebee-suscripciones-mcp', name: 'Retainers (Chargebee)' },
        ],
      },
      {
        id: 'comunicacion',
        name: 'Comunicación',
        shortName: 'Comunicación',
        emoji: '💬',
        hex: '#0ea5e9',
        description:
          'Email, reuniones con transcripción automática y agenda de citas con clientes',
        servers: [
          { slug: 'google-workspace-mcp', name: 'Google Workspace' },
          { slug: 'reuniones-online-bot-mcp', name: 'Transcripción Reuniones' },
          { slug: 'whatsapp-business-mcp', name: 'WhatsApp Business' },
          { slug: 'calcom-scheduling-mcp', name: 'Cal.com Citas' },
        ],
      },
      {
        id: 'due-diligence',
        name: 'Due Diligence',
        shortName: 'Due Diligence',
        emoji: '🏢',
        hex: '#f59e0b',
        description:
          'Verificación de entidades, KYC y registros corporativos internacionales',
        servers: [
          { slug: 'verificacion-lei-mcp', name: 'Verificación LEI' },
          { slug: 'registros-empresariales-mcp', name: 'Registros Empresariales' },
          { slug: 'companies-house-uk-mcp', name: 'Companies House UK' },
        ],
      },
      {
        id: 'rrhh',
        name: 'RRHH',
        shortName: 'RRHH',
        emoji: '👥',
        hex: '#f97316',
        description:
          'Reclutamiento de asociados y paralegales, contratos de empleo automatizados',
        servers: [
          { slug: 'greenhouse-ats-mcp', name: 'Greenhouse ATS' },
          { slug: 'generacion-documentos-rrhh-mcp', name: 'Documentos RRHH' },
          { slug: 'encuestas-empleados-mcp', name: 'Encuestas Personal' },
        ],
      },
    ],
  },
  {
    slug: 'fabricacion-mediana',
    title: 'Fabricación Mediana',
    subtitle: 'ERP, cadena de suministro y operaciones conectadas con IA',
    description:
      'Desde la gestión de inventario y el cálculo de fletes hasta el seguimiento de tiempos por proyecto y el cumplimiento normativo: un stack que da a los equipos de fabricación visibilidad total de sus operaciones.',
    emoji: '🏭',
    groups: [
      {
        id: 'erp',
        name: 'ERP y Operaciones',
        shortName: 'ERP',
        emoji: '⚙️',
        hex: '#a855f7',
        description:
          'Sistema ERP central con acceso a bases de datos de producción en lenguaje natural',
        servers: [
          { slug: 'odoo-erp-mcp', name: 'Odoo ERP' },
          { slug: 'airtable-crm-inventario-mcp', name: 'Airtable Inventario' },
          { slug: 'mysql-lenguaje-natural-mcp', name: 'MySQL Lenguaje Natural' },
          { slug: 'google-sheets-automatizacion-mcp', name: 'Google Sheets' },
        ],
      },
      {
        id: 'supply-chain',
        name: 'Cadena de Suministro',
        shortName: 'Supply Chain',
        emoji: '🚚',
        hex: '#eab308',
        description:
          'Flete internacional, rutas de camión con restricciones y seguimiento de envíos',
        servers: [
          { slug: 'herramientas-flete-mcp', name: 'Herramientas de Flete' },
          { slug: 'logistica-multioperador-mcp', name: 'Logística Multioperador' },
          { slug: 'rutas-camion-mcp', name: 'Rutas de Camión' },
          { slug: 'envios-multioperador-mcp', name: 'Envíos Multioperador' },
          { slug: 'seguimiento-envios-mcp', name: 'Seguimiento de Envíos' },
          { slug: 'validacion-direcciones-mcp', name: 'Validación Direcciones' },
        ],
      },
      {
        id: 'finanzas',
        name: 'Finanzas',
        shortName: 'Finanzas',
        emoji: '💰',
        hex: '#22c55e',
        description:
          'Contabilidad, facturación y due diligence de proveedores',
        servers: [
          { slug: 'xero-contabilidad-mcp', name: 'Xero Contabilidad' },
          { slug: 'gestion-empresarial-mcp', name: 'Gestión Empresarial' },
          { slug: 'verificacion-lei-mcp', name: 'Verificación LEI' },
          { slug: 'registros-empresariales-mcp', name: 'Registros Empresariales' },
        ],
      },
      {
        id: 'conocimiento',
        name: 'Conocimiento y Cumplimiento',
        shortName: 'Conocimiento',
        emoji: '📚',
        hex: '#14b8a6',
        description:
          'SOPs, manuales técnicos y cumplimiento normativo en base de conocimiento consultable',
        servers: [
          { slug: 'plataforma-rag-conocimiento-mcp', name: 'Base de Conocimiento RAG' },
          { slug: 'cumplimiento-gdpr-mcp', name: 'GDPR / AI Act' },
          { slug: 'extraccion-documentos-pdf-mcp', name: 'Extracción PDF' },
          { slug: 'conversion-documentos-mcp', name: 'Conversión Documentos' },
        ],
      },
      {
        id: 'rrhh',
        name: 'RRHH',
        shortName: 'RRHH',
        emoji: '👷',
        hex: '#f97316',
        description:
          'Reclutamiento de operarios y técnicos, encuestas de clima laboral',
        servers: [
          { slug: 'ats-rrhh-ia-mcp', name: 'ATS RRHH con IA' },
          { slug: 'encuestas-empleados-mcp', name: 'Encuestas Empleados' },
          { slug: 'generacion-documentos-rrhh-mcp', name: 'Documentos RRHH' },
          { slug: 'busqueda-talento-mcp', name: 'Búsqueda de Talento' },
        ],
      },
      {
        id: 'inteligencia',
        name: 'Inteligencia',
        shortName: 'Inteligencia',
        emoji: '📡',
        hex: '#06b6d4',
        description:
          'Clima, noticias del sector e investigación de competidores y proveedores',
        servers: [
          { slug: 'clima-previsiones-mcp', name: 'Clima y Previsiones' },
          { slug: 'noticias-tiempo-real-mcp', name: 'Noticias en Tiempo Real' },
          { slug: 'investigacion-web-exa-mcp', name: 'Investigación Web' },
          { slug: 'gasolineras-recarga-mcp', name: 'Gestión Flota Combustible' },
        ],
      },
    ],
  },
  {
    slug: 'retailer',
    title: 'Comercio Minorista',
    subtitle: 'E-commerce, marketing y logística unificados en un solo flujo',
    description:
      'Gestiona catálogos de productos, campañas multicanal, envíos y atención al cliente con un stack de IA que conecta tu tienda online con operaciones físicas y todos los canales de marketing.',
    emoji: '🛍️',
    groups: [
      {
        id: 'ecommerce',
        name: 'E-commerce',
        shortName: 'E-commerce',
        emoji: '🛒',
        hex: '#d946ef',
        description:
          'Amazon, Shopify, catálogo de productos y análisis de precios de competencia',
        servers: [
          { slug: 'amazon-seller-central-mcp', name: 'Amazon Seller Central' },
          { slug: 'analytics-ecommerce-mcp', name: 'Analytics E-commerce' },
          { slug: 'datos-productos-estructurados-mcp', name: 'Datos de Productos' },
          { slug: 'comparacion-precios-mcp', name: 'Comparación de Precios' },
          { slug: 'dropshipping-aliexpress-shopify-mcp', name: 'Dropshipping AliExpress' },
        ],
      },
      {
        id: 'marketing',
        name: 'Marketing',
        shortName: 'Marketing',
        emoji: '📣',
        hex: '#ec4899',
        description:
          'Email marketing, publicidad en Meta/Google/TikTok y gestión de redes sociales',
        servers: [
          { slug: 'mailchimp-email-marketing-mcp', name: 'Mailchimp Email' },
          { slug: 'facebook-ads-mcp', name: 'Facebook Ads' },
          { slug: 'google-ads-mcp', name: 'Google Ads' },
          { slug: 'meta-ads-automatizacion-mcp', name: 'Meta Ads' },
          { slug: 'instagram-gestion-mcp', name: 'Instagram' },
          { slug: 'redes-sociales-multicanal-mcp', name: 'Redes Multicanal' },
        ],
      },
      {
        id: 'logistica',
        name: 'Logística',
        shortName: 'Logística',
        emoji: '📦',
        hex: '#eab308',
        description:
          'Selección automática de transportista, seguimiento de envíos y validación de direcciones',
        servers: [
          { slug: 'envios-multioperador-mcp', name: 'Envíos Multioperador' },
          { slug: 'seguimiento-envios-mcp', name: 'Seguimiento de Envíos' },
          { slug: 'validacion-direcciones-mcp', name: 'Validación Direcciones' },
          { slug: 'logistica-multioperador-mcp', name: 'Logística y Demanda' },
          { slug: 'doordash-delivery-mcp', name: 'DoorDash Local' },
        ],
      },
      {
        id: 'clientes',
        name: 'Atención al Cliente',
        shortName: 'Clientes',
        emoji: '🎧',
        hex: '#0ea5e9',
        description:
          'Tickets de soporte, mensajería WhatsApp y llamadas IA para seguimiento',
        servers: [
          { slug: 'freshdesk-soporte-mcp', name: 'Freshdesk Soporte' },
          { slug: 'whatsapp-business-mcp', name: 'WhatsApp Business' },
          { slug: 'asistente-llamadas-ia-mcp', name: 'Llamadas IA' },
          { slug: 'email-imap-smtp-mcp', name: 'Email IMAP/SMTP' },
        ],
      },
      {
        id: 'finanzas',
        name: 'Finanzas',
        shortName: 'Finanzas',
        emoji: '💳',
        hex: '#22c55e',
        description:
          'Procesamiento de pagos, contabilidad y facturación automatizada',
        servers: [
          { slug: 'xero-contabilidad-mcp', name: 'Xero Contabilidad' },
          { slug: 'gestion-empresarial-mcp', name: 'Gestión Empresarial' },
          { slug: 'braintree-pagos-mcp', name: 'Braintree Pagos' },
          { slug: 'chargebee-suscripciones-mcp', name: 'Suscripciones' },
        ],
      },
      {
        id: 'rrhh',
        name: 'RRHH',
        shortName: 'RRHH',
        emoji: '👥',
        hex: '#f97316',
        description:
          'Contratación de staff estacional y generación rápida de contratos',
        servers: [
          { slug: 'ats-rrhh-ia-mcp', name: 'ATS RRHH' },
          { slug: 'generacion-documentos-rrhh-mcp', name: 'Documentos RRHH' },
          { slug: 'busqueda-talento-mcp', name: 'Búsqueda de Talento' },
        ],
      },
    ],
  },
  {
    slug: 'empresa-servicios',
    title: 'Empresa de Servicios B2B',
    subtitle: 'Operaciones de campo, contratos y facturación para clientes industriales',
    description:
      'Diseñado para empresas que prestan servicios a clientes industriales — minería, construcción, energía. Coordina flotas en campo, gestiona contratos de servicio recurrentes y mantiene el cumplimiento normativo con un stack de IA integrado.',
    emoji: '🏗️',
    groups: [
      {
        id: 'campo',
        name: 'Operaciones de Campo',
        shortName: 'Campo',
        emoji: '🚛',
        hex: '#ef4444',
        description:
          'Rutas de camión con restricciones de carga, combustible y clima para zonas remotas',
        servers: [
          { slug: 'rutas-camion-mcp', name: 'Rutas de Camión' },
          { slug: 'gasolineras-recarga-mcp', name: 'Combustible y Recarga' },
          { slug: 'clima-previsiones-mcp', name: 'Clima y Previsiones' },
          { slug: 'google-maps-navegacion-mcp', name: 'Navegación y Rutas' },
          { slug: 'herramientas-flete-mcp', name: 'Flete y Carga ADR' },
        ],
      },
      {
        id: 'contratos',
        name: 'Contratos y Cumplimiento',
        shortName: 'Contratos',
        emoji: '📋',
        hex: '#64748b',
        description:
          'Contratos de servicio, verificación de clientes y cumplimiento regulatorio',
        servers: [
          { slug: 'plantillas-juridicas-mcp', name: 'Plantillas Jurídicas' },
          { slug: 'generacion-pdf-mcp', name: 'Generación de Contratos' },
          { slug: 'verificacion-lei-mcp', name: 'Verificación LEI' },
          { slug: 'registros-empresariales-mcp', name: 'Registros Empresariales' },
          { slug: 'cumplimiento-gdpr-mcp', name: 'Cumplimiento GDPR' },
        ],
      },
      {
        id: 'facturacion',
        name: 'Facturación',
        shortName: 'Facturación',
        emoji: '🧾',
        hex: '#22c55e',
        description:
          'Facturación recurrente por contrato, horas de campo y contabilidad',
        servers: [
          { slug: 'chargebee-suscripciones-mcp', name: 'Contratos Recurrentes' },
          { slug: 'seguimiento-tiempo-harvest-mcp', name: 'Horas de Campo' },
          { slug: 'xero-contabilidad-mcp', name: 'Xero Contabilidad' },
          { slug: 'gestion-empresarial-mcp', name: 'Gestión Empresarial' },
          { slug: 'calculadora-financiera-mcp', name: 'Calculadora Financiera' },
        ],
      },
      {
        id: 'comunicacion',
        name: 'Comunicación Cliente',
        shortName: 'Comunicación',
        emoji: '📡',
        hex: '#0ea5e9',
        description:
          'Suite de trabajo, mensajería con clientes en campo y transcripción de reuniones',
        servers: [
          { slug: 'microsoft-365-mcp', name: 'Microsoft 365' },
          { slug: 'microsoft-teams-mcp', name: 'Microsoft Teams' },
          { slug: 'whatsapp-business-mcp', name: 'WhatsApp Business' },
          { slug: 'reuniones-online-bot-mcp', name: 'Transcripción Reuniones' },
          { slug: 'calcom-scheduling-mcp', name: 'Visitas a Sitio' },
        ],
      },
      {
        id: 'conocimiento',
        name: 'Conocimiento y Seguridad',
        shortName: 'Conocimiento',
        emoji: '🛡️',
        hex: '#14b8a6',
        description:
          'Manuales de seguridad, procedimientos de campo y documentación técnica indexada',
        servers: [
          { slug: 'plataforma-rag-conocimiento-mcp', name: 'Base de Conocimiento' },
          { slug: 'extraccion-documentos-pdf-mcp', name: 'Extracción Permisos PDF' },
          { slug: 'conversion-documentos-mcp', name: 'Conversión Manuales' },
          { slug: 'box-documentos-mcp', name: 'Box Documentos' },
        ],
      },
      {
        id: 'rrhh',
        name: 'RRHH y Prospección',
        shortName: 'RRHH',
        emoji: '🎯',
        hex: '#f59e0b',
        description:
          'Reclutamiento de técnicos y choferes, y prospección de nuevos clientes industriales',
        servers: [
          { slug: 'greenhouse-ats-mcp', name: 'Greenhouse ATS' },
          { slug: 'encuestas-empleados-mcp', name: 'Encuestas Personal Campo' },
          { slug: 'generacion-documentos-rrhh-mcp', name: 'Documentos RRHH' },
          { slug: 'apollo-prospecting-mcp', name: 'Apollo Prospección B2B' },
          { slug: 'investigacion-web-exa-mcp', name: 'Investigación de Mercado' },
        ],
      },
    ],
  },
]

export function getSolutionBySlug(slug: string): Solution {
  const s = SOLUTIONS.find(s => s.slug === slug)
  if (!s) throw new Error(`Solution not found: ${slug}`)
  return s
}

export function getAllSolutions(): Solution[] {
  return SOLUTIONS
}
