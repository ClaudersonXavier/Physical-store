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
exports.cepInfos = void 0;
const loggers_js_1 = require("./loggers.js");
const cepInfos = (cep) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://viacep.com.br/ws/${cep}/json/`);
        loggers_js_1.logger.info(response);
        if (!response.ok) {
            loggers_js_1.logger.error(`Erro na requisição: ${response.status}`);
            throw new Error;
        }
        loggers_js_1.logger.info(response);
        return response;
    }
    catch (error) {
        loggers_js_1.logger.info(error);
        return null;
    }
});
exports.cepInfos = cepInfos;
