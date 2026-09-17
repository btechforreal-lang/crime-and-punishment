import fs from 'node:fs';
const book = JSON.parse(fs.readFileSync('src/data/chapters.json','utf8'));
if (!book.length) throw new Error('Book has no chapters');
for (const chapter of book) { if (!chapter.id || !chapter.text?.length || !chapter.scene) throw new Error(`Invalid chapter: ${chapter.id}`); }
console.log(`Validated ${book.length} chapter(s).`);
