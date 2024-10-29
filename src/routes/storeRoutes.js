"use strict";
const storeController_js_1 = require("../controllers/storeController.js");
const express_1 = require("express");
const validationCep_js_1 = require("../middlewares/validationCep.js");
const route = (0, express_1.Router)();
//Rotas com todas funções sobre as lojas
route.post("/", validationCep_js_1.validateCep, storeController_js_1.storeController.createStore);
route.post("/cep/:cep", validationCep_js_1.validateCep, storeController_js_1.storeController.createStoreByCep);
route.get("/", storeController_js_1.storeController.getAllStores);
route.get("/:id", storeController_js_1.storeController.getStore);
route.patch("/:id", storeController_js_1.storeController.updateStore);
route.delete("/:id", storeController_js_1.storeController.deleteStore);
route.get("/cep/:cep", validationCep_js_1.validateCep, storeController_js_1.storeController.findNearbyStores);
module.exports = route;
