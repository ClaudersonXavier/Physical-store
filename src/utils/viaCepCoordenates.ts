import {logger} from './loggers.js'

export const cepCoordenates = async (cep: string) => {
    try{
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        logger.info(response);

         
         if (!response.ok) {
            logger.error(`Erro na requisição: ${response.status}`);
            return null;
        }

        const adress = await response.json();

        const { logradouro, bairro, localidade, uf } = adress;
        const fullAddress = `${logradouro}, ${bairro}, ${localidade} - ${uf}`;

        const coordenates = await getCoordenates(fullAddress)
        logger.info(coordenates);

        return coordenates;
    }catch(error){
        logger.info(error);
        return null;
    }
}


const getCoordenates = async (adress: string) =>{
    const Response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(adress)}`);
    const Data = await Response.json();

    if (Data.length === 0) {
        throw new Error('Coordenadas não encontradas');
    }

    return {
        latitude: Data[0].lat,
        longitude: Data[0].lon,
    };
}