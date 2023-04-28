import express from 'express';
import path from 'path';

import { insertDummyData, setup, testGetAllRows } from './lib/db';

const app = express();
const port = 3000;


// Serve the contents of the /public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/db', async (req, res) => {
  const rows = await testGetAllRows()
  res.setHeader('content-type', 'application/json')
  res.send(rows);
});

async function main() {
  await setup()
  await insertDummyData()
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });
}

main()
