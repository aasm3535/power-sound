
import './HomePage.css'
import { useEffect, useRef  } from 'react'
import ButtomSheet from '../components/ButtomSheet/ButtomSheet'
import Avatar from '../components/Avatar/Avatar'
import SortSelector from '../components/SortSelector/SortSelector'
import Search from '../components/Search/Search'
import BottomSort from '../components/BottomSort/BottomSort'
import PowerBanner from '../components/PowerBanner/PowerBanner'


export default function HomePage() {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0
    }
    }, [])


    const sortOptions = ['Music', 'Hit', 'Popular']


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
    <SortSelector
        options={sortOptions}
    />
    </div>

    <Search />

    <PowerBanner />

    
    <BottomSort />


<ButtomSheet>
  <h2 className="teasers-title">Teasers</h2>

  <div className="teasers-row">
    <p className="teasers-subtext">
      <span className="teasers-label">Sounds like</span> gotlibgotlibgotlib
    </p>
    <img src="/dots.svg" alt="menu" className="teasers-dots" />
  </div>

  <img src="/track.png" alt="Track preview" className="teasers-image" />

</ButtomSheet>

    </>
    )
}