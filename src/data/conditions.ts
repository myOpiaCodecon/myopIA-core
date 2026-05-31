export type ConditionId = 'hyperopia' | 'glaucoma' | 'cataract'

export interface Condition {
  id: ConditionId
  name: string
  description: string
}

export const CONDITIONS: Condition[] = [
  {
    id: 'hyperopia',
    name: 'Hipermetropia',
    description: 'Dificuldade em focar objetos próximos',
  },
  {
    id: 'glaucoma',
    name: 'Glaucoma',
    description: 'Perda progressiva da visão periférica',
  },
  {
    id: 'cataract',
    name: 'Catarata',
    description: 'Visão opaca, turva e com brilho reduzido',
  },
]
