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
import { SkipBack, SkipForward, Play, Pause, Repeat } from 'lucide-react'

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
        setIsPlaying(true)
        setShowTrackBlock(true)
        setTrackBlockAnimationClass('')
      } else {
        const nextIndex = (currentIndex + 1) % tracks.length
        const nextTrack = new TrackPlayer(tracks[nextIndex])
        nextTrack.setOnStateChange(setIsPlaying)
        nextTrack.setOnRepeatChange(setIsRepeating)
        setTrackPlayer(nextTrack)
        setCurrentIndex(nextIndex)
        nextTrack.play()
        setIsPlaying(true)
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

              <div className="controls">
                {/* Prev */}
                <button
                  className="control-button"
                  onClick={() => {
                    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length
                    const prevTrack = new TrackPlayer(tracks[prevIndex])
                    prevTrack.setOnStateChange(setIsPlaying)
                    prevTrack.setOnRepeatChange(setIsRepeating)
                    setTrackPlayer(prevTrack)
                    setCurrentIndex(prevIndex)
                    prevTrack.play()
                    setIsPlaying(true)
                    setShowTrackBlock(true)
                    setTrackBlockAnimationClass('')
                  }}
                >
                  <SkipBack size={22} color="#fff" />
                </button>

                {/* Play / Pause */}
                <button
                  className="control-button"
                  onClick={() => trackPlayer.toggle()}
                >
                  {isPlaying ? <Pause size={22} color="#fff" /> : <Play size={22} color="#fff" />}
                </button>

                {/* Next */}
                <button
                  className="control-button"
                  onClick={() => {
                    const nextIndex = (currentIndex + 1) % tracks.length
                    const nextTrack = new TrackPlayer(tracks[nextIndex])
                    nextTrack.setOnStateChange(setIsPlaying)
                    nextTrack.setOnRepeatChange(setIsRepeating)
                    setTrackPlayer(nextTrack)
                    setCurrentIndex(nextIndex)
                    nextTrack.play()
                    setIsPlaying(true)
                    setShowTrackBlock(true)
                    setTrackBlockAnimationClass('')
                  }}
                >
                  <SkipForward size={22} color="#fff" />
                </button>

                {/* Repeat */}
                <button
                  className={`control-button ${isRepeating ? 'active' : ''}`}
                  onClick={() => trackPlayer.toggleRepeat()}
                >
                  <Repeat size={22} color={isRepeating ? '#fff' : '#aaa'} />
                </button>
              </div>
            </div>
          </>
        )}
      </ButtomSheet>
    </>
  )
}