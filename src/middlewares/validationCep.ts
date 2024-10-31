export const validateCep = (req: any, res: any, next: any) => {
    const data = req.params.cep || req.body;


    // Verifica se o CEP está presente
    const cep: string = typeof(data) === 'string' ? data : data.endereco.CEP
  
    if (!cep) {
        return res.status(400).json({
            status: 'Fail',
            message: 'O cep é obrigatório, informe um CEP!'
        });
    }

    

    if(cep.length > 9 || cep.length < 8){
        return res.status(400).json({
            status: 'Fail',
            message: 'Cep inválido, informe um cep válido!'
        });
    }

    if(cep.includes('-') && cep[5] !== '-'){
        return res.status(400).json({
            status: 'Fail',
            message: 'Cep inválido, informe um cep válido!'
        });
    }

    const cepReplaced = cep.replace('-','')

    if(cepReplaced.length !== 8){
        return res.status(400).json({
            status: 'Fail',
            message: 'Cep inválido, informe um cep válido!'
        });
    }

    const onlyNumbers = () =>{
        for (let i = 0; i < cepReplaced.length; i++) {
            //tabela ascii
            if (cepReplaced[i] < '0' || cepReplaced[i] > '9') {
                return false;
            }
        }
        return true;
    }

    if(!onlyNumbers()){
        return res.status(400).json({
            status: 'Fail',
            message: 'Cep inválido, informe um cep válido!'
        });
    }

    next();
};

