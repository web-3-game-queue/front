import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.EXPRESS_PORT;

console.log('__dirname :>> ', __dirname);
app.use('/front', express.static(__dirname + '/dist'));
app.get('/', (_, res) => res.send('game-queue-front-host'));

console.log('port :>> ', port);

app.use(cors());
app.listen(port);