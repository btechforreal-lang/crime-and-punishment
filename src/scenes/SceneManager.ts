import * as THREE from 'three';
import { RaskolnikovRoom } from './scenes/RaskolnikovRoom';
import { LiteraryScene } from './SceneDefinition';
export class SceneManager {
  current?: LiteraryScene;
  constructor(private scene: THREE.Scene, private onInteract: (id: string) => void) {}
  load(id: string) { if (this.current) { this.scene.remove(this.current.group); this.current.destroy(); } this.current = new RaskolnikovRoom(this.onInteract); this.scene.add(this.current.group); }
  update(delta: number) { this.current?.update(delta); }
}
