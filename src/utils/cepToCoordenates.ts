export const getCoordenates = async (adress: string) =>{
    try{
        const Response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(adress)}`);
        const Data = await Response.json();
    
        if (Data.length === 0) {
            throw new Error('Coordenadas não encontradas');
        }
    
        return {
            latitude: Data[0].lat,
            longitude: Data[0].lon,
        };
    } catch(error){
        throw new Error('Erro nomatin');
    }
}