import {logger} from './utils/loggers.js' 
import {dataBase} from './config/database.js';
import express from 'express';


const app = express();
const PORT = 3000;

dataBase();

app.get('/', (_req: any, res: {
    status: any; send: (arg0: string) => void; 
}) => {
    logger.info(`Acessando a raiz do servidor`);
    res.status(200).send('Estou funcionando');
});

app.listen(PORT, () => {
    logger.info(`Servidor está rodando em http://localhost:${PORT}`);
});