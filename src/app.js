"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loggers_js_1 = __importDefault(require("./utils/loggers.js"));
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    loggers_js_1.default.info(`Acessando a raiz do servidor`);
    res.status(200).send('Estou funcionando');
});
app.listen(PORT, () => {
    loggers_js_1.default.info(`Servidor está rodando em http://localhost:${PORT}`);
});
