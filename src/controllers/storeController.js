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
//Criando a loja com todos os dados manuais
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
            message: "Algo deu errado, verifique os seus dados!"
        });
        loggers_js_1.logger.error("Não foi possivel criar a loja: ", error);
    }
});
//Criando a loja com as informações do cep dado
const createStoreByCep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const cep = req.params.cep;
        const store = yield storeService_js_1.storeService.createStoreByCep(data, cep);
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
            message: "Algo deu errado, verifique os seus dados!"
        });
        loggers_js_1.logger.error("Não foi possivel criar a loja: ", error);
    }
});
//Pegando todas as lojas do banco de dados
const getAllStores = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield storeService_js_1.storeService.getAllStores();
        //Filtragem dos campos que irão ser mandado como resposta
        const filteredStores = stores.map(store => ({
            id: store.id,
            nome: store.nome,
            endereco: store.endereco,
            numero: store.numero
        }));
        res.status(200).json({
            status: 'Success',
            results: stores.length,
            data: {
                filteredStores
            }
        });
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Conteúdo não encontrado!"
        });
        loggers_js_1.logger.error("Não foi possivel achar as lojas: ", error);
    }
});
//Pegando uma loja específica pelo id no banco de dados
const getStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield storeService_js_1.storeService.getStoreById(req.params.id);
        //Filtragem dos campos que irão ser mandado como resposta
        const filteredStore = {
            id: store.id,
            nome: store.nome,
            endereco: store.endereco,
            numero: store.numero
        };
        res.status(200).json({
            status: 'Success',
            data: {
                filteredStore
            }
        });
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Conteúdo não encontrado!"
        });
        loggers_js_1.logger.error("Não foi possivel achar a loja: ", error);
    }
});
//Pegando uma loja específica pelo id e atualizando-a no banco de dados
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
            message: "Algo deu errado, verifique seus dados!"
        });
        loggers_js_1.logger.error("Não foi possível editar a loja: ", error);
    }
});
//Pegando uma loja específica pelo id e deletando-a no banco de dados
const deleteStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield storeService_js_1.storeService.deleteStore(req.params.id);
        res.status(204).json({
            status: 'Success',
            data: {
                data: null
            }
        });
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Conteúdo não encontrado!"
        });
        loggers_js_1.logger.error("Não foi possível deletar a loja: ", error);
    }
});
//Achar as lojas mais próximas do usuário no raio de 100 km
const findNearbyStores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cep = req.params.cep;
        const storesDistance = yield storeService_js_1.storeService.findNearbyStores(cep);
        if (storesDistance.length === 0) {
            res.status(200).json({
                status: 'Success',
                message: 'Não há loja próximas no raio de 100 km'
            });
        }
        //Filtragem dos campos que irão ser mandado como resposta
        const filteredStores = storesDistance.map(store => ({
            id: store.id,
            nome: store.nome,
            endereco: store.endereco,
            numero: store.numero,
            distancia: Math.round(store.distancia * 100) / 100 + " km"
        }));
        res.status(200).json({
            status: 'Success',
            results: storesDistance.length,
            data: {
                filteredStores
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'FAIL',
            message: "Não foi possível filtrar as lojas, verifique seus dados!"
        });
        loggers_js_1.logger.info("Não foi possivel filtrar as lojas: ", error);
    }
});
//Criação e exportação de um objeto que contem todas as funções
exports.storeController = {
    createStore,
    createStoreByCep,
    getAllStores,
    getStore,
    updateStore,
    deleteStore,
    findNearbyStores
};
