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
exports.deleteStore = exports.updateStore = exports.getStore = exports.getAllStores = exports.createStore = void 0;
const storeSchema_js_1 = require("../models/storeSchema.js");
const loggers_js_1 = require("../utils/loggers.js");
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newStore = yield storeSchema_js_1.Store.create(req.body);
        res.status(200).json({
            status: 'Success',
            data: {
                newStore
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
exports.createStore = createStore;
const getAllStores = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield storeSchema_js_1.Store.find();
        res.status(200).json({
            status: 'Success',
            results: storeSchema_js_1.Store.length,
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
exports.getAllStores = getAllStores;
const getStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield storeSchema_js_1.Store.findById(req.params.id);
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
exports.getStore = getStore;
const updateStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield storeSchema_js_1.Store.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
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
exports.updateStore = updateStore;
const deleteStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield storeSchema_js_1.Store.findByIdAndDelete(req.params.id);
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
exports.deleteStore = deleteStore;
