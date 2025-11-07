import { TrackPlayer } from '../../lib/TrackPlayer'
import './PowerBanner.css'
import { useEffect, useRef } from 'react'

interface PowerBannerProps {
  trackPlayer: TrackPlayer
  isPlaying: boolean
}

export default function PowerBanner({ trackPlayer, isPlaying }: PowerBannerProps) {
  const iconRef = useRef<HTMLImageElement>(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      if (iconRef.current) {
        iconRef.current.src = isPlaying ? '/stop.svg' : '/play.svg'
      }
      return
    }

    if (iconRef.current) {
      iconRef.current.classList.add('blur-out')
      setTimeout(() => {
        if (iconRef.current) {
          iconRef.current.src = isPlaying ? '/stop.svg' : '/play.svg'
          iconRef.current.classList.remove('blur-out')
          iconRef.current.classList.add('blur-in')

          setTimeout(() => {
            if (iconRef.current) {
              iconRef.current.classList.remove('blur-in')
            }
          }, 350) // Длительность анимации
        }
      }, 350) // Длительность анимации
    }
  }, [isPlaying])

  const handleToggle = () => {
    trackPlayer.toggle()
  }

  return (
    <div className="power-banner" onClick={handleToggle}>
      <h1 className="power-title">
        Power
        <img
          ref={iconRef}
          alt={isPlaying ? 'Stop' : 'Play'}
          className={'play-icon'}
        />
        Sound
      </h1>
    </div>
  )
}