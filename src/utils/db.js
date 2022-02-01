import Dexie from 'dexie';

const db = new Dexie('res_it_db');
db.version(1).stores({
  user: '++id',
  defaultImage: '++id',
  ressource: 'uid'
})

export default db;