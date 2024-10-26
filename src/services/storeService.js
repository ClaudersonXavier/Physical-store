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
const stringHelper_js_1 = require("../utils/stringHelper.js");
//Criação da loja com dados manuais --- não finalizado(doing)
const createStore = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const store = new storeSchema_js_1.Store();
    store.nome = data.nome;
    store.endereco = data.endereco;
    store.numero = data.numero;
    const adress = yield (0, stringHelper_js_1.stringfyAdress)(data);
    store.coordenadas = yield (0, cepToCoordenates_js_1.getCoordenates)(adress);
    store.save();
    return store;
});
//Criação da loja com o CEP dado --- não finalizado(doing)
const createStoreByCep = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = yield (0, cepData_js_1.cepInfos)(data.cep);
    const store = new storeSchema_js_1.Store(newData);
    store.nome = data.nome;
    store.numero = data.numero;
    store.coordenadas = yield (0, cepToCoordenates_js_1.getCoordenates)(data.endereco.cep);
    store.save();
    return store;
});
//Pegando todas as lojas do banco de dados --- não finalizado(doing)
const getAllStores = () => __awaiter(void 0, void 0, void 0, function* () {
    const stores = yield storeSchema_js_1.Store.find();
    return stores;
});
//Pegando uma a loja do banco de dados pelo ID --- não finalizado(doing)
const getStoreById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield storeSchema_js_1.Store.findById(id);
    return store;
});
//Atualizando uma a loja do banco de dados pelo ID --- não finalizado(doing)
const updateStore = (id, params) => __awaiter(void 0, void 0, void 0, function* () {
    const updateStore = storeSchema_js_1.Store.findByIdAndUpdate(id, params, {
        new: true,
        runValidators: true
    });
    return updateStore;
});
//Deletando uma a loja do banco de dados pelo ID --- não finalizado(doing)
const deleteStore = (id) => __awaiter(void 0, void 0, void 0, function* () {
    storeSchema_js_1.Store.findByIdAndRemove(id);
});
//Query de lojas a 100 km do cep dado pelo usuario --- não finalizado(doing)
const findNearbyStores = (cep) => __awaiter(void 0, void 0, void 0, function* () {
    const userLocation = yield (0, cepToCoordenates_js_1.getCoordenates)(cep);
    const nearbyStores = [];
    const stores = yield getAllStores();
    for (let store of stores) {
        if ((0, distanceCalculate_js_1.harvisineDistanceCalculator)(userLocation.latitude, userLocation.longitude, store.coordenadas.latitude, store.coordenadas.longitude) <= 100) {
            nearbyStores.push(store);
        }
    }
    nearbyStores.sort((a, b) => {
        if (a < b)
            return 1;
        else
            return -1;
    });
    return nearbyStores;
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
