export type LensCondition = 'clean' | 'dirty' | 'foggy' | 'broken'

export interface GlassesPosition {
  x: number
  y: number
}

export interface GlassesVelocity {
  x: number
  y: number
}

export interface PhysicsConfig {
  gravity: number
  breakThreshold: number  // fraction of viewport height
  bounceFactor: number
  dragLerp: number
  tiltFactor: number
}

export interface GlassesState {
  position: GlassesPosition
  velocity: GlassesVelocity
  isDragging: boolean
  isDropping: boolean
  condition: LensCondition
  dirtyLevel: number        // 0–1
  isFogged: boolean
  isSentForRepair: boolean
  repairProgress: number    // 0–100
  blurIntensity: number     // px of background blur (default 12)
}

export interface GlassesActions {
  setPosition: (pos: GlassesPosition) => void
  setVelocity: (vel: GlassesVelocity) => void
  startDrag: () => void
  endDrag: () => void
  startDrop: () => void
  landGlasses: (broke: boolean) => void
  clean: () => void
  sendForRepair: () => void
  finishRepair: () => void
  setDirtyLevel: (level: number) => void
  setFogged: (fogged: boolean) => void
  setBlurIntensity: (px: number) => void
  setRepairProgress: (progress: number) => void
}

export type GlassesStore = GlassesState & GlassesActions

export const PHYSICS: PhysicsConfig = {
  gravity: 0.8,
  breakThreshold: 0.35,
  bounceFactor: 0.3,
  dragLerp: 0.15,
  tiltFactor: 0.05,
}

export const DIRT_DURATION_MS = 1_800_000  // 30 min
