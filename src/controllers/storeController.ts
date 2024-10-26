import {logger} from '../utils/loggers.js'
import { storeService } from '../services/storeService.js'

//Criando a loja manualmente --- não finalizado (doing)
const createStore = async (req: any, res: any) => {
    try{
        const data = req.body;
        const store = await storeService.createStore(data);
        res.status(200).json({
            status: 'Success',
            data: {
                store
            }
        });
    }catch(error) {
        res.status(400).json({
            status: "Fail",
            message: error
        });
        logger.error("Não foi possível criar a loja: ", error);
    }
}

//Criando a loja com cep dado --- não finalizado (doing)
const createStoreByCep = async (req: any, res: any) => {
    try{
        
        res.status(200).json({
            status: 'Success',
            data: {
                
            }
        });
    }catch(error) {
        res.status(400).json({
            status: "Fail",
            message: error
        });
        logger.error("Não foi possível criar a loja: ", error);
    }
}


const getAllStores = async (_req: any, res: any) => {
    try{
        const stores = await storeService.getAllStores()

        res.status(200).json({
            status: 'Success',
            results: stores.length,
            data: {
                stores
            }
        });
    }catch(error) {
        res.status(404).json({
            status: "Fail",
            message: error
        });
        logger.error("Não foi possível acessar todas as lojas: ", error);
    }
}


const getStore = async (req: any, res: any) => {
    try{
        const store = await storeService.getStoreById(req.params.id);

        res.status(200).json({
            status: 'Success',
            data: {
                store
            }
        });
    }catch(error) {
        res.status(404).json({
            status: "Fail",
            message: error
        });
        logger.error("Não foi possível acessar a loja: ", error);
    }
}


const updateStore = async (req: any, res: any) => {

    try{

        const store = await storeService.updateStore(req.params.id, req.body);

        res.status(200).json({
            status: 'Success',
            data: {
                store
            }
        });
    }catch(error) {
        res.status(404).json({
            status: "Fail",
            message: error
        });
        logger.error("Não foi possível editar a loja: ", error);
    }
}


const deleteStore = async (req: any, res: any) => {

    try{

        await storeService.deleteStore(req.params.id)

        res.status(204).json({
            status: 'Success',
            data: null
        });
    }catch(error) {
        res.status(404).json({
            status: "Fail",
            message: error
        });
        logger.error("Não foi possível deletar a loja: ", error);
    }
}


const viaCep = async (req: any, res: any) =>{
    try{
        const cep = req.params.cep
        const storesDistance = await storeService.findNearbyStores(cep)
        
            res.status(200).json({
                status: 'Success',
                    data: {
                        storesDistance
                    }
            })
    }catch(error){
        res.status(500).json({
            status: 'FAIL',
                
        })

    }

}

export const storeController = {
    createStore,
    createStoreByCep,
    getAllStores,
    getStore,
    updateStore,
    deleteStore,
    viaCep
}