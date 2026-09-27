import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;

/** Published notes, sorted by number */
export async function getNotes(): Promise<Note[]> {
  const notes = await getCollection('notes', (note) => !note.data.draft);
  return notes.sort((a, b) => a.data.n - b.data.n);
}

export const noteNumber = (n: number) => String(n).padStart(2, '0');

export const noteUrl = (note: Note) => `/notes/${note.id}`;
