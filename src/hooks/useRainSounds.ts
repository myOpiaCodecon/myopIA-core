import { useEffect, useRef } from 'react'

export function useRainSounds(isRaining: boolean, isWiping: boolean) {
  const ctxRef        = useRef<AudioContext | null>(null)
  const rainGainRef   = useRef<GainNode | null>(null)
  const rainSrcRef    = useRef<AudioBufferSourceNode | null>(null)
  const wiperTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const getCtx = () => {
    if (!ctxRef.current) ctxRef.current = new AudioContext()
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
    return ctxRef.current
  }

  // Som de chuva — ruído branco filtrado com bandpass
  useEffect(() => {
    if (isRaining) {
      const ctx        = getCtx()
      const sampleRate = ctx.sampleRate
      const buffer     = ctx.createBuffer(1, sampleRate * 3, sampleRate) // 3s loop
      const data       = buffer.getChannelData(0)
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1

      const src = ctx.createBufferSource()
      src.buffer = buffer
      src.loop   = true

      // Bandpass ~1200Hz dá aquela textura de chuva pesada
      const filter       = ctx.createBiquadFilter()
      filter.type        = 'bandpass'
      filter.frequency.value = 1200
      filter.Q.value     = 0.35

      // Highshelf leve para dar "brilho" das gotas
      const shelf           = ctx.createBiquadFilter()
      shelf.type            = 'highshelf'
      shelf.frequency.value = 4000
      shelf.gain.value      = 6

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2.5) // fade-in 2.5s

      src.connect(filter)
      filter.connect(shelf)
      shelf.connect(gain)
      gain.connect(ctx.destination)
      src.start()

      rainSrcRef.current  = src
      rainGainRef.current = gain
    } else {
      const gain = rainGainRef.current
      const ctx  = ctxRef.current
      if (gain && ctx) {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5)
        setTimeout(() => {
          try { rainSrcRef.current?.stop() } catch (_) { /* já parou */ }
          rainSrcRef.current  = null
          rainGainRef.current = null
        }, 2600)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRaining])

  // Som do limpador — chiado de borracha no vidro a cada varredura (0.7s)
  useEffect(() => {
    if (!isWiping) {
      if (wiperTimerRef.current) clearInterval(wiperTimerRef.current)
      return
    }

    const squeak = () => {
      const ctx = getCtx()

      // Ruído curto + filtro highpass = chiado de borracha
      const bufSize = Math.floor(ctx.sampleRate * 0.06) // 60ms
      const buf     = ctx.createBuffer(1, bufSize, ctx.sampleRate)
      const d       = buf.getChannelData(0)
      for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1

      const src = ctx.createBufferSource()
      src.buffer = buf

      const hp       = ctx.createBiquadFilter()
      hp.type        = 'highpass'
      hp.frequency.value = 3500

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.07, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.06)

      src.connect(hp)
      hp.connect(gain)
      gain.connect(ctx.destination)
      src.start()
      src.stop(ctx.currentTime + 0.07)
    }

    squeak()
    wiperTimerRef.current = setInterval(squeak, 700) // sincroniza com a animação CSS (0.7s)

    return () => {
      if (wiperTimerRef.current) clearInterval(wiperTimerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWiping])

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (wiperTimerRef.current) clearInterval(wiperTimerRef.current)
      try { rainSrcRef.current?.stop() } catch (_) { /* já parou */ }
      ctxRef.current?.close()
    }
  }, [])
}
