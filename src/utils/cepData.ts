import {logger} from './loggers.js'

export const cepInfos = async (cep: string) => {
    logger.info("Requisição ao viaCEP");
    try{
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        
         
         if (!response.ok) {
            logger.error(`Erro na requisição ao viacep.`);
            throw new Error;
        }

        const data = await response.json()
        logger.info("Retornando os dados do viaCEP");
        return data;
    }catch(error){
        logger.error(error);
        throw new Error('Erro na requisição ao viacep.');
    }
}



