import {Store} from '../models/storeSchema.js'
import { getCoordenates} from '../utils/cepToCoordenates.js'
import {cepInfos} from '../utils/cepData.js'
import {harvisineDistanceCalculator} from '../utils/distanceCalculate.js'
import {stringfyAdress} from '../utils/stringHelper.js'
import {logger} from '../utils/loggers.js'


//Criação da loja com dados manuais --- não finalizado(doing)
const createStore = async (data: any) =>{
    const store = new Store();

    store.nome = data.nome;
    store.endereco = data.endereco
    store.numero = data.numero
    const adress = await stringfyAdress(data)
    store.coordenadas = await getCoordenates(adress) 

    store.save();
    return store;  
}

//Criação da loja com o CEP dado --- não finalizado(doing)
const createStoreByCep = async (data: any) =>{
   const newData = await cepInfos(data.cep);
   const store = new Store(newData);

    store.nome = data.nome;
    store.numero = data.numero;

    store.coordenadas = await getCoordenates(data.endereco.cep) 

    store.save();
    return store;  
}

//Pegando todas as lojas do banco de dados --- não finalizado(doing)
const getAllStores = async () => {
    const stores = await Store.find();
    return stores;
}

//Pegando uma a loja do banco de dados pelo ID --- não finalizado(doing)
const getStoreById = async (id: string) => {
    const store = await Store.findById(id);
    return store;
}

//Atualizando uma a loja do banco de dados pelo ID --- não finalizado(doing)
const updateStore = async (id: string, params: any) => {
    const updateStore = Store.findByIdAndUpdate(id, params,{
        new: true,
        runValidators: true
    });
    return updateStore;
}

//Deletando uma a loja do banco de dados pelo ID --- não finalizado(doing)
const deleteStore = async (id: string) => {
    Store.findByIdAndRemove(id);
}

//Query de lojas a 100 km do cep dado pelo usuario --- não finalizado(doing)
const findNearbyStores = async (cep: string) => {
   const userLocation = await getCoordenates(cep);
   const nearbyStores = [];
   const stores = await getAllStores();

   for(let store of stores){
      if(harvisineDistanceCalculator(userLocation.latitude, userLocation.longitude, store.coordenadas!.latitude!, 
         store.coordenadas!.longitude!) <= 100){
        nearbyStores.push(store);
      }
   }

   nearbyStores.sort((a, b) =>{
    if(a < b) return 1
    else return -1
   })

   return nearbyStores;
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

