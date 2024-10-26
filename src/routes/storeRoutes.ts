import {storeController} from '../controllers/storeController.js'
import {Router} from 'express'

const route = Router();

route.post("/", storeController.createStore);

route.post("/cep/:cep", storeController.createStoreByCep);

route.get("/", storeController.getAllStores);

route.get("/:id", storeController.getStore);

route.patch("/:id", storeController.updateStore);

route.delete("/:id", storeController.deleteStore);

route.get("/Cep/:cep", storeController.viaCep);

export = route;