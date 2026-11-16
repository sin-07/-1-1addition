// Procedural Web Audio API sound synthesizer & interactive audio manager
class AudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private musicInterval: any = null;
  private currentTrackIndex: number = 0;
  private noteIndex: number = 0;
  private volume: number = 0.6;
  private melodyNotes = [
    // Romantic Pentatonic Chord Arpeggios (C major / A minor / F major 7 / G major)
    [261.63, 329.63, 392.0, 523.25], // C - E - G - C
    [220.0, 261.63, 329.63, 440.0],  // A - C - E - A
    [174.61, 261.63, 349.23, 440.0], // F - C - F - A
    [196.0, 246.94, 293.66, 392.0],  // G - B - D - G
    [261.63, 329.63, 392.0, 659.25], // C - E - G - E5
    [349.23, 440.0, 523.25, 659.25], // F - A - C - E5
  ];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Play a soft bell/chime note with lush decay
  public playChime(frequency: number = 587.33, duration: number = 1.2, type: OscillatorType = 'sine') {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      // Smooth envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18 * this.volume, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Chime audio trigger skipped:", e);
    }
  }

  // Sparkle burst sound effect
  public playSparkle() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playChime(freq, 0.8, 'sine');
      }, i * 60);
    });
  }

  // Candle blown puff sound
  public playBlowing() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // Noise buffer for soft breath/puff
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.4);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  }

  // Heart pop sound
  public playHeartPop() {
    this.playChime(440 + Math.random() * 200, 0.35, 'triangle');
  }

  // Gift unbox chord
  public playUnboxFanfare() {
    const chord = [392.0, 523.25, 659.25, 783.99, 1046.5];
    chord.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 1.6, 'sine');
      }, idx * 100);
    });
  }

  // Fireworks launch & pop
  public playFireworkPop() {
    this.playChime(329.63 + Math.random() * 300, 0.9, 'triangle');
  }

  // Start continuous romantic background melody
  public startBackgroundMusic() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    const ctx = this.getContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    let chordIdx = 0;
    this.musicInterval = setInterval(() => {
      if (this.isMuted || !this.isPlaying) return;
      const chord = this.melodyNotes[chordIdx % this.melodyNotes.length];
      const noteFreq = chord[this.noteIndex % chord.length];

      this.playChime(noteFreq, 1.4, 'sine');

      // Randomly add a gentle higher sparkle note
      if (Math.random() > 0.6) {
        setTimeout(() => {
          this.playChime(noteFreq * 2, 0.9, 'sine');
        }, 220);
      }

      this.noteIndex++;
      if (this.noteIndex % chord.length === 0) {
        chordIdx++;
      }
    }, 450);
  }

  // Pause music
  public pauseBackgroundMusic() {
    this.isPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  // Toggle play/pause
  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.pauseBackgroundMusic();
      return false;
    } else {
      this.startBackgroundMusic();
      return true;
    }
  }

  // Toggle mute
  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }
}

export const soundManager = new AudioManager();
