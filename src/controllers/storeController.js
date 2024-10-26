"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeController = void 0;
const loggers_js_1 = require("../utils/loggers.js");
const storeService_js_1 = require("../services/storeService.js");
//Criando a loja manualmente --- não finalizado (doing)
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const store = yield storeService_js_1.storeService.createStore(data);
        res.status(200).json({
            status: 'Success',
            data: {
                store
            }
        });
    }
    catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error
        });
        loggers_js_1.logger.error("Não foi possível criar a loja: ", error);
    }
});
//Criando a loja com cep dado --- não finalizado (doing)
const createStoreByCep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            status: 'Success',
            data: {}
        });
    }
    catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error
        });
        loggers_js_1.logger.error("Não foi possível criar a loja: ", error);
    }
});
const getAllStores = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield storeService_js_1.storeService.getAllStores();
        res.status(200).json({
            status: 'Success',
            results: stores.length,
            data: {
                stores
            }
        });
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        });
        loggers_js_1.logger.error("Não foi possível acessar todas as lojas: ", error);
    }
});
const getStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield storeService_js_1.storeService.getStoreById(req.params.id);
        res.status(200).json({
            status: 'Success',
            data: {
                store
            }
        });
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        });
        loggers_js_1.logger.error("Não foi possível acessar a loja: ", error);
    }
});
const updateStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield storeService_js_1.storeService.updateStore(req.params.id, req.body);
        res.status(200).json({
            status: 'Success',
            data: {
                store
            }
        });
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        });
        loggers_js_1.logger.error("Não foi possível editar a loja: ", error);
    }
});
const deleteStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield storeService_js_1.storeService.deleteStore(req.params.id);
        res.status(204).json({
            status: 'Success',
            data: null
        });
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        });
        loggers_js_1.logger.error("Não foi possível deletar a loja: ", error);
    }
});
const viaCep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cep = req.params.cep;
        const storesDistance = yield storeService_js_1.storeService.findNearbyStores(cep);
        res.status(200).json({
            status: 'Success',
            data: {
                storesDistance
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'FAIL',
        });
    }
});
exports.storeController = {
    createStore,
    createStoreByCep,
    getAllStores,
    getStore,
    updateStore,
    deleteStore,
    viaCep
};
