import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put({ content });
  await tx.done;
}

// export const postDb = async (content) => {
//   const db = await openDB('jate', 1);
//   const tx = db.transaction('jate', 'readwrite');
//   const store = tx.objectStore('jate');
//   await store.add(content);
//   await tx.done;
// }
//console.error('putDb not implemented');


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const all = await store.getAll();
  await tx.done;
  return all;
}

// export const getDbAll = async () => {
//   const db = await openDB('jate', 1);
//   const tx = db.transaction('jate', 'readonly');
//   const store = tx.objectStore('jate');
//   const all = await store.getAll();
//   await tx.done;
//   return all;
// }
//console.error('getDb not implemented');

initdb();
