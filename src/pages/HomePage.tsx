import './HomePage.css'
import { useEffect, useRef, useState } from 'react'
import ButtomSheet from '../components/ButtomSheet/ButtomSheet'
import Avatar from '../components/Avatar/Avatar'
import SortSelector from '../components/SortSelector/SortSelector'
import Search from '../components/Search/Search'
import BottomSort from '../components/BottomSort/BottomSort'
import PowerBanner from '../components/PowerBanner/PowerBanner'
import { TrackPlayer } from '../lib/TrackPlayer'
import { getTrackInfo } from '../lib/TrackInfo'
import TrackProgressBar from '../components/TrackProgressBar/TrackProgressBar'
import BackgroundVideo from '../components/BackgroundVideo/BackgroundVideo'
import { tracks } from '../lib/Tracks'

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const [showTrackBlock, setShowTrackBlock] = useState(false)
  const [trackBlockAnimationClass, setTrackBlockAnimationClass] = useState('')

  const [currentIndex, setCurrentIndex] = useState(0)
  const [trackPlayer, setTrackPlayer] = useState(() => new TrackPlayer(tracks[0]))

useEffect(() => {
  if (videoRef.current) {
    videoRef.current.playbackRate = 1.0
  }

  trackPlayer.setOnStateChange(setIsPlaying)
  trackPlayer.setOnRepeatChange(setIsRepeating)

  trackPlayer['audio'].onended = () => {
    if (isRepeating) {
      trackPlayer.play()
    } else {
      const nextIndex = (currentIndex + 1) % tracks.length
      const nextTrack = new TrackPlayer(tracks[nextIndex])
      setTrackPlayer(nextTrack)
      setCurrentIndex(nextIndex)
      nextTrack.play()

      
      setShowTrackBlock(true)
      setTrackBlockAnimationClass('')
    }
  }

  return () => {
    trackPlayer.pause()
  }
}, [trackPlayer, currentIndex, isRepeating])

useEffect(() => {
  if (isPlaying) {
    setShowTrackBlock(true)
    setTrackBlockAnimationClass('')
  } else {
    
    if (!trackPlayer.isPlaying) {
      setTrackBlockAnimationClass('slideOutToBottom')
      const timer = setTimeout(() => {
        setShowTrackBlock(false)
        setTrackBlockAnimationClass('')
      }, 500)
      return () => clearTimeout(timer)
    }
  }
}, [isPlaying, trackPlayer])

  const sortOptions = ['Music', 'Hit', 'Popular']
  const info = getTrackInfo(trackPlayer)

  return (
    <>
      <BackgroundVideo />

      <div className="avatar-wrapper">
        <Avatar src="/avatar.jpg" size={40} />
      </div>

      <div className="sort-wrapper">
        <SortSelector options={sortOptions} />
      </div>

      <Search />
      <PowerBanner trackPlayer={trackPlayer} isPlaying={isPlaying} />
      <BottomSort />

      <ButtomSheet>
        {showTrackBlock && (
          <>
            <TrackProgressBar trackPlayer={trackPlayer} />
            <div className={`track-block ${trackBlockAnimationClass}`}>
              <img src={info.cover} alt="Track cover" className="track-cover" />
              <div className="track-info">
                <p className="track-title">{info.title}</p>
                <p className="track-artist">{info.artist}</p>
              </div>
              <button
                className={`repeat-button ${isRepeating ? 'active' : ''}`}
                onClick={() => trackPlayer.toggleRepeat()}
              >
                <img src="/repeat.svg" alt="Repeat" />
              </button>
            </div>
          </>
        )}
        {!showTrackBlock && !isPlaying && (
          <div className="placeholder">
            <p>No track selected</p>
          </div>
        )}
      </ButtomSheet>
    </>
  )
}