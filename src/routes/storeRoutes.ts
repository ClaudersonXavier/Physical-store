import {createStore, getStore, getAllStores, updateStore, deleteStore, viaCep} from '../controllers/storeController.js'
import {Router} from 'express'

const route = Router();

route.post("/", createStore);

route.get("/", getAllStores);

route.get("/:id", getStore);

route.patch("/:id", updateStore);

route.delete("/:id", deleteStore);

route.get("/viaCep/:cep", viaCep);

export = route;