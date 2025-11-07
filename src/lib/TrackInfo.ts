// lib/TrackInfo.ts
import { TrackPlayer } from './TrackPlayer'

export function getTrackInfo(player: TrackPlayer) {
  const meta = player.getMeta()
  return {
    title: meta.title,
    artist: meta.artist,
    duration: player.getDuration(),
    currentTime: player.getCurrentTime()
  }
}