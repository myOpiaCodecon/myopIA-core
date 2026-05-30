import { Howl } from 'howler'

/**
 * Centraliza todos os sons do simulador.
 * Fase 1: estrutura pronta, sem arquivos de áudio ainda.
 * Fase 4: substituir os src pelos arquivos reais em /public/sounds/.
 */

type SoundKey = 'wiper' | 'break' | 'repairDone' | 'fogHorn'

const sounds: Partial<Record<SoundKey, Howl>> = {}

function load(key: SoundKey, src: string[], options?: Partial<Howl>) {
  sounds[key] = new Howl({ src, volume: 0.7, ...options })
}

export const soundManager = {
  init() {
    // Fase 4: descomentar e apontar para /public/sounds/
    // load('wiper',      ['/sounds/wiper.mp3'],       { loop: true, volume: 0.5 })
    // load('break',      ['/sounds/break.mp3'])
    // load('repairDone', ['/sounds/repair-done.mp3'])
    // load('fogHorn',    ['/sounds/fog.mp3'])
    console.log('[SoundManager] pronto — áudios serão carregados na Fase 4')
  },

  play(key: SoundKey) {
    sounds[key]?.play()
  },

  stop(key: SoundKey) {
    sounds[key]?.stop()
  },

  fade(key: SoundKey, from: number, to: number, durationMs: number) {
    sounds[key]?.fade(from, to, durationMs)
  },
}
