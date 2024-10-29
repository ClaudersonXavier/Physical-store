import {storeController} from '../controllers/storeController.js'
import {Router} from 'express'
import { validateCep } from '../middlewares/validationCep.js';

const route = Router();

//Rotas com todas funções sobre as lojas

route.post("/", validateCep ,storeController.createStore);

route.post("/cep/:cep", validateCep ,storeController.createStoreByCep);

route.get("/", storeController.getAllStores);

route.get("/:id", storeController.getStore);

route.patch("/:id", storeController.updateStore);

route.delete("/:id", storeController.deleteStore);

route.get("/cep/:cep", validateCep, storeController.findNearbyStores);

export = route;