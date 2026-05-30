import { create } from 'zustand'
import type { GlassesStore, GlassesPosition, GlassesVelocity } from '../types/glasses'

const getInitialPosition = (): GlassesPosition => ({
  x: typeof window !== 'undefined' ? window.innerWidth / 2 : 760,
  y: typeof window !== 'undefined' ? window.innerHeight - 80 : 920,
})

export const useGlassesStore = create<GlassesStore>((set) => ({
  // --- state ---
  position: getInitialPosition(),
  velocity: { x: 0, y: 0 },
  isDragging: false,
  isDropping: false,
  condition: 'clean',
  dirtyLevel: 0,
  isFogged: false,
  isSentForRepair: false,
  repairProgress: 0,
  blurIntensity: 12,

  // --- actions ---
  setPosition: (pos: GlassesPosition) => set({ position: pos }),

  setVelocity: (vel: GlassesVelocity) => set({ velocity: vel }),

  startDrag: () =>
    set({ isDragging: true, isDropping: false, velocity: { x: 0, y: 0 } }),

  endDrag: () => set({ isDragging: false }),

  startDrop: () => set({ isDropping: true }),

  landGlasses: (broke: boolean) =>
    set((s) => ({
      isDropping: false,
      velocity: { x: 0, y: 0 },
      condition: broke ? 'broken' : s.condition,
    })),

  clean: () =>
    set((s) => {
      if (s.condition === 'broken') return {}
      return { dirtyLevel: 0, isFogged: false, condition: 'clean' }
    }),

  sendForRepair: () =>
    set((s) => {
      if (s.condition !== 'broken') return {}
      return { isSentForRepair: true, repairProgress: 0 }
    }),

  finishRepair: () =>
    set({
      isSentForRepair: false,
      repairProgress: 0,
      condition: 'clean',
      dirtyLevel: 0,
      isFogged: false,
      position: getInitialPosition(),
      velocity: { x: 0, y: 0 },
    }),

  setDirtyLevel: (level: number) =>
    set((s) => ({
      dirtyLevel: Math.min(1, Math.max(0, level)),
      condition:
        s.condition !== 'broken' && level > 0.15
          ? 'dirty'
          : s.condition,
    })),

  setFogged: (fogged: boolean) =>
    set((s) => ({
      isFogged: fogged,
      condition:
        s.condition !== 'broken' && s.condition !== 'dirty' && fogged
          ? 'foggy'
          : s.condition,
    })),

  setBlurIntensity: (px: number) => set({ blurIntensity: px }),

  setRepairProgress: (progress: number) => set({ repairProgress: progress }),
}))
