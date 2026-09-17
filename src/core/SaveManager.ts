export class SaveManager {
  private key = 'crime-and-punishment-progress';
  load(): Record<string, unknown> { try { return JSON.parse(localStorage.getItem(this.key) || '{}'); } catch { return {}; } }
  save(data: Record<string, unknown>) { localStorage.setItem(this.key, JSON.stringify(data)); }
}
