// Web Audio API Procedural Sound Engine for Cat in Formula Room

class CatSoundSystem {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Мягкий топот подушечек лап
  public playPawStep() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, t);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(80 + Math.random() * 25, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.06);

    gain.gain.setValueAtTime(0.045, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
  }

  // Настоящее кошачье мурлыканье (вибрация 25-30 Гц)
  public playPurr(duration = 2.0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    lfo.frequency.setValueAtTime(26, t); // частота мурлыканья
    lfoGain.gain.setValueAtTime(18, t);
    lfo.connect(osc.frequency);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(55, t);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.3);
    gain.gain.setValueAtTime(0.08, t + duration - 0.4);
    gain.gain.linearRampToValueAtTime(0.0001, t + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    lfo.start(t);
    osc.start(t);
    lfo.stop(t + duration);
    osc.stop(t + duration);
  }

  // Мягкое мяуканье при клике на кота
  public playMeow() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(700, t);
    filter.Q.setValueAtTime(3.5, t);

    // Характерная траектория мяу: подъем и плавный спад
    osc.frequency.setValueAtTime(340, t);
    osc.frequency.exponentialRampToValueAtTime(580, t + 0.12);
    osc.frequency.exponentialRampToValueAtTime(360, t + 0.45);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.05, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.48);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.5);
  }

  // Звук математического озарения / решения формулы
  public playInsight() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5 - E5 - G5 - C6
    freqs.forEach((f, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const delay = idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t + delay);

      gain.gain.setValueAtTime(0.0001, t + delay);
      gain.gain.linearRampToValueAtTime(0.03, t + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + delay);
      osc.stop(t + delay + 0.65);
    });
  }

  // Звук шуршания мела по доске / карандаша по бумаге
  public playChalkScritch() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, t);
    filter.Q.setValueAtTime(2.0, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.03, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
  }
}

export const catSounds = new CatSoundSystem();
