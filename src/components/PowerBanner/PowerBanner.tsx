import { TrackPlayer } from '../../lib/TrackPlayer'
import './PowerBanner.css'
import { useEffect, useRef, useState } from 'react'

interface PowerBannerProps {
  trackPlayer: TrackPlayer
  isPlaying: boolean
}

export default function PowerBanner({ trackPlayer, isPlaying }: PowerBannerProps) {
  const iconRef = useRef<HTMLImageElement>(null)
  const [currentIconSrc, setCurrentIconSrc] = useState(isPlaying ? '/stop.svg' : '/play.svg')
  const [animationClass, setAnimationClass] = useState('')

  useEffect(() => {
    if (iconRef.current) {
      setAnimationClass('blur-out')
      const timeout1 = setTimeout(() => {
        setCurrentIconSrc(isPlaying ? '/stop.svg' : '/play.svg')
        setAnimationClass('blur-in')
        const timeout2 = setTimeout(() => {
          setAnimationClass('')
        }, 350) 
        return () => clearTimeout(timeout2)
      }, 350) 
      return () => clearTimeout(timeout1)
    }
  }, [isPlaying])

  const handleToggle = () => {
    trackPlayer.toggle()
  }

  return (
    <div className="power-banner" onClick={handleToggle}>
      <h1 className="power-title">
      My
        <img
          ref={iconRef}
          src={currentIconSrc}
          alt={isPlaying ? 'Stop' : 'Play'}
          className={`play-icon ${animationClass}`}
        />
        Vibe
      </h1>
    </div>
  )
}