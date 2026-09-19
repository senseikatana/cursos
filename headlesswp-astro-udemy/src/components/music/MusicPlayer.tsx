import { Music, Play, Pause, SkipForward } from 'lucide-react';
import type { MusicTrack } from '../../types';

interface MusicPlayerProps {
  isPlaying: boolean;
  currentTrackIndex: number;
  tracks: MusicTrack[];
  onPlayPause: () => void;
  onNext: () => void;
}

export default function MusicPlayer({
  isPlaying,
  currentTrackIndex,
  tracks,
  onPlayPause,
  onNext,
}: MusicPlayerProps) {
  const track = tracks[currentTrackIndex];

  return (
    <section className="music-player-card glass-panel" aria-label="Lo-Fi Ambient Beats Player">
      <div className="player-header">
        <div className="player-title-row">
          <div className={`pulse-indicator ${isPlaying ? 'playing' : ''}`}></div>
          <Music size={14} />
          <span>Ambient Lo-Fi Player</span>
        </div>
      </div>

      <div className="track-info">
        <h4 className="track-name">{track.name}</h4>
        <span className="track-artist">{track.artist}</span>
      </div>

      {/* Sound wave visualizer bars */}
      <div className="visualizer-container" aria-hidden="true">
        {[...Array(7)].map((_, i) => (
          <div key={i} className={`visualizer-bar ${isPlaying ? 'active' : ''}`}></div>
        ))}
      </div>

      <div className="player-controls">
        <button
          className="control-btn play-btn"
          onClick={onPlayPause}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
        </button>
        <button className="control-btn" onClick={onNext} aria-label="Next track">
          <SkipForward size={18} />
        </button>
      </div>
    </section>
  );
}
