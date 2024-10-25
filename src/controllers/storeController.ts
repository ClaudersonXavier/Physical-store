import {Store} from '../models/storeSchema.js'
import {logger} from '../utils/loggers.js'
import {cepCoordenates} from '../utils/viaCepCoordenates.js'
import {harvisineDistanceCalculator} from '../utils/distanceCalculate.js'


export const createStore = async (req: any, res: any) => {
    try{

        const newStore = await Store.create(req.body);
        

        res.status(200).json({
            status: 'Success',
            data: {
                newStore
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


export const getAllStores = async (_req: any, res: any) => {
    try{
        const stores = await Store.find();

        res.status(200).json({
            status: 'Success',
            results: Store.length,
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


export const getStore = async (req: any, res: any) => {
    try{
        const store = await Store.findById(req.params.id);

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


export const updateStore = async (req: any, res: any) => {

    try{

        const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

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


export const deleteStore = async (req: any, res: any) => {

    try{

        await Store.findByIdAndDelete(req.params.id)

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


export const viaCep = async (req: any, res: any) =>{
    const cep = req.params.cep
    const userLocation = await cepCoordenates(cep);

    const stores = await Store.find();
    const storesDistance = [];

    for(let store of stores){
        const storeLocation = await cepCoordenates(store.endereco!.CEP);
        if (storeLocation) {
            const distance = harvisineDistanceCalculator(userLocation!.latitude, userLocation!.longitude, storeLocation.latitude, storeLocation.longitude);

            if (distance <= 100) {
                storesDistance.push({ store, distance });
            }
        }
    }

    storesDistance.sort((a, b) => a.distance - b.distance);

    
    if (storesDistance.length > 0) {
        res.status(200).json({
            status: 'Success',
                data: {
                    storesDistance
                }
        })
        
    } 
    else{
        res.status(500).json({
            status: 'FAIL',
                
        })
    }

}