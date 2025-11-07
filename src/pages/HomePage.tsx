import './HomePage.css'
import { useEffect, useRef } from 'react'
import ButtomSheet from '../components/ButtomSheet/ButtomSheet'
import Avatar from '../components/Avatar/Avatar'
import SortSelector from '../components/SortSelector/SortSelector'
import Search from '../components/Search/Search'
import BottomSort from '../components/BottomSort/BottomSort'
import PowerBanner from '../components/PowerBanner/PowerBanner'
import { TrackPlayer } from '../lib/TrackPlayer'
import { getTrackInfo } from '../lib/TrackInfo'

const track = new TrackPlayer({
  id: '1',
  title: 'Все хотят меня',
  artist: 'gotlibgotlibgotlib',
  src: '/gotlibgotlibgotlib - Все хотят меня.mp3',
  cover: '/track.png'
})

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0
    }
  }, [])

  const sortOptions = ['Music', 'Hit', 'Popular']
  const info = getTrackInfo(track)

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
      <PowerBanner />
      <BottomSort />

      <ButtomSheet>
        <div className="track-block">
          <img src="/track.png" alt="Track cover" className="track-cover" />
          <div className="track-info">
            <p className="track-title">{info.title}</p>
            <p className="track-artist">{info.artist}</p>
          </div>
        </div>
      </ButtomSheet>
    </>
  )
}