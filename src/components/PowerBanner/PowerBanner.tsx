import { useState, useRef } from 'react'
import './PowerBanner.css'

export default function PowerBanner() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle')
  const audioRef = useRef<HTMLAudioElement>(null)

  const fadeInVolume = (targetVolume: number, duration: number) => {
    if (!audioRef.current) return
    audioRef.current.volume = 0
    const steps = 20
    const stepTime = duration / steps
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const newVolume = (targetVolume / steps) * currentStep
      if (audioRef.current) {
        audioRef.current.volume = Math.min(newVolume, targetVolume)
      }
      if (currentStep >= steps) {
        clearInterval(interval)
      }
    }, stepTime)
  }

  const fadeOutVolume = (duration: number) => {
    if (!audioRef.current) return
    const startVolume = audioRef.current.volume
    const steps = 20
    const stepTime = duration / steps
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const newVolume = startVolume - (startVolume / steps) * currentStep
      if (audioRef.current) {
        audioRef.current.volume = Math.max(newVolume, 0)
      }
      if (currentStep >= steps) {
        clearInterval(interval)
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }
      }
    }, stepTime)
  }

  const handleToggle = () => {
    if (phase !== 'idle') return

    setPhase('out')

    setTimeout(() => {
      setIsPlaying(prev => {
        const newState = !prev

        if (newState) {
          if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
            fadeInVolume(0.4, 500) 
          }
        } else {
          fadeOutVolume(500) 
        }

        return newState
      })
      setPhase('in')

      setTimeout(() => {
        setPhase('idle')
      }, 350)
    }, 350)
  }

  return (
    <div className="power-banner" onClick={handleToggle}>
      <h1 className="power-title">
        Power
        <img
          src={isPlaying ? '/stop.svg' : '/play.svg'}
          alt={isPlaying ? 'Stop' : 'Play'}
          className={`play-icon ${
            phase === 'out' ? 'blur-out' : phase === 'in' ? 'blur-in' : ''
          }`}
        />
        Sound
      </h1>

      <audio ref={audioRef} src="/gotlibgotlibgotlib - Все хотят меня.mp3" />
    </div>
  )
}