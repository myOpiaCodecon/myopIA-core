export type SkinId =
  // Redondo
  | 'classic' | 'transparent' | 'tortoise' | 'aviador' | 'pride' | 'vintage'
  // Quadrado
  | 'sq-classic' | 'sq-transparent' | 'sq-tortoise' | 'sq-pride' | 'sq-vintage'
  // Retangular
  | 'rt-classic' | 'rt-transparent' | 'rt-tortoise' | 'rt-pride' | 'rt-vintage'
  // Olho de gato
  | 'ce-classic' | 'ce-transparent' | 'ce-tortoise' | 'ce-pride' | 'ce-vintage'
  // Especial
  | 'tony-stark'

export type FrameShape   = 'round' | 'square' | 'rect' | 'cateye' | 'aviador' | 'stark'
export type ColorEffect  = 'rainbow' | 'tortoise'

export interface GlassesSkin {
  id: SkinId
  name: string
  price: number | null
  frameColor: string
  frameWidth: number
  lensColor: string
  shape?: FrameShape    // default: round
  colorEffect?: ColorEffect
}

// ── Redondo ──────────────────────────────────────────────────────────────────
const round: GlassesSkin[] = [
  {
    id: 'classic',
    name: 'Clássico',
    price: null,
    frameColor: '#1a1a1a',
    frameWidth: 3.5,
    lensColor: 'rgba(180,220,255,0.04)',
  },
  {
    id: 'transparent',
    name: 'Transparente',
    price: 29.9,
    frameColor: 'rgba(180,210,240,0.55)',
    frameWidth: 1.8,
    lensColor: 'rgba(210,235,255,0.07)',
  },
  {
    id: 'tortoise',
    name: 'Tartaruga',
    price: 49.9,
    frameColor: '#C17F3A',
    frameWidth: 5.5,
    lensColor: 'rgba(150,90,30,0.05)',
    colorEffect: 'tortoise',
  },
  {
    id: 'aviador',
    name: 'Aviador',
    price: 79.9,
    frameColor: '#C8A040',
    frameWidth: 2,
    lensColor: 'rgba(200,175,90,0.06)',
    shape: 'aviador',
  },
  {
    id: 'pride',
    name: 'Leo',
    price: 59.9,
    frameColor: '#e40303',
    frameWidth: 4.5,
    lensColor: 'rgba(200,150,255,0.04)',
    colorEffect: 'rainbow',
  },
  {
    id: 'vintage',
    name: 'Vintage',
    price: 39.9,
    frameColor: '#C9A84C',
    frameWidth: 5.5,
    lensColor: 'rgba(212,175,55,0.06)',
  },
]

// ── Quadrado ─────────────────────────────────────────────────────────────────
const square: GlassesSkin[] = [
  {
    id: 'sq-classic',
    name: 'Quadrado',
    price: 19.9,
    frameColor: '#1a1a1a',
    frameWidth: 3.5,
    lensColor: 'rgba(180,220,255,0.04)',
    shape: 'square',
  },
  {
    id: 'sq-transparent',
    name: 'Quadrado Transparente',
    price: 39.9,
    frameColor: 'rgba(180,210,240,0.55)',
    frameWidth: 1.8,
    lensColor: 'rgba(210,235,255,0.07)',
    shape: 'square',
  },
  {
    id: 'sq-tortoise',
    name: 'Quadrado Tartaruga',
    price: 59.9,
    frameColor: '#C17F3A',
    frameWidth: 5.5,
    lensColor: 'rgba(150,90,30,0.05)',
    shape: 'square',
    colorEffect: 'tortoise',
  },
  {
    id: 'sq-pride',
    name: 'Quadrado Leo',
    price: 69.9,
    frameColor: '#e40303',
    frameWidth: 4.5,
    lensColor: 'rgba(200,150,255,0.04)',
    shape: 'square',
    colorEffect: 'rainbow',
  },
  {
    id: 'sq-vintage',
    name: 'Quadrado Vintage',
    price: 49.9,
    frameColor: '#C9A84C',
    frameWidth: 5.5,
    lensColor: 'rgba(212,175,55,0.06)',
    shape: 'square',
  },
]

// ── Retangular ───────────────────────────────────────────────────────────────
const rect: GlassesSkin[] = [
  {
    id: 'rt-classic',
    name: 'Retangular',
    price: 24.9,
    frameColor: '#1a1a1a',
    frameWidth: 3.5,
    lensColor: 'rgba(180,220,255,0.04)',
    shape: 'rect',
  },
  {
    id: 'rt-transparent',
    name: 'Retangular Transparente',
    price: 44.9,
    frameColor: 'rgba(180,210,240,0.55)',
    frameWidth: 1.8,
    lensColor: 'rgba(210,235,255,0.07)',
    shape: 'rect',
  },
  {
    id: 'rt-tortoise',
    name: 'Retangular Tartaruga',
    price: 64.9,
    frameColor: '#C17F3A',
    frameWidth: 5.5,
    lensColor: 'rgba(150,90,30,0.05)',
    shape: 'rect',
    colorEffect: 'tortoise',
  },
  {
    id: 'rt-pride',
    name: 'Retangular Leo',
    price: 74.9,
    frameColor: '#e40303',
    frameWidth: 4.5,
    lensColor: 'rgba(200,150,255,0.04)',
    shape: 'rect',
    colorEffect: 'rainbow',
  },
  {
    id: 'rt-vintage',
    name: 'Retangular Vintage',
    price: 54.9,
    frameColor: '#C9A84C',
    frameWidth: 5.5,
    lensColor: 'rgba(212,175,55,0.06)',
    shape: 'rect',
  },
]

// ── Olho de gato ──────────────────────────────────────────────────────────────
const cateye: GlassesSkin[] = [
  {
    id: 'ce-classic',
    name: 'Olho de Gato',
    price: 34.9,
    frameColor: '#1a1a1a',
    frameWidth: 3.5,
    lensColor: 'rgba(180,220,255,0.04)',
    shape: 'cateye',
  },
  {
    id: 'ce-transparent',
    name: 'Gatinho Transparente',
    price: 49.9,
    frameColor: 'rgba(180,210,240,0.55)',
    frameWidth: 1.8,
    lensColor: 'rgba(210,235,255,0.07)',
    shape: 'cateye',
  },
  {
    id: 'ce-tortoise',
    name: 'Gatinho Tartaruga',
    price: 64.9,
    frameColor: '#C17F3A',
    frameWidth: 5.5,
    lensColor: 'rgba(150,90,30,0.05)',
    shape: 'cateye',
    colorEffect: 'tortoise',
  },
  {
    id: 'ce-pride',
    name: 'Gatinho Leo',
    price: 74.9,
    frameColor: '#e40303',
    frameWidth: 4.5,
    lensColor: 'rgba(200,150,255,0.04)',
    shape: 'cateye',
    colorEffect: 'rainbow',
  },
  {
    id: 'ce-vintage',
    name: 'Gatinho Vintage',
    price: 54.9,
    frameColor: '#C9A84C',
    frameWidth: 5.5,
    lensColor: 'rgba(212,175,55,0.06)',
    shape: 'cateye',
  },
]

// ── Especial ─────────────────────────────────────────────────────────────────
const special: GlassesSkin[] = [
  {
    id: 'tony-stark',
    name: 'Tony Stark',
    price: 299.9,
    frameColor: '#C8A040',
    frameWidth: 1.6,
    lensColor: 'rgba(210,165,20,0.22)',
    shape: 'stark',
  },
]

export const SKINS: GlassesSkin[] = [...round, ...square, ...rect, ...cateye, ...special]
