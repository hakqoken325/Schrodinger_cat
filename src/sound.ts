// Процедурный синтезатор звуков для городка (Web Audio API)
import { CharacterId } from './types';

class TownSoundEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Звук шага
  public playStep(pitch: number = 1.0) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140 * pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45 * pitch, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Audio safety
    }
  }

  // Звук жужжания крыльев Мухи (永生)
  public playFlyFlap() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(340, this.ctx.currentTime + 0.06);
      osc.frequency.linearRampToValueAtTime(240, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch {
      // safety
    }
  }

  // Голос персонажа (милый стиль речи для каждого из 7 персонажей)
  public playVoice(characterId: CharacterId) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      let baseFreq = 440;
      let waveType: OscillatorType = 'sine';

      switch (characterId) {
        case 'red_ai':
          baseFreq = 220;
          waveType = 'square';
          break;
        case 'fly_immortal':
          baseFreq = 680;
          waveType = 'sawtooth';
          break;
        case 'pink_node':
          baseFreq = 440;
          waveType = 'sine';
          break;
        case 'blue_quantum':
          baseFreq = 580;
          waveType = 'triangle';
          break;
        case 'green_sprout':
          baseFreq = 520;
          waveType = 'sine';
          break;
        case 'golden_coin':
          baseFreq = 760;
          waveType = 'sine';
          break;
        case 'white_cloud':
          baseFreq = 340;
          waveType = 'triangle';
          break;
      }

      const syllables = 3;

      for (let i = 0; i < syllables; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = now + i * 0.07;
        const pitch = baseFreq + (Math.random() - 0.5) * 60;

        osc.type = waveType;
        osc.frequency.setValueAtTime(pitch, t);
        osc.frequency.linearRampToValueAtTime(pitch + 40, t + 0.05);

        const vol = waveType === 'square' ? 0.03 : 0.06;
        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.07);
      }
    } catch {
      // safety
    }
  }

  // Звон колокола на башне городка
  public playTownBell() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const freqs = [587.33, 880, 1174.66, 1760];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const volume = 0.15 / (idx + 1);
        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2 - idx * 0.3);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now);
        osc.stop(now + 2.5);
      });
    } catch {
      // safety
    }
  }

  // Звук радостного подпрыгивания (клик по персонажу)
  public playBoing() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.22);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // safety
    }
  }

  // Всплеск фонтана / брызги
  public playSplash() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.18);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // safety
    }
  }
}

export const townSounds = new TownSoundEngine();
