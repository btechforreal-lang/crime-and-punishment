import * as THREE from 'three';
export interface InteractiveObject { id: string; label: string; object: THREE.Object3D; onInteract: () => void; }
export interface LiteraryScene { id: string; group: THREE.Group; interactions: InteractiveObject[]; update(delta: number): void; destroy(): void; }
