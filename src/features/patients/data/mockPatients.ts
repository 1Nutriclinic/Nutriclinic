import type { Patient } from '@/types'

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p-001',
    firstName: 'María',
    lastName: 'López García',
    documentId: '45678901',
    birthDate: '1988-03-15',
    gender: 'female',
    email: 'maria.lopez@email.com',
    phone: '+51 987 654 321',
    status: 'active',
    programs: ['obesity', 'diabetes'],
    nutritionistId: 'u-001',
    nutritionistName: 'Dra. Ana Ruiz',
    branchId: 'b-001',
    branchName: 'Sede Miraflores',
    createdAt: '2024-01-10T10:00:00Z',
    lastVisitAt: '2026-06-28T09:30:00Z',
  },
  {
    id: 'p-002',
    firstName: 'Carlos',
    lastName: 'Mendoza Vega',
    documentId: '72345678',
    birthDate: '1975-11-22',
    gender: 'male',
    email: 'carlos.mendoza@email.com',
    phone: '+51 912 345 678',
    status: 'active',
    programs: ['hypertension', 'overweight'],
    nutritionistId: 'u-002',
    nutritionistName: 'Lic. Pedro Soto',
    branchId: 'b-002',
    branchName: 'Sede San Isidro',
    createdAt: '2024-03-05T14:00:00Z',
    lastVisitAt: '2026-06-30T11:00:00Z',
  },
  {
    id: 'p-003',
    firstName: 'Lucía',
    lastName: 'Ramírez Torres',
    documentId: '70123456',
    birthDate: '1992-07-08',
    gender: 'female',
    email: 'lucia.ramirez@email.com',
    phone: '+51 998 765 432',
    status: 'active',
    programs: ['pregnant'],
    nutritionistId: 'u-001',
    nutritionistName: 'Dra. Ana Ruiz',
    branchId: 'b-001',
    branchName: 'Sede Miraflores',
    createdAt: '2025-11-20T08:00:00Z',
    lastVisitAt: '2026-07-01T10:00:00Z',
  },
  {
    id: 'p-004',
    firstName: 'Diego',
    lastName: 'Castillo Paredes',
    documentId: '61234567',
    birthDate: '2015-04-12',
    gender: 'male',
    email: 'diego.castillo@email.com',
    phone: '+51 945 678 901',
    status: 'active',
    programs: ['child', 'overweight'],
    nutritionistId: 'u-003',
    nutritionistName: 'Lic. Sofía Herrera',
    branchId: 'b-001',
    branchName: 'Sede Miraflores',
    createdAt: '2025-02-14T16:00:00Z',
    lastVisitAt: '2026-06-25T15:30:00Z',
  },
  {
    id: 'p-005',
    firstName: 'Rosa',
    lastName: 'Vargas Quispe',
    documentId: '23456789',
    birthDate: '1958-09-30',
    gender: 'female',
    email: 'rosa.vargas@email.com',
    phone: '+51 923 456 789',
    status: 'active',
    programs: ['elderly', 'diabetes'],
    nutritionistId: 'u-002',
    nutritionistName: 'Lic. Pedro Soto',
    branchId: 'b-003',
    branchName: 'Sede Surco',
    createdAt: '2023-08-01T09:00:00Z',
    lastVisitAt: '2026-06-29T08:00:00Z',
  },
  {
    id: 'p-006',
    firstName: 'Andrea',
    lastName: 'Flores Díaz',
    documentId: '78901234',
    birthDate: '2000-01-18',
    gender: 'female',
    email: 'andrea.flores@email.com',
    phone: '+51 956 789 012',
    status: 'lead',
    programs: ['sports'],
    nutritionistId: 'u-001',
    nutritionistName: 'Dra. Ana Ruiz',
    branchId: 'b-002',
    branchName: 'Sede San Isidro',
    createdAt: '2026-06-15T12:00:00Z',
  },
  {
    id: 'p-007',
    firstName: 'Jorge',
    lastName: 'Silva Rojas',
    documentId: '34567890',
    birthDate: '1982-06-25',
    gender: 'male',
    email: 'jorge.silva@email.com',
    phone: '+51 934 567 890',
    status: 'discharged',
    programs: ['bariatric', 'obesity'],
    nutritionistId: 'u-003',
    nutritionistName: 'Lic. Sofía Herrera',
    branchId: 'b-001',
    branchName: 'Sede Miraflores',
    createdAt: '2022-05-10T10:00:00Z',
    lastVisitAt: '2026-05-20T09:00:00Z',
  },
  {
    id: 'p-008',
    firstName: 'Patricia',
    lastName: 'Gutiérrez Luna',
    documentId: '56789012',
    birthDate: '1995-12-03',
    gender: 'female',
    email: 'patricia.gutierrez@email.com',
    phone: '+51 967 890 123',
    status: 'abandoned',
    programs: ['eating_disorder'],
    nutritionistId: 'u-001',
    nutritionistName: 'Dra. Ana Ruiz',
    branchId: 'b-002',
    branchName: 'Sede San Isidro',
    createdAt: '2025-09-01T11:00:00Z',
    lastVisitAt: '2026-03-10T14:00:00Z',
  },
  {
    id: 'p-009',
    firstName: 'Miguel',
    lastName: 'Torres Arias',
    documentId: '89012345',
    birthDate: '1990-08-14',
    gender: 'male',
    email: 'miguel.torres@email.com',
    phone: '+51 978 901 234',
    status: 'active',
    programs: ['renal'],
    nutritionistId: 'u-002',
    nutritionistName: 'Lic. Pedro Soto',
    branchId: 'b-003',
    branchName: 'Sede Surco',
    createdAt: '2025-06-20T09:30:00Z',
    lastVisitAt: '2026-06-27T10:30:00Z',
  },
  {
    id: 'p-010',
    firstName: 'Elena',
    lastName: 'Morales Castro',
    documentId: '90123456',
    birthDate: '2008-02-28',
    gender: 'female',
    email: 'elena.morales@email.com',
    phone: '+51 989 012 345',
    status: 'active',
    programs: ['adolescent'],
    nutritionistId: 'u-003',
    nutritionistName: 'Lic. Sofía Herrera',
    branchId: 'b-001',
    branchName: 'Sede Miraflores',
    createdAt: '2025-10-05T15:00:00Z',
    lastVisitAt: '2026-06-26T16:00:00Z',
  },
  {
    id: 'p-011',
    firstName: 'Fernando',
    lastName: 'Ríos Palacios',
    documentId: '12345678',
    birthDate: '1970-05-07',
    gender: 'male',
    status: 'inactive',
    programs: ['oncology'],
    nutritionistId: 'u-002',
    nutritionistName: 'Lic. Pedro Soto',
    branchId: 'b-003',
    branchName: 'Sede Surco',
    createdAt: '2024-07-12T08:00:00Z',
    lastVisitAt: '2025-12-01T09:00:00Z',
  },
  {
    id: 'p-012',
    firstName: 'Camila',
    lastName: 'Núñez Salas',
    documentId: '67890123',
    birthDate: '2024-01-05',
    gender: 'female',
    email: 'camila.nunez@email.com',
    phone: '+51 912 678 901',
    status: 'active',
    programs: ['newborn', 'lactation'],
    nutritionistId: 'u-003',
    nutritionistName: 'Lic. Sofía Herrera',
    branchId: 'b-001',
    branchName: 'Sede Miraflores',
    createdAt: '2024-01-08T10:00:00Z',
    lastVisitAt: '2026-07-01T11:30:00Z',
  },
]

export const NUTRITIONISTS = [
  { id: 'u-001', name: 'Dra. Ana Ruiz' },
  { id: 'u-002', name: 'Lic. Pedro Soto' },
  { id: 'u-003', name: 'Lic. Sofía Herrera' },
]

export const BRANCHES = [
  { id: 'b-001', name: 'Sede Miraflores' },
  { id: 'b-002', name: 'Sede San Isidro' },
  { id: 'b-003', name: 'Sede Surco' },
]
