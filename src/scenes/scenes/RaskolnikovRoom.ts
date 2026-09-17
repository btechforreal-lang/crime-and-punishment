import * as THREE from 'three';
import { LiteraryScene, InteractiveObject } from './SceneDefinition';
export class RaskolnikovRoom implements LiteraryScene {
  id = 'raskolnikov-room'; group = new THREE.Group(); interactions: InteractiveObject[] = []; private clock = 0;
  constructor(private onInteract: (id: string) => void) {
    const mat = (color: number, roughness = .9) => new THREE.MeshStandardMaterial({ color, roughness });
    const add = (geo: THREE.BufferGeometry, material: THREE.Material, pos: [number, number, number], name?: string) => { const m = new THREE.Mesh(geo, material); m.position.set(...pos); m.castShadow = true; m.receiveShadow = true; if (name) m.name = name; this.group.add(m); return m; };
    add(new THREE.BoxGeometry(8, .15, 6), mat(0x302c27), [0, 0, 0]);
    add(new THREE.BoxGeometry(8, 4.5, .15), mat(0x5d5750), [0, 2.25, -3]);
    add(new THREE.BoxGeometry(.15, 4.5, 6), mat(0x504a43), [-4, 2.25, 0]);
    add(new THREE.BoxGeometry(.15, 4.5, 6), mat(0x443f39), [4, 2.25, 0]);
    add(new THREE.BoxGeometry(8, .15, 6), mat(0x26231f), [0, 4.5, 0]);
    const bed = add(new THREE.BoxGeometry(2.7, .5, 1.45), mat(0x40362f), [-1.8, .4, -.95], 'bed');
    add(new THREE.BoxGeometry(2.5, .18, 1.3), mat(0x776b5c), [-1.8, .72, -.95]);
    const table = add(new THREE.BoxGeometry(1.7, .14, .85), mat(0x4f3429), [.95, 1.3, -1.05], 'table');
    for (const x of [.35, 1.55]) add(new THREE.BoxGeometry(.12, 1.3, .12), mat(0x3b2922), [x, .65, -1.3]);
    const chair = add(new THREE.BoxGeometry(.7, .12, .65), mat(0x45332b), [1.05, .65, .65], 'chair');
    add(new THREE.BoxGeometry(.12, 1.25, .65), mat(0x45332b), [1.05, 1.2, .95]);
    const window = add(new THREE.BoxGeometry(1.75, 1.75, .08), new THREE.MeshStandardMaterial({ color: 0x263645, emissive: 0x182431 }), [-1.2, 2.75, -2.88], 'window');
    const door = add(new THREE.BoxGeometry(1.1, 2.7, .12), mat(0x382b25), [3.25, 1.45, -2.87], 'door');
    const paper = add(new THREE.PlaneGeometry(.65, .45), new THREE.MeshStandardMaterial({ color: 0xd0c4a5, side: THREE.DoubleSide }), [.95, 1.4, -1.05], 'paper'); paper.rotation.x = -Math.PI / 2;
    const addInteraction = (id: string, label: string, object: THREE.Object3D) => { this.interactions.push({ id, label, object, onInteract: () => this.onInteract(id) }); };
    addInteraction('window', 'LOOK THROUGH WINDOW', window); addInteraction('bed', 'REST BESIDE THE BED', bed); addInteraction('table', 'EXAMINE THE PAPERS', table); addInteraction('door', 'RETURN TO THE BOOK', door); addInteraction('chair', 'SIT IN THE CHAIR', chair);
  }
  update(delta: number) { this.clock += delta; this.group.rotation.y = Math.sin(this.clock * .18) * .018; }
  destroy() { this.group.clear(); }
}
