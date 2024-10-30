import {logger} from '../utils/loggers.js'
import { storeService } from '../services/storeService.js'

//Criando a loja com todos os dados manuais
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
            message: "Algo deu errado, verifique os seus dados!"
        });
        logger.error("Não foi possivel criar a loja: ", error);
    }
}

//Criando a loja com as informações do cep dado
const createStoreByCep = async (req: any, res: any) => {
    try{
        const data = req.body;
        const cep = req.params.cep
        const store = await storeService.createStoreByCep(data, cep);
        res.status(200).json({
            status: 'Success',
            data: {
                store
            }
        });
    }catch(error) {
        res.status(400).json({
            status: "Fail",
            message: "Algo deu errado, verifique os seus dados!"
        });
        logger.error("Não foi possivel criar a loja: ", error);
    }
}

//Pegando todas as lojas do banco de dados
const getAllStores = async (_req: any, res: any) => {
    try{
        const stores = await storeService.getAllStores()

        //Filtragem dos campos que irão ser mandado como resposta
        const filteredStores = stores.map(store => ({
            id: store.id,
            nome: store.nome,
            endereco: store.endereco,
            numero: store.numero
        }));

        res.status(200).json({
            status: 'Success',
            results: stores.length,
            data: {
                filteredStores
            }
        });
    }catch(error) {
        res.status(404).json({
            status: "Fail",
            message: "Conteúdo não encontrado!"
        });
        logger.error("Não foi possivel achar as lojas: ", error);
    }
}

//Pegando uma loja específica pelo id no banco de dados
const getStore = async (req: any, res: any) => {
    try{
        const store = await storeService.getStoreById(req.params.id);

        //Filtragem dos campos que irão ser mandado como resposta
        const filteredStore = {
            id: store!.id,
            nome: store!.nome,
            endereco: store!.endereco,
            numero: store!.numero
        }

        res.status(200).json({
            status: 'Success',
            data: {
                filteredStore
            }
        });
    }catch(error) {
        res.status(404).json({
            status: "Fail",
            message: "Conteúdo não encontrado!"
        });
        logger.error("Não foi possivel achar a loja: ", error);
    }
}

//Pegando uma loja específica pelo id e atualizando-a no banco de dados
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
            message: "Algo deu errado, verifique seus dados!"
        });
        logger.error("Não foi possível editar a loja: ", error);
    }
}

//Pegando uma loja específica pelo id e deletando-a no banco de dados
const deleteStore = async (req: any, res: any) => {

    try{

        await storeService.deleteStore(req.params.id)

        res.status(204).json({
            status: 'Success',
            data: {
                data: null
            }
        });
    }catch(error) {
        res.status(404).json({
            status: "Fail",
            message: "Conteúdo não encontrado!"
        });
        logger.error("Não foi possível deletar a loja: ", error);
    }
}

//Achar as lojas mais próximas do usuário no raio de 100 km
const findNearbyStores = async (req: any, res: any) =>{
    try{
        const cep = req.params.cep
        const storesDistance = await storeService.findNearbyStores(cep)

        if(storesDistance.length === 0){
            res.status(200).json({
                status: 'Success',
                message: 'Não há loja próximas no raio de 100 km'
            })
        }
        //Filtragem dos campos que irão ser mandado como resposta
        const filteredStores = storesDistance.map(store => ({
            id: store.id,
            nome: store.nome,
            endereco: store.endereco,
            numero: store.numero,
            distancia: Math.round(store.distancia! * 100)/100 + " km"
        }));
        
        res.status(200).json({
            status: 'Success',
            results: storesDistance.length,
            data: {
                filteredStores
            }
        })
    }catch(error){
        res.status(500).json({
            status: 'FAIL',
            message: "Não foi possível filtrar as lojas, verifique seus dados!"
        })
        logger.info("Não foi possivel filtrar as lojas: ", error);
    }

}

//Criação e exportação de um objeto que contem todas as funções
export const storeController = {
    createStore,
    createStoreByCep,
    getAllStores,
    getStore,
    updateStore,
    deleteStore,
    findNearbyStores
}