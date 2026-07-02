import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, HeartPulse, ShieldCheck, TrendingUp } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { APP } from '@/constants/app'

const HIGHLIGHTS = [
  { icon: HeartPulse, title: 'Historia clínica integral', desc: 'Antropometría, bioimpedancia y seguimiento en un solo lugar.' },
  { icon: TrendingUp, title: 'Business Intelligence', desc: 'KPIs clínicos y financieros en tiempo real.' },
  { icon: ShieldCheck, title: 'Seguridad Enterprise', desc: 'Auditoría, roles y cumplimiento de datos de salud.' },
]

export function AuthLayout() {
  return (
    <div className="flex min-h-dvh bg-background">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-secondary lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary-900" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.2 }}
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary blur-3xl"
        />

        <div className="relative z-10 flex flex-1 flex-col justify-between p-12">
          <Logo variant="light" />

          <div className="max-w-md space-y-8">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-4xl font-bold leading-tight text-white"
              >
                El ERP Clínico Nutricional de nueva generación.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-lg text-slate-300"
              >
                {APP.description}
              </motion.p>
            </div>

            <div className="space-y-4">
              {HIGHLIGHTS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-primary-200 backdrop-blur">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Activity className="h-4 w-4" />
            <span>{APP.copyright}</span>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
