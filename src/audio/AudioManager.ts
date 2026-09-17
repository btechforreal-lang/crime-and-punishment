export class AudioManager {
  private context?: AudioContext; private gain?: GainNode; private oscillator?: OscillatorNode;
  start() { if (this.context) return; this.context = new AudioContext(); this.gain = this.context.createGain(); this.gain.gain.value = 0.018; this.gain.connect(this.context.destination); this.oscillator = this.context.createOscillator(); this.oscillator.type = 'sine'; this.oscillator.frequency.value = 58; this.oscillator.connect(this.gain); this.oscillator.start(); }
  click() { if (!this.context || !this.gain) return; const osc = this.context.createOscillator(); const gain = this.context.createGain(); osc.frequency.value = 180; gain.gain.setValueAtTime(.08, this.context.currentTime); gain.gain.exponentialRampToValueAtTime(.001, this.context.currentTime + .18); osc.connect(gain).connect(this.context.destination); osc.start(); osc.stop(this.context.currentTime + .2); }
  setMuted(muted: boolean) { if (this.gain) this.gain.gain.value = muted ? 0 : .018; }
}
