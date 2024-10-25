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
exports.cepCoordenates = void 0;
const loggers_js_1 = require("./loggers.js");
const cepCoordenates = (cep) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://viacep.com.br/ws/${cep}/json/`);
        loggers_js_1.logger.info(response);
        if (!response.ok) {
            loggers_js_1.logger.error(`Erro na requisição: ${response.status}`);
            return null;
        }
        const adress = yield response.json();
        const { logradouro, bairro, localidade, uf } = adress;
        const fullAddress = `${logradouro}, ${bairro}, ${localidade} - ${uf}`;
        const coordenates = yield getCoordenates(fullAddress);
        loggers_js_1.logger.info(coordenates);
        return coordenates;
    }
    catch (error) {
        loggers_js_1.logger.info(error);
        return null;
    }
});
exports.cepCoordenates = cepCoordenates;
const getCoordenates = (adress) => __awaiter(void 0, void 0, void 0, function* () {
    const Response = yield fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(adress)}`);
    const Data = yield Response.json();
    if (Data.length === 0) {
        throw new Error('Coordenadas não encontradas');
    }
    return {
        latitude: Data[0].lat,
        longitude: Data[0].lon,
    };
});
