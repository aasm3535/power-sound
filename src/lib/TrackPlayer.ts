// lib/TrackPlayer.ts
export type TrackMeta = {
  id: string
  title: string
  artist: string
  src: string
  cover?: string
}

export class TrackPlayer {
  private audio: HTMLAudioElement
  private meta: TrackMeta
  private isPlaying: boolean = false

  constructor(meta: TrackMeta) {
    this.meta = meta
    this.audio = new Audio(meta.src)
    this.audio.preload = 'auto'
  }

  play(volume: number = 0.4, fadeDuration: number = 500) {
    this.audio.currentTime = 0
    this.audio.volume = 0
    this.audio.play()
    this.fadeIn(volume, fadeDuration)
    this.isPlaying = true
  }

  pause(fadeDuration: number = 500) {
    this.fadeOut(fadeDuration)
    this.isPlaying = false
  }

  toggle() {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }

  getMeta() {
    return this.meta
  }

  getCurrentTime() {
    return this.audio.currentTime
  }

  getDuration() {
    return this.audio.duration
  }

  private fadeIn(targetVolume: number, duration: number) {
    const steps = 20
    const stepTime = duration / steps
    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const newVolume = (targetVolume / steps) * currentStep
      this.audio.volume = Math.min(newVolume, targetVolume)
      if (currentStep >= steps) clearInterval(interval)
    }, stepTime)
  }

  private fadeOut(duration: number) {
    const startVolume = this.audio.volume
    const steps = 20
    const stepTime = duration / steps
    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const newVolume = startVolume - (startVolume / steps) * currentStep
      this.audio.volume = Math.max(newVolume, 0)
      if (currentStep >= steps) {
        clearInterval(interval)
        this.audio.pause()
        this.audio.currentTime = 0
      }
    }, stepTime)
  }
}