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
exports.storeService = void 0;
const storeSchema_js_1 = require("../models/storeSchema.js");
const cepToCoordenates_js_1 = require("../utils/cepToCoordenates.js");
const cepData_js_1 = require("../utils/cepData.js");
const distanceCalculate_js_1 = require("../utils/distanceCalculate.js");
const loggers_js_1 = require("../utils/loggers.js");
//Criação da loja com dados manuais
const createStore = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = new storeSchema_js_1.Store();
        store.nome = data.nome;
        store.endereco = data.endereco;
        store.numero = data.numero;
        const adress = `${data.endereco.logradouro}, ${data.endereco.cidade}, ${data.endereco.estado}, Brasil`;
        store.coordenadas = yield (0, cepToCoordenates_js_1.getCoordenates)(adress);
        yield store.save();
        loggers_js_1.logger.info("Loja criada.");
        return store;
    }
    catch (error) {
        loggers_js_1.logger.error("Não foi possivel criar a loja: ", error);
        throw new Error('Não foi possivel criar a loja!');
    }
});
//Criação da loja com o CEP dado
const createStoreByCep = (data, cep) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = yield (0, cepData_js_1.cepInfos)(cep.toString());
        const store = new storeSchema_js_1.Store(newData);
        store.nome = data.nome;
        store.numero = data.numero;
        store.endereco.CEP = cep;
        store.endereco.estado = newData.estado;
        store.endereco.cidade = newData.localidade;
        store.endereco.logradouro = newData.logradouro;
        const adress = `${newData.logradouro}, ${newData.localidade}, ${newData.estado}, Brasil`;
        store.coordenadas = yield (0, cepToCoordenates_js_1.getCoordenates)(adress);
        yield store.save();
        loggers_js_1.logger.info("Loja criada com o CEP.");
        return store;
    }
    catch (error) {
        loggers_js_1.logger.error("Não foi possivel criar a loja: ", error);
        throw new Error('Não foi possivel criar a loja!');
    }
});
//Pegando todas as lojas do banco de dados 
const getAllStores = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield storeSchema_js_1.Store.find();
        loggers_js_1.logger.info("Retornando todas as lojas");
        return stores;
    }
    catch (error) {
        loggers_js_1.logger.error("Não foi possivel acessar todas as lojas: ", error);
        throw new Error('Não foi possivel encontrar as lojas!');
    }
});
//Pegando uma a loja do banco de dados pelo ID 
const getStoreById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield storeSchema_js_1.Store.findById(id);
        if (!store) {
            throw new Error('Loja não encontrada!');
        }
        loggers_js_1.logger.info("Retornando a loja encontrada.");
        return store;
    }
    catch (error) {
        loggers_js_1.logger.error("Não foi possivel acessar a loja: ", error);
        throw new Error('Não foi possivel encontrar a loja.');
    }
});
//Atualizando uma a loja do banco de dados pelo ID
const updateStore = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const store = yield storeSchema_js_1.Store.findById(id);
        if (!store) {
            throw new Error('Loja não encontrada!');
        }
        const updateStore = yield storeSchema_js_1.Store.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });
        if (store.endereco.CEP !== ((_a = updateStore.endereco) === null || _a === void 0 ? void 0 : _a.CEP)) {
            const adress = `${updateStore.endereco.logradouro}, ${updateStore.endereco.cidade}, ${updateStore.endereco.estado}, Brasil`;
            updateStore.coordenadas = yield (0, cepToCoordenates_js_1.getCoordenates)(adress);
        }
        loggers_js_1.logger.info("Loja atualizada.");
        return updateStore;
    }
    catch (error) {
        loggers_js_1.logger.error("Não foi possivel editar a loja: ", error);
        throw new Error('Erro ao editar a loja!');
    }
});
//Deletando uma a loja do banco de dados pelo ID
const deleteStore = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield storeSchema_js_1.Store.findById(id);
        if (!store) {
            throw new Error('Loja não encontrada!');
        }
        loggers_js_1.logger.info("Loja deletada.");
        yield storeSchema_js_1.Store.findByIdAndRemove(id);
    }
    catch (error) {
        loggers_js_1.logger.error("Não foi possivel deletar a loja: ", error);
        throw new Error('Erro ao deletar a loja!');
    }
});
//Query de lojas a 100 km do cep dado pelo usuario
const findNearbyStores = (cep) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = yield (0, cepData_js_1.cepInfos)(cep.toString());
        const adress = `${newData.logradouro}, ${newData.localidade}, ${newData.estado}, Brasil`;
        const userLocation = yield (0, cepToCoordenates_js_1.getCoordenates)(adress);
        const nearbyStores = [];
        const stores = yield getAllStores();
        //Loop para achar as lojas com menos de 100 km de distancia
        for (let store of stores) {
            store.distancia = (0, distanceCalculate_js_1.harvisineDistanceCalculator)(userLocation.latitude, userLocation.longitude, store.coordenadas.latitude, store.coordenadas.longitude);
            if (store.distancia <= 100) {
                nearbyStores.push(store);
            }
        }
        //Ordendando de modo crescente
        nearbyStores.sort((a, b) => {
            if (a.distancia < b.distancia)
                return -1;
            else
                return 1;
        });
        loggers_js_1.logger.info("Busca de lojas próximas concluida.");
        return nearbyStores;
    }
    catch (error) {
        loggers_js_1.logger.error("Não foi possivel acessar as lojas proximas: ", error);
        throw new Error('Erro no processo de achar as lojas próximas!');
    }
});
//Objeto que contém todas as funções
exports.storeService = {
    createStore,
    createStoreByCep,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore,
    findNearbyStores
};
