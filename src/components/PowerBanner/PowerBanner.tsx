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

  const handleToggle = () => {
    track.toggle()
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="power-banner" onClick={handleToggle}>
      <h1 className="power-title">
        Power
        <img
          src={isPlaying ? '/stop.svg' : '/play.svg'}
          alt={isPlaying ? 'Stop' : 'Play'}
          className="play-icon"
        />
        Sound
      </h1>
    </div>
  )
}