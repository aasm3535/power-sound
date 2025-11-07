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
  public isPlaying: boolean = false
  private isRepeating: boolean = false
  private onStateChange: (isPlaying: boolean) => void = () => {}
  private onTimeUpdate: () => void = () => {}
  private onRepeatChange: (isRepeating: boolean) => void = () => {}

  constructor(meta: TrackMeta) {
    this.meta = meta
    this.audio = new Audio(meta.src)
    this.audio.preload = 'auto'

this.audio.onended = () => {
  if (this.isRepeating) {
    this.audio.currentTime = 0
    void this.audio.play()
    this.setIsPlaying(true)
  } else {
    this.setIsPlaying(false)
  }
}


    this.audio.ontimeupdate = () => {
      this.onTimeUpdate()
    }
  }

  setOnStateChange(callback: (isPlaying: boolean) => void) {
    this.onStateChange = callback
  }

  setOnTimeUpdate(callback: () => void) {
    this.onTimeUpdate = callback
  }

  setOnRepeatChange(callback: (isRepeating: boolean) => void) {
    this.onRepeatChange = callback
  }

  private setIsPlaying(isPlaying: boolean) {
    this.isPlaying = isPlaying
    this.onStateChange(this.isPlaying)
  }

  toggleRepeat() {
    this.isRepeating = !this.isRepeating
    this.onRepeatChange(this.isRepeating)
  }

  getIsRepeating() {
    return this.isRepeating
  }

  play(volume: number = 0.4, fadeDuration: number = 500) {
    if (!this.isPlaying) {
      this.audio.currentTime = 0
      this.audio.volume = 0
      void this.audio.play()
      this.fadeIn(volume, fadeDuration)
      this.setIsPlaying(true)
      this.updateMediaSession()
    }
  }

  pause(fadeDuration: number = 500) {
    if (this.isPlaying) {
      this.fadeOut(fadeDuration)
      this.setIsPlaying(false)
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }

  updateMediaSession() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.meta.title,
        artist: this.meta.artist,
        album: 'Custom Album',
        artwork: [
          {
            src: this.meta.cover || '/track.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      })

      navigator.mediaSession.setActionHandler('play', () => this.play())
      navigator.mediaSession.setActionHandler('pause', () => this.pause())
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) {
          this.audio.currentTime = details.seekTime
        }
      })
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
      }
    }, stepTime)
  }
}