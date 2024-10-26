"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loggers_js_1 = require("./utils/loggers.js");
const database_js_1 = require("./config/database.js");
const express_1 = __importDefault(require("express"));
const storeRoutes_js_1 = __importDefault(require("./routes/storeRoutes.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
(0, database_js_1.dataBase)();
app.use(express_1.default.json());
app.use('/api/v1/stores', storeRoutes_js_1.default);
app.get('/', (_req, res) => {
    loggers_js_1.logger.info(`Acessando a raiz do servidor`);
    res.status(200).send('Estou funcionando');
});
app.listen(PORT, () => {
    loggers_js_1.logger.info(`Servidor está rodando em http://localhost:${PORT}`);
});
