import express from 'express';
import path from 'path';

import { exampleGetAllRows, exampleInsertRow, setup } from './lib/db';

const app = express();
const port = 3000;

// Serve the contents of the /public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/db', async (req, res) => {
  const rows = await exampleGetAllRows()
  res.json(rows);
});

app.post('/insert', async (req, res) => {
  const payloadObject = req.body;
  res.json({message: "received", payloadObject});
});

async function main() {
  // Note: in-memory database is reset when process is restarted
  await setup()
  await exampleInsertRow('hi', 'hello world');

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });
}

main()
