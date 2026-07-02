import type { ClinicalRecord } from '../types'



const BASE_RECORD: Omit<ClinicalRecord, 'patientId'> = {

  personalInfo: {

    bloodType: 'O+',

    allergies: ['Mariscos', 'Lactosa (leve)'],

    emergencyContact: 'Juan López',

    emergencyPhone: '+51 987 111 222',

    address: 'Av. Larco 1234, Miraflores, Lima',

    occupation: 'Contadora',

    maritalStatus: 'Casada',

    insurance: 'Rimac EPS',

  },

  antecedents: {

    personal: [

      'Diabetes tipo 2 diagnosticada 2019',

      'Hipotiroidismo controlado',

      'Colecistectomía 2018',

    ],

    family: ['Diabetes (madre)', 'Hipertensión (padre)', 'Obesidad (hermana)'],

    surgical: ['Colecistectomía laparoscópica (2018)'],

    medications: ['Metformina 850mg', 'Levotiroxina 75mcg', 'Losartán 50mg'],

    habits: 'Sedentaria laboral. Consumo ocasional de alcohol. No fuma. Sueño 6-7h. Estrés laboral moderado.',

  },

  consultations: [

    {

      id: 'c-1',

      date: '2026-06-28T09:30:00Z',

      type: 'Control mensual',

      reason: 'Control de peso y adherencia al plan',

      notes:

        'Paciente refiere mejor adherencia. Pérdida de 1.2 kg en el mes. Se ajusta plan hipocalórico moderado.',

      nutritionist: 'Dra. Ana Ruiz',

    },

    {

      id: 'c-2',

      date: '2026-05-28T10:00:00Z',

      type: 'Consulta inicial',

      reason: 'Evaluación nutricional completa',

      notes: 'IMC 32.4. Se inicia programa de obesidad con meta -0.5 kg/semana.',

      nutritionist: 'Dra. Ana Ruiz',

    },

  ],

  diagnoses: [

    {

      code: 'E66.0',

      description: 'Obesidad debida a exceso de calorías',

      date: '2026-05-28',

      status: 'active',

      notes: 'IMC > 30. Programa de reducción ponderal.',

    },

    {

      code: 'E11.9',

      description: 'Diabetes mellitus tipo 2 sin complicaciones',

      date: '2019-03-15',

      status: 'active',

    },

  ],

  labResults: [

    {

      id: 'l-1',

      date: '2026-06-20',

      test: 'Glucosa en ayunas',

      value: '118',

      unit: 'mg/dL',

      reference: '70-100',

      status: 'high',

    },

    {

      id: 'l-2',

      date: '2026-06-20',

      test: 'HbA1c',

      value: '6.8',

      unit: '%',

      reference: '< 5.7',

      status: 'high',

    },

    {

      id: 'l-3',

      date: '2026-06-20',

      test: 'Colesterol total',

      value: '195',

      unit: 'mg/dL',

      reference: '< 200',

      status: 'normal',

    },

    {

      id: 'l-4',

      date: '2026-06-20',

      test: 'Triglicéridos',

      value: '168',

      unit: 'mg/dL',

      reference: '< 150',

      status: 'high',

    },

  ],

  anthropometry: [

    { id: 'a-1', date: '2026-06-28', weight: 78.4, height: 1.62, imc: 29.9, waist: 92, hip: 108, arm: 31 },

    { id: 'a-2', date: '2026-05-28', weight: 79.6, height: 1.62, imc: 30.3, waist: 94, hip: 109, arm: 31.5 },

    { id: 'a-3', date: '2026-04-28', weight: 81.2, height: 1.62, imc: 30.9, waist: 96, hip: 110, arm: 32 },

  ],

  bioimpedance: [

    {

      id: 'b-1',

      date: '2026-06-28',

      fatPercent: 38.2,

      muscleMass: 24.1,

      visceralFat: 12,

      waterPercent: 48.5,

      metabolicAge: 42,

      bmr: 1380,

    },

    {

      id: 'b-2',

      date: '2026-05-28',

      fatPercent: 39.1,

      muscleMass: 23.8,

      visceralFat: 13,

      waterPercent: 47.9,

      metabolicAge: 43,

      bmr: 1370,

    },

  ],

  photos: [

    { id: 'ph-1', date: '2026-05-28', label: 'Frontal — inicio', type: 'front' },

    { id: 'ph-2', date: '2026-05-28', label: 'Lateral — inicio', type: 'side' },

    { id: 'ph-3', date: '2026-06-28', label: 'Frontal — 1 mes', type: 'progress' },

  ],

  dietPlans: [

    {

      id: 'd-1',

      date: '2026-06-28',

      name: 'Plan hipocalórico 1500 kcal',

      calories: 1500,

      protein: 90,

      carbs: 150,

      fat: 50,

      status: 'active',

    },

    {

      id: 'd-2',

      date: '2026-05-28',

      name: 'Plan inicial 1600 kcal',

      calories: 1600,

      protein: 85,

      carbs: 165,

      fat: 55,

      status: 'archived',

    },

  ],

  recipes: [

    { id: 'r-1', name: 'Ensalada de quinoa con pollo', category: 'Almuerzo', calories: 420, prepTime: '25 min' },

    { id: 'r-2', name: 'Smoothie verde proteico', category: 'Desayuno', calories: 280, prepTime: '10 min' },

    { id: 'r-3', name: 'Salmón al horno con verduras', category: 'Cena', calories: 380, prepTime: '35 min' },

  ],

  followUps: [

    {

      id: 'f-1',

      date: '2026-06-28',

      type: 'Control mensual',

      adherence: 82,

      notes: 'Buena adherencia general. Dificultad en fines de semana.',

      nextDate: '2026-07-28',

    },

    {

      id: 'f-2',

      date: '2026-05-28',

      type: 'Inicio de programa',

      adherence: 75,

      notes: 'Adaptación inicial al plan. Se programan recordatorios.',

      nextDate: '2026-06-28',

    },

  ],

  files: [

    { id: 'fi-1', name: 'Análisis clínicos Jun 2026.pdf', type: 'PDF', size: '245 KB', uploadedAt: '2026-06-21' },

    { id: 'fi-2', name: 'Consentimiento informado.pdf', type: 'PDF', size: '128 KB', uploadedAt: '2026-05-28' },

    { id: 'fi-3', name: 'Plan alimenticio v2.pdf', type: 'PDF', size: '312 KB', uploadedAt: '2026-06-28' },

  ],

  consents: [

    { id: 'co-1', title: 'Consentimiento informado — tratamiento nutricional', signedAt: '2026-05-28', status: 'signed' },

    { id: 'co-2', title: 'Autorización uso de datos clínicos', signedAt: '2026-05-28', status: 'signed' },

    { id: 'co-3', title: 'Consentimiento fotografías de progreso', status: 'pending' },

  ],

  notes: [

    {

      id: 'n-1',

      date: '2026-06-28',

      author: 'Dra. Ana Ruiz',

      content: 'Paciente motivada. Reforzar hidratación y actividad física ligera (caminata 30 min/día).',

      pinned: true,

    },

    {

      id: 'n-2',

      date: '2026-05-28',

      author: 'Dra. Ana Ruiz',

      content: 'Inicio de programa. Meta: -8 kg en 6 meses. Control mensual.',

    },

  ],

}



const RECORDS: Record<string, ClinicalRecord> = {

  'p-001': { patientId: 'p-001', ...BASE_RECORD },

}



export function getClinicalRecord(patientId: string): ClinicalRecord {

  if (RECORDS[patientId]) return RECORDS[patientId]



  return {

    patientId,

    personalInfo: { ...BASE_RECORD.personalInfo, allergies: [] },

    antecedents: { personal: [], family: [], surgical: [], medications: [], habits: 'Sin registrar.' },

    consultations: [],

    diagnoses: [],

    labResults: [],

    anthropometry: [],

    bioimpedance: [],

    photos: [],

    dietPlans: [],

    recipes: [],

    followUps: [],

    files: [],

    consents: [

      { id: 'co-default', title: 'Consentimiento informado — tratamiento nutricional', status: 'pending' },

    ],

    notes: [],

  }

}


