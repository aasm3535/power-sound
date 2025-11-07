// components/PowerBanner.tsx
import { useState } from 'react'
import { TrackPlayer } from '../../lib/TrackPlayer'
import './PowerBanner.css'

const track = new TrackPlayer({
  id: '1',
  title: 'Все хотят меня',
  artist: 'gotlibgotlibgotlib',
  src: '/gotlibgotlibgotlib - Все хотят меня.mp3',
  cover: '/track.png'
})

export default function PowerBanner() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle')

  const handleToggle = () => {
    if (phase !== 'idle') return

    setPhase('out')

    setTimeout(() => {
      if (isPlaying) {
        track.pause()
      } else {
        track.play()
      }
      setIsPlaying(!isPlaying)

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
    </div>
  )
}