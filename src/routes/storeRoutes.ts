import {createStore, getStore, getAllStores, updateStore, deleteStore} from '../controllers/storeController.js'
import {Router} from 'express'

const route = Router();

route.post("/", createStore);

route.get("/", getAllStores);

route.get("/:id", getStore);

route.patch("/:id", updateStore);

route.delete("/:id", deleteStore);

export = route;