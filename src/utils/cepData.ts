import {logger} from './loggers.js'

export const cepInfos = async (cep: string) => {
    try{
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        logger.info(response);
         
         if (!response.ok) {
            logger.error(`Erro na requisição: ${response.status}`);
            throw new Error;
        }

        logger.info(response);

        return response;
    }catch(error){
        logger.info(error);
        return null;
    }
}



