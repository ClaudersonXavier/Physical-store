import {logger} from "../utils/loggers"
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
mongoose.set('strictQuery', false);

const DB = process.env.DATABASE!;

//Função para inicialização e conexão com o banco de dados.
export const dataBase = async () =>{
    try{
       await mongoose.connect(DB).then((con: { connections: any; }) =>{
            logger.info("Banco de dados conectado com sucesso!");
        })  
    }catch(error){
        logger.error("Erro na conexão com o banco de dados: ", error);
    }
    
}



