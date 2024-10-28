import {Store} from '../models/storeSchema.js'
import { getCoordenates} from '../utils/cepToCoordenates.js'
import {cepInfos} from '../utils/cepData.js'
import {harvisineDistanceCalculator} from '../utils/distanceCalculate.js'
import {stringfyAdress} from '../utils/stringHelper.js'
import {logger} from '../utils/loggers.js'


//Criação da loja com dados manuais --- não finalizado(doing)
const createStore = async (data: any) =>{
    try{
        const store = new Store();
    
        store.nome = data.nome;
        store.endereco = data.endereco
        store.numero = data.numero;

        const adress = `${data.endereco.logradouro}, ${data.endereco.cidade}, ${data.endereco.estado}, Brasil`
        store.coordenadas = await getCoordenates(adress) 
    
        store.save();
        logger.info("Loja criada: ", store.toJSON)
        return store;  
    }catch(error){
        logger.error("Não foi possivel criar a loja: ", error);
        throw new Error('Someting goes wrong!')
    }
}

//Criação da loja com o CEP dado --- não finalizado(doing)
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
        
        store.save();
        logger.info("Loja criada: ", store.toJSON)
        return store;  
       
   }catch(error){
        logger.error("Não foi possivel criar a loja: ", error);
        throw new Error('Someting goes wrong!')
   }
}

//Pegando todas as lojas do banco de dados --- não finalizado(doing)
const getAllStores = async () => {
    try{
        const stores = await Store.find();
        return stores;
    }catch(error){
        logger.error("Não foi possivel acessar todas as lojas: ", error);
        throw new Error('Someting goes wrong!');
    }
}

//Pegando uma a loja do banco de dados pelo ID --- não finalizado(doing)
const getStoreById = async (id: string) => {
    try{
        const store = await Store.findById(id);
        return store;
    }catch(error){
        logger.error("Não foi possivel acessar a loja: ", error);
        throw new Error('Someting goes wrong!');
    }
}

//Atualizando uma a loja do banco de dados pelo ID --- não finalizado(doing)
const updateStore = async (id: string, params: any) => {
    try{
        const updateStore = await Store.findByIdAndUpdate(id, params,{
            new: true,
            runValidators: true
        });
        return updateStore;
    }catch(error){
        logger.error("Não foi possivel editar a loja: ", error);
        throw new Error('Someting goes wrong!');
    }
}

//Deletando uma a loja do banco de dados pelo ID --- não finalizado(doing)
const deleteStore = async (id: string) => {
    try{
        await Store.findByIdAndRemove(id);
    }catch(error){
        logger.error("Não foi possivel deletar a loja: ", error);
        throw new Error('Someting goes wrong!');
    }
}

//Query de lojas a 100 km do cep dado pelo usuario --- não finalizado(doing)
const findNearbyStores = async (cep: string) => {
   try{
       const newData = await cepInfos(cep.toString());
       const adress = `${newData.logradouro}, ${newData.localidade}, ${newData.estado}, Brasil`
       const userLocation = await getCoordenates(adress);
       const nearbyStores = [];
       const stores = await getAllStores();
    
       for(let store of stores){
          store.distancia = harvisineDistanceCalculator(userLocation.latitude, userLocation.longitude, store.coordenadas!.latitude!, 
            store.coordenadas!.longitude!) ;
          if(store.distancia <= 100){
            nearbyStores.push(store);
          }
       }
    
       nearbyStores.sort((a, b) =>{
        if(a.distancia! < b.distancia!) return -1
        else return 1
       })
    
       return nearbyStores;
   }catch(error){
        logger.error("Não foi possivel acessar as lojas proximas: ", error);
        throw new Error('Someting goes wrong!');
   }
}

export const storeService = {
    createStore,
    createStoreByCep,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore,
    findNearbyStores   
}

