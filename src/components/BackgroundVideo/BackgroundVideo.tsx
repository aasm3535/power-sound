import { useRef } from 'react'
import './BackgroundVideo.css'

export default function BackgroundVideo() {
    const videoRef = useRef(null);

    return (
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
    )
}