import {logger} from './utils/loggers.js' 
import {dataBase} from './config/database.js';
import express from 'express';
import route from './routes/storeRoutes.js'
import dotenv from 'dotenv'

dotenv.config();

const PORT = process.env.PORT;
const app = express();

dataBase();

app.use(express.json());

app.use('/api/v1/stores', route);

app.get('/', (_req: any, res: any) => {
    logger.info(`Acessando a raiz do servidor`);
    res.status(200).send('Estou funcionando');
});

app.listen(PORT, () => {
    logger.info(`Servidor está rodando em http://localhost:${PORT}`);
});