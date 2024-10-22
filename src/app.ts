import logger from './utils/loggers.js' 
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: any, res: {
    status: any; send: (arg0: string) => void; 
}) => {
    logger.info(`Acessando a raiz do servidor`);
    res.status(200).send('Estou funcionando');
});

app.listen(PORT, () => {
    logger.info(`Servidor está rodando em http://localhost:${PORT}`);
});