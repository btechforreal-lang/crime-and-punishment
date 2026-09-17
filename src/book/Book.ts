import chapters from './chapters.json';
export type Chapter = typeof chapters[number];
export class Book { constructor(public readonly chapters: Chapter[]) {} get first() { return this.chapters[0]; } get(id: string) { return this.chapters.find(c => c.id === id); } index(id: string) { return this.chapters.findIndex(c => c.id === id); } }
export const book = new Book(chapters);
