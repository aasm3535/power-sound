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

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const [showTrackBlock, setShowTrackBlock] = useState(false) // New state for track block visibility
  const [trackBlockAnimationClass, setTrackBlockAnimationClass] = useState('') // New state for track block animation class

  const [trackPlayer] = useState(
    () =>
      new TrackPlayer({
        id: '1',
        title: 'Все хотят меня',
        artist: 'gotlibgotlibgotlib',
        src: '/gotlibgotlibgotlib - Все хотят меня.mp3',
        cover: '/track.png'
      })
  )

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0
    }

    trackPlayer.setOnStateChange(setIsPlaying)
    trackPlayer.setOnRepeatChange(setIsRepeating)

    return () => {
      trackPlayer.pause()
    }
  }, [trackPlayer])

  // Effect to manage track block appearance/disappearance animation
  useEffect(() => {
    if (isPlaying) {
      setShowTrackBlock(true)
      setTrackBlockAnimationClass('') // Reset animation class for entry
    } else {
      setTrackBlockAnimationClass('slideOutToBottom') // Apply exit animation
      const timer = setTimeout(() => {
        setShowTrackBlock(false) // Hide after animation completes
        setTrackBlockAnimationClass('') // Clear class
      }, 500) // Match animation duration
      return () => clearTimeout(timer)
    }
  }, [isPlaying])

  const sortOptions = ['Music', 'Hit', 'Popular']
  const info = getTrackInfo(trackPlayer)

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="background-video"
      >
        <source src="/power-sound-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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
        {showTrackBlock && ( // Conditionally render based on showTrackBlock
          <>
            <TrackProgressBar trackPlayer={trackPlayer} />
            <div className={`track-block ${trackBlockAnimationClass}`}> {/* Apply animation class */}
              <img src="/track.png" alt="Track cover" className="track-cover" />
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
        {!showTrackBlock && !isPlaying && ( // Show placeholder only when not playing and track block is hidden
          <div className="placeholder">
            <p>No track selected</p>
          </div>
        )}
      </ButtomSheet>
    </>
  )
}