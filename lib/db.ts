import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: null | Database
async function getDb() {
  if (!db) {
    db = await open({
      filename: ':memory:',
      // filename: 'data/interview.db',
      driver: sqlite3.cached.Database,
    });
  }
  return db
}

export async function setup() {
  const db = await getDb()
  await db.exec("CREATE TABLE example (title TEXT, content TEXT)");
}

export async function exampleInsertRow(title: string, content: string) {
  const db = await getDb()
  return await db.run("INSERT INTO example (title, content) VALUES (?, ?)", [title, content]);
}

export async function exampleGetAllRows() {
  const db = await getDb()
  return db.all("SELECT rowid AS id, title, content FROM example")
}

