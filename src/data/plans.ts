export type PlanId = 'free' | 'pro' | 'enterprise'

export interface Plan {
  id: PlanId
  name: string
  price: string
  tagline: string
  features: string[]
  gradient: string
  accent: string
  canBreak: boolean
  repairTimeMs: number | null  // null = instantâneo
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 'R$ 0',
    tagline: 'Sofrimento básico.',
    gradient: 'from-slate-600 to-slate-800',
    accent: '#94a3b8',
    canBreak: true,
    repairTimeMs: 4 * 60 * 60 * 1000,
    features: [
      'Miopia leve (blur suave)',
      'Conserto em 4 horas',
      'Sujeira moderada',
      'Sofrimento básico',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'R$ 9,90/mês',
    tagline: 'Sofrimento premium.',
    gradient: 'from-indigo-500 to-violet-700',
    accent: '#818cf8',
    canBreak: true,
    repairTimeMs: 0,
    features: [
      'Grau personalizado',
      'Múltiplas doenças (Astigmatismo, Hipermetropia, Glaucoma…)',
      'Skin de armação',
      'Conserto instantâneo',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'R$ 500/mês',
    tagline: 'Sofrimento corporativo.',
    gradient: 'from-amber-500 to-orange-600',
    accent: '#fbbf24',
    canBreak: false,
    repairTimeMs: null,
    features: [
      'Deploy em massa',
      'Instale em toda a empresa',
      'Suporte prioritário',
      'Lente de contato (visão normal)',
    ],
  },
]
