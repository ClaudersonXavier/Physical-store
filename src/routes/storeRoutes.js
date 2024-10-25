"use strict";
const storeController_js_1 = require("../controllers/storeController.js");
const express_1 = require("express");
const route = (0, express_1.Router)();
route.post("/", storeController_js_1.createStore);
route.get("/", storeController_js_1.getAllStores);
route.get("/:id", storeController_js_1.getStore);
route.patch("/:id", storeController_js_1.updateStore);
route.delete("/:id", storeController_js_1.deleteStore);
route.get("/viaCep/:cep", storeController_js_1.viaCep);
module.exports = route;
