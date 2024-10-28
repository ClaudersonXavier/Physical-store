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
//Criação da loja com dados manuais --- não finalizado(doing)
const createStore = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = new storeSchema_js_1.Store();
        store.nome = data.nome;
        store.endereco = data.endereco;
        store.numero = data.numero;
        const adress = `${data.endereco.logradouro}, ${data.endereco.cidade}, ${data.endereco.estado}, Brasil`;
        store.coordenadas = yield (0, cepToCoordenates_js_1.getCoordenates)(adress);
        store.save();
        loggers_js_1.logger.info("Loja criada: ", store.toJSON);
        return store;
    }
    catch (error) {
        loggers_js_1.logger.error("Não foi possivel criar a loja: ", error);
        throw new Error('Someting goes wrong!');
    }
});
//Criação da loja com o CEP dado --- não finalizado(doing)
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
        store.save();
        loggers_js_1.logger.info("Loja criada: ", store.toJSON);
        return store;
    }
    catch (error) {
        loggers_js_1.logger.error("Não foi possivel criar a loja: ", error);
        throw new Error('Someting goes wrong!');
    }
});
//Pegando todas as lojas do banco de dados --- não finalizado(doing)
const getAllStores = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield storeSchema_js_1.Store.find();
        return stores;
    }
    catch (error) {
        loggers_js_1.logger.error("Não foi possivel acessar todas as lojas: ", error);
        throw new Error('Someting goes wrong!');
    }
});
//Pegando uma a loja do banco de dados pelo ID --- não finalizado(doing)
const getStoreById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield storeSchema_js_1.Store.findById(id);
        return store;
    }
    catch (error) {
        loggers_js_1.logger.error("Não foi possivel acessar a loja: ", error);
        throw new Error('Someting goes wrong!');
    }
});
//Atualizando uma a loja do banco de dados pelo ID --- não finalizado(doing)
const updateStore = (id, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateStore = yield storeSchema_js_1.Store.findByIdAndUpdate(id, params, {
            new: true,
            runValidators: true
        });
        return updateStore;
    }
    catch (error) {
        loggers_js_1.logger.error("Não foi possivel editar a loja: ", error);
        throw new Error('Someting goes wrong!');
    }
});
//Deletando uma a loja do banco de dados pelo ID --- não finalizado(doing)
const deleteStore = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield storeSchema_js_1.Store.findByIdAndRemove(id);
    }
    catch (error) {
        loggers_js_1.logger.error("Não foi possivel deletar a loja: ", error);
        throw new Error('Someting goes wrong!');
    }
});
//Query de lojas a 100 km do cep dado pelo usuario --- não finalizado(doing)
const findNearbyStores = (cep) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = yield (0, cepData_js_1.cepInfos)(cep.toString());
        const adress = `${newData.logradouro}, ${newData.localidade}, ${newData.estado}, Brasil`;
        const userLocation = yield (0, cepToCoordenates_js_1.getCoordenates)(adress);
        const nearbyStores = [];
        const stores = yield getAllStores();
        for (let store of stores) {
            store.distancia = (0, distanceCalculate_js_1.harvisineDistanceCalculator)(userLocation.latitude, userLocation.longitude, store.coordenadas.latitude, store.coordenadas.longitude);
            if (store.distancia <= 100) {
                nearbyStores.push(store);
            }
        }
        nearbyStores.sort((a, b) => {
            if (a.distancia < b.distancia)
                return -1;
            else
                return 1;
        });
        return nearbyStores;
    }
    catch (error) {
        loggers_js_1.logger.error("Não foi possivel acessar as lojas proximas: ", error);
        throw new Error('Someting goes wrong!');
    }
});
exports.storeService = {
    createStore,
    createStoreByCep,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore,
    findNearbyStores
};
