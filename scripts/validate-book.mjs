import fs from 'node:fs';

const chapters = JSON.parse(fs.readFileSync('src/data/chapters.json', 'utf8'));
const locations = JSON.parse(fs.readFileSync('src/data/locations.json', 'utf8'));
const characters = JSON.parse(fs.readFileSync('src/data/characters.json', 'utf8'));

if (!Array.isArray(chapters) || chapters.length === 0) throw new Error('Book has no chapters');
const ids = new Set();
for (const chapter of chapters) {
  if (!chapter.id || ids.has(chapter.id) || !Array.isArray(chapter.text) || chapter.text.length === 0 || !chapter.scene) {
    throw new Error(`Invalid chapter: ${chapter.id || '(missing id)'}`);
  }
  ids.add(chapter.id);
}
for (const chapter of chapters) {
  if (!locations.some((location) => location.id === chapter.location)) throw new Error(`Missing location: ${chapter.location}`);
  for (const character of chapter.characters || []) {
    if (!characters.some((entry) => entry.id === character)) throw new Error(`Missing character: ${character}`);
  }
}
console.log(`Validated ${chapters.length} chapter(s), ${locations.length} location(s), and ${characters.length} character(s).`);
