import express from 'express';
import router from './routes';
import { config } from './config/config';
import cors from 'cors';

const app = express();
const port = config.port || 3000;

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send({status: 'ok'});
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;