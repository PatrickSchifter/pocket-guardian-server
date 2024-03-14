// app.ts
import express from 'express';
import router from './routes';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send({status: 'ok'});
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
