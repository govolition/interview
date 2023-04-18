import express from 'express';
import path from 'path';

import { hello } from './lib/hello';
import { setup, test } from './lib/db';

const app = express();
const port = 3000;


// Serve the contents of the /public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/hello', (req, res) => {
  res.send(hello());
});

app.get('/db', async (req, res) => {
  const rows = await test()
  res.setHeader('content-type', 'application/json')
  res.send(rows);
});

async function main() {
  await setup()
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });
}

main()
