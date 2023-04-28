import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: null | Database
async function getDb() {
  if (!db) {
    db = await open({
      filename: ':memory:',
      // filename: 'data/interveiw.db',
      driver: sqlite3.cached.Database,
    });
  }
  return db
}

export async function setup() {
  const db = await getDb()
  await db.exec("CREATE TABLE lorem (info TEXT)");
}

export async function insertDummyData() {
  const db = await getDb()
  const stmt = await db.prepare("INSERT INTO lorem VALUES (?)");
  for (let i = 0; i < 10; i++) {
    await stmt.run("Ipsum " + i);
  }
  await stmt.finalize();
}

export async function testGetAllRows() {
  const db = await getDb()
  return db.all("SELECT rowid AS id, info FROM lorem")
}

