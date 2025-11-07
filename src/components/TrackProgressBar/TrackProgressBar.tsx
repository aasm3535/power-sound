import { useEffect, useState } from 'react'
import { TrackPlayer } from '../../lib/TrackPlayer'
import './TrackProgressBar.css'

interface TrackProgressBarProps {
  trackPlayer: TrackPlayer
}

export default function TrackProgressBar({ trackPlayer }: TrackProgressBarProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(trackPlayer.getCurrentTime())
      setDuration(trackPlayer.getDuration())
    }

    trackPlayer.setOnTimeUpdate(handleTimeUpdate)

    return () => {
      trackPlayer.setOnTimeUpdate(() => {})
    }
  }, [trackPlayer])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="track-progress-bar small">
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  )
}
