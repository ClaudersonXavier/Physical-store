import {Store} from '../models/storeSchema.js'
import { getCoordenates} from '../utils/cepToCoordenates.js'
import {cepInfos} from '../utils/cepData.js'
import {harvisineDistanceCalculator} from '../utils/distanceCalculate.js'
import {logger} from '../utils/loggers.js'


//Criação da loja com dados manuais
const createStore = async (data: any) =>{
    try{
        const store = new Store();
    
        store.nome = data.nome;
        store.endereco = data.endereco
        store.numero = data.numero;

        const adress = `${data.endereco.logradouro}, ${data.endereco.cidade}, ${data.endereco.estado}, Brasil`
        store.coordenadas = await getCoordenates(adress) 
    
        await store.save();
        logger.info("Requisição para criar loja.")
        return store;  
    }catch(error){
        logger.error("Não foi possivel criar a loja: ", error);
        throw new Error('Não foi possivel criar a loja!')
    }
}

//Criação da loja com o CEP dado
const createStoreByCep = async (data: any, cep: string) =>{
   try{
       const newData = await cepInfos(cep.toString());
       const store = new Store(newData);
    
        store.nome = data.nome;
        store.numero = data.numero;
        store.endereco!.CEP = cep;
        store.endereco!.estado = newData.estado;
        store.endereco!.cidade = newData.localidade;
        store.endereco!.logradouro = newData.logradouro;


        const adress = `${newData.logradouro}, ${newData.localidade}, ${newData.estado}, Brasil`
        store.coordenadas = await getCoordenates(adress) 
        
        await store.save();
        logger.info("Requisição para criar loja com CEP.")
        return store;  
       
   }catch(error){
        logger.error("Não foi possivel criar a loja: ", error);
        throw new Error('Não foi possivel criar a loja!')
   }
}

//Pegando todas as lojas do banco de dados 
const getAllStores = async () => {
    try{
        const stores = await Store.find();
        logger.info("Requesição de todas as lojas.")
        return stores;
    }catch(error){
        logger.error("Não foi possivel acessar todas as lojas: ", error);
        throw new Error('Não foi possivel encontrar as lojas!');
    }
}

//Pegando uma a loja do banco de dados pelo ID 
const getStoreById = async (id: string) => {
    try{
        const store = await Store.findById(id);
        if(!store){
            throw new Error('Loja não encontrada!');
        }
        logger.info("Requisição para encontrar loja.");
        return store;
    }catch(error){
        logger.error("Não foi possivel acessar a loja: ", error);
        throw new Error('Não foi possivel encontrar a loja.');
    }
}

//Atualizando uma a loja do banco de dados pelo ID
const updateStore = async (id: string, body: any) => {
    try{
        const store = await Store.findById(id);
        if(!store){
            throw new Error('Loja não encontrada!');
        }
        const updateStore = await Store.findByIdAndUpdate(id, body,{
            new: true,
            runValidators: true
        });

        const adress = `${updateStore!.endereco!.logradouro}, ${updateStore!.endereco!.cidade}, ${updateStore!.endereco!.estado}, Brasil`
        updateStore!.coordenadas = await getCoordenates(adress) 

        logger.info("Requisição para atualizar loja.")
        return updateStore;
    }catch(error){
        logger.error("Não foi possivel editar a loja: ", error);
        throw new Error('Erro ao editar a loja!');
    }
}

//Deletando uma a loja do banco de dados pelo ID
const deleteStore = async (id: string) => {
    try{
        const store = await Store.findById(id);
        if(!store){
            throw new Error('Loja não encontrada!');
        }
        logger.info("Requesição para deletar loja")
        await Store.findByIdAndRemove(id);
    }catch(error){
        logger.error("Não foi possivel deletar a loja: ", error);
        throw new Error('Erro ao deletar a loja!');
    }
}

//Query de lojas a 100 km do cep dado pelo usuario
const findNearbyStores = async (cep: string) => {
   try{
       const newData = await cepInfos(cep.toString());
       const adress = `${newData.logradouro}, ${newData.localidade}, ${newData.estado}, Brasil`
       const userLocation = await getCoordenates(adress);
       const nearbyStores = [];
       const stores = await getAllStores();

       //Loop para achar as lojas com menos de 100 km de distancia
       for(let store of stores){
          store.distancia = harvisineDistanceCalculator(userLocation.latitude, userLocation.longitude, store.coordenadas!.latitude!, 
            store.coordenadas!.longitude!) ;
          if(store.distancia <= 100){
            nearbyStores.push(store);
          }
       }
       
       //Ordendando de modo crescente
       nearbyStores.sort((a, b) =>{
        if(a.distancia! < b.distancia!) return -1
        else return 1
       })

       logger.info("Requisição para as lojas proximas: ");
       return nearbyStores;
   }catch(error){
        logger.error("Não foi possivel acessar as lojas proximas: ", error);
        throw new Error('Erro no processo de achar as lojas próximas!');
   }
}

//Objeto que contém todas as funções
export const storeService = {
    createStore,
    createStoreByCep,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore,
    findNearbyStores   
}

