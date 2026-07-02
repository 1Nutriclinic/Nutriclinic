import type { AssistantMessage, AssistantThread, PromptSuggestion } from '../types'

export const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  {
    id: 'ps1',
    label: 'Resumir consulta',
    prompt: 'Resume la última consulta de María López destacando antropometría, adherencia y próximos pasos.',
    category: 'clinical',
  },
  {
    id: 'ps2',
    label: 'Requerimientos energéticos',
    prompt: 'Calcula GET y macronutrientes para un hombre de 42 años, 82 kg, 175 cm, actividad moderada, objetivo pérdida de peso.',
    category: 'calculation',
  },
  {
    id: 'ps3',
    label: 'Sugerir diagnóstico',
    prompt: 'Sugiere diagnóstico nutricional según IMC 31.2, grasa visceral 14, adherencia 68% y ansiedad reportada.',
    category: 'clinical',
  },
  {
    id: 'ps4',
    label: 'Plan alimenticio',
    prompt: 'Propón un plan de 1800 kcal para paciente con diabetes tipo 2, restricción de sodio y preferencia vegetariana.',
    category: 'clinical',
  },
  {
    id: 'ps5',
    label: 'Detectar riesgos',
    prompt: 'Identifica banderas rojas en gestante de 28 semanas con ganancia de peso acelerada y presión 138/88.',
    category: 'risk',
  },
  {
    id: 'ps6',
    label: 'Mensaje motivacional',
    prompt: 'Redacta un mensaje motivacional para paciente de obesidad que recuperó adherencia tras 3 semanas de estancamiento.',
    category: 'communication',
  },
]

export const MOCK_THREADS: AssistantThread[] = [
  {
    id: 't1',
    title: 'Resumen — María López',
    patientName: 'María López',
    updatedAt: '2026-07-02T14:30:00.000Z',
    preview: 'Resumen clínico generado con éxito…',
  },
  {
    id: 't2',
    title: 'GET — Carlos Mendoza',
    patientName: 'Carlos Mendoza',
    updatedAt: '2026-07-01T11:15:00.000Z',
    preview: 'Requerimiento energético estimado: 2,180 kcal/día…',
  },
  {
    id: 't3',
    title: 'Riesgos gestante — Ana Ruiz',
    patientName: 'Ana Ruiz',
    updatedAt: '2026-06-30T09:00:00.000Z',
    preview: 'Se detectaron 2 banderas rojas que requieren…',
  },
]

export const MOCK_MESSAGES: Record<string, AssistantMessage[]> = {
  t1: [
    {
      id: 'm1',
      threadId: 't1',
      role: 'user',
      content: 'Resume la última consulta de María López destacando antropometría, adherencia y próximos pasos.',
      createdAt: '2026-07-02T14:28:00.000Z',
    },
    {
      id: 'm2',
      threadId: 't1',
      role: 'assistant',
      content: `**Resumen clínico — María López** (02/07/2026)

**Antropometría**
- Peso: 78.4 kg (−1.2 kg vs. consulta anterior)
- IMC: 28.9 kg/m² (sobrepeso)
- % Grasa: 32.1% | Masa muscular: 41.2 kg
- Circunferencia cintura: 89 cm

**Adherencia al plan**
- Registro de comidas: 85% (últimos 14 días)
- Hidratación: 1.8 L/día promedio
- Actividad física: 3 sesiones/semana

**Próximos pasos**
1. Mantener déficit calórico de 400 kcal
2. Reforzar proteína en desayuno (25–30 g)
3. Control en 3 semanas con bioimpedancia
4. Evaluar suplementación de vitamina D (nivel previo: insuficiente)`,
      createdAt: '2026-07-02T14:30:00.000Z',
    },
  ],
  t2: [
    {
      id: 'm3',
      threadId: 't2',
      role: 'user',
      content: 'Calcula GET y macronutrientes para Carlos Mendoza: 42 años, 82 kg, 175 cm, actividad moderada, objetivo pérdida de peso.',
      createdAt: '2026-07-01T11:10:00.000Z',
    },
    {
      id: 'm4',
      threadId: 't2',
      role: 'assistant',
      content: `**Cálculo de requerimientos — Carlos Mendoza**

**TMB (Mifflin-St Jeor):** 1,735 kcal
**Factor actividad (moderada):** × 1.55 = **2,689 kcal**
**Ajuste pérdida de peso (−500 kcal):** **2,189 kcal/día**

**Distribución de macronutrientes**
| Macro | % | gr/día | kcal |
|-------|---|--------|------|
| Proteína | 30% | 164 g | 657 |
| Carbohidratos | 40% | 219 g | 876 |
| Grasas | 30% | 73 g | 656 |

**Recomendación:** Priorizar proteína en cada comida, fibra ≥ 25 g/día y hidratación 2.5 L.`,
      createdAt: '2026-07-01T11:15:00.000Z',
    },
  ],
  t3: [
    {
      id: 'm5',
      threadId: 't3',
      role: 'user',
      content: 'Identifica banderas rojas en gestante de 28 semanas con ganancia de peso acelerada y presión 138/88.',
      createdAt: '2026-06-30T08:55:00.000Z',
    },
    {
      id: 'm6',
      threadId: 't3',
      role: 'assistant',
      content: `**Análisis de riesgo — Gestante 28 semanas**

**Banderas rojas detectadas:**
1. **Presión arterial 138/88 mmHg** — Rango de hipertensión gestacional. Derivar a obstetricia en 24–48 h.
2. **Ganancia de peso acelerada** — Si supera curva IOM del percentil 90, evaluar edema, retención hídrica y preeclampsia.

**Acciones inmediatas:**
- Solicitar proteinuria y analítica completa
- Monitoreo de presión cada 4–6 h
- Restricción moderada de sodio (< 2,300 mg/día)
- No iniciar restricción calórica agresiva

**Seguimiento nutricional:** Mantener aporte proteico 1.1 g/kg/día, calcio 1,000 mg, hierro según laboratorio.`,
      createdAt: '2026-06-30T09:00:00.000Z',
    },
  ],
}

/** Mock AI response generator based on user prompt keywords */
export function generateMockResponse(prompt: string): string {
  const lower = prompt.toLowerCase()

  if (lower.includes('resum') || lower.includes('consulta')) {
    return `**Resumen generado**

He analizado la información disponible del expediente. Los puntos clave son:

- **Evolución favorable** en peso e IMC respecto al mes anterior
- **Adherencia** dentro del rango aceptable (> 75%)
- **Áreas de mejora:** hidratación y distribución de proteína

¿Deseas que profundice en algún aspecto específico o genere un plan de seguimiento?`
  }

  if (lower.includes('get') || lower.includes('requerimiento') || lower.includes('calor') || lower.includes('macronutriente')) {
    return `**Estimación de requerimientos**

Basado en los datos proporcionados:

- **GET estimado:** 2,150–2,250 kcal/día
- **Proteína:** 25–30% (134–169 g)
- **Carbohidratos:** 40–45%
- **Grasas:** 25–30%

*Nota: Validar con antropometría actual y objetivo clínico antes de prescribir.*`
  }

  if (lower.includes('diagnóstico') || lower.includes('diagnostico')) {
    return `**Sugerencia de diagnóstico nutricional (NCP)**

1. **Exceso de ingesta energética** relacionado con hábitos alimentarios reportados
2. **Ingesta inconsistente de proteína** evidenciada en registro de 24 h
3. **Conocimiento deficiente** sobre porciones y etiquetado

**Intervención propuesta:** Educación nutricional + plan hipocalórico moderado con seguimiento quincenal.`
  }

  if (lower.includes('plan') || lower.includes('dieta') || lower.includes('alimenticio')) {
    return `**Borrador de plan alimenticio**

| Tiempo | Opción |
|--------|--------|
| Desayuno | Avena + yogur griego + frutos rojos |
| Media mañana | Puñado de almendras + mandarina |
| Almuerzo | Quinoa + pollo + ensalada mixta |
| Merienda | Smoothie verde (espinaca, plátano, proteína) |
| Cena | Pescado al horno + verduras asadas |

**Total estimado:** ~1,800 kcal | Proteína ~110 g | Fibra ~28 g

¿Ajusto por restricciones o preferencias adicionales?`
  }

  if (lower.includes('riesgo') || lower.includes('bander') || lower.includes('alerta')) {
    return `**Análisis de riesgo**

He identificado los siguientes puntos de atención:

1. **Prioridad alta** — Parámetro fuera de rango que requiere evaluación médica
2. **Prioridad media** — Tendencia desfavorable en adherencia o evolución
3. **Prioridad baja** — Hábito a reforzar en próxima consulta

Recomiendo documentar en la historia clínica y coordinar con el equipo multidisciplinario si aplica.`
  }

  if (lower.includes('motivacional') || lower.includes('mensaje')) {
    return `**Mensaje sugerido para el paciente**

"Hola, quería felicitarte por retomar el camino. Es completamente normal tener semanas de estancamiento — lo importante es que volviste a registrar tus comidas y cumplir tu plan. Cada día cuenta. En la próxima consulta revisaremos juntos qué ajustes menores podemos hacer. ¡Sigue así!" 

*Puedes enviarlo por WhatsApp desde el módulo de Mensajería.*`
  }

  return `Entendido. Como copiloto clínico de NutriClinic Pro, puedo ayudarte con:

- Resúmenes de consulta
- Cálculo de requerimientos energéticos
- Sugerencias de diagnóstico nutricional
- Borradores de planes alimenticios
- Detección de riesgos
- Mensajes motivacionales

¿Podrías darme más contexto del paciente o el objetivo clínico específico?`
}
