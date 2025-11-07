// lib/TrackInfo.ts
import { TrackPlayer } from './TrackPlayer'

export function getTrackInfo(player: TrackPlayer | null | undefined) {
  if (!player) {
    return {
      title: 'Unknown',
      artist: 'Unknown',
      duration: 0,
      currentTime: 0,
      cover: '/track.png'
    }
  }
  const meta = player.getMeta()
  return {
    title: meta.title,
    artist: meta.artist,
    duration: player.getDuration(),
    currentTime: player.getCurrentTime(),
    cover: meta.cover || '/track.png'
  }
}