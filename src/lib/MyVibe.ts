import type { TrackMeta } from "./TrackPlayer";

export type VibeTrack = TrackMeta & {
    likes: number
    plays: number
}

export function getMyVibeTrack(tracks: VibeTrack[]): TrackMeta | null {
    if (tracks.length == 0) return null;

    const scored = tracks.map(t => ({
        ...t,
        score: t.likes * 2 + t.plays
    }));

    scored.sort((a, b) => b.score - a.score);

    const top = scored.slice(0, 3);
    const randomIndex = Math.floor(Math.random() * top.length);
    return top[randomIndex];
}