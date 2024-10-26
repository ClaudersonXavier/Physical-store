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
exports.stringfyAdress = exports.stringfyNonJsonAdress = void 0;
const stringfyNonJsonAdress = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const adress = yield data.json();
    const stringAddress = yield (0, exports.stringfyAdress)(adress);
    return stringAddress;
});
exports.stringfyNonJsonAdress = stringfyNonJsonAdress;
const stringfyAdress = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { logradouro, bairro, localidade, estado } = data;
    const stringAddress = `${logradouro}, ${bairro}, ${localidade} - ${estado}`;
    return stringAddress;
});
exports.stringfyAdress = stringfyAdress;
