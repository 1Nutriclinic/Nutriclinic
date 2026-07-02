import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardContent } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { usePatientById } from '@/features/patients/hooks/usePatientFilters'
import { ClinicalRecordHeader } from '../components/ClinicalRecordHeader'
import {
  AntecedentsTab,
  AnthropometryTab,
  BioimpedanceTab,
  ConsentsTab,
  ConsultationTab,
  DiagnosisTab,
  DietTab,
  FilesTab,
  FollowUpTab,
  InfoTab,
  LaboratoryTab,
  NotesTab,
  PhotosTab,
  RecipesTab,
} from '../components/ClinicalRecordTabs'
import { getClinicalRecord } from '../data/mockClinicalRecords'
import { CLINICAL_TABS } from '../types'

export function ClinicalRecordDetailPage() {
  const { patientId } = useParams<{ patientId: string }>()
  const patient = usePatientById(patientId)

  if (!patientId) return <Navigate to="/clinical-records" replace />
  if (!patient) return <Navigate to="/clinical-records" replace />

  const record = getClinicalRecord(patientId)
  const fullName = `${patient.firstName} ${patient.lastName}`

  return (
    <div>
      <PageHeader
        title="Historia Clínica"
        description={`Expediente clínico de ${fullName}`}
        breadcrumbs={[
          { label: 'Inicio', to: '/dashboard' },
          { label: 'Historia Clínica', to: '/clinical-records' },
          { label: fullName },
        ]}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <ClinicalRecordHeader patient={patient} />

        <Card>
          <CardContent className="p-5">
            <Tabs defaultValue="info">
              <TabsList className="mb-1 flex-wrap">
                {CLINICAL_TABS.map((tab) => (
                  <TabsTrigger key={tab.key} value={tab.key}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="info"><InfoTab record={record} /></TabsContent>
              <TabsContent value="antecedents"><AntecedentsTab record={record} /></TabsContent>
              <TabsContent value="consultation"><ConsultationTab record={record} /></TabsContent>
              <TabsContent value="diagnosis"><DiagnosisTab record={record} /></TabsContent>
              <TabsContent value="laboratory"><LaboratoryTab record={record} /></TabsContent>
              <TabsContent value="anthropometry"><AnthropometryTab record={record} /></TabsContent>
              <TabsContent value="bioimpedance"><BioimpedanceTab record={record} /></TabsContent>
              <TabsContent value="photos"><PhotosTab record={record} /></TabsContent>
              <TabsContent value="diet"><DietTab record={record} /></TabsContent>
              <TabsContent value="recipes"><RecipesTab record={record} /></TabsContent>
              <TabsContent value="followup"><FollowUpTab record={record} /></TabsContent>
              <TabsContent value="files"><FilesTab record={record} /></TabsContent>
              <TabsContent value="consents"><ConsentsTab record={record} /></TabsContent>
              <TabsContent value="notes"><NotesTab record={record} /></TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
