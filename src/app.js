"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loggers_js_1 = require("./utils/loggers.js");
const database_js_1 = require("./config/database.js");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
(0, database_js_1.dataBase)();
app.get('/', (_req, res) => {
    loggers_js_1.logger.info(`Acessando a raiz do servidor`);
    res.status(200).send('Estou funcionando');
});
app.listen(PORT, () => {
    loggers_js_1.logger.info(`Servidor está rodando em http://localhost:${PORT}`);
});
