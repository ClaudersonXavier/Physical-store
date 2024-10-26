export const stringfyNonJsonAdress = async (data: any) => {
    const adress = await data.json();
    const stringAddress = await stringfyAdress(adress)
    return stringAddress;
 }

export const stringfyAdress = async (data: any) => {
    const { logradouro, bairro, localidade, estado } = data;
    const stringAddress = `${logradouro}, ${bairro}, ${localidade} - ${estado}`;
    return stringAddress;
 }