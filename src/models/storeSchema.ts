import mongoose, { Schema } from 'mongoose';

//Criação do modelo da loja
const storeSchema = new Schema({
    nome: {
        type: String,
        required: [true, "A loja deve ter um nome."]
    },
    endereco: {
        CEP: {
            type: String,
            required: [true, "A loja deve ter um CEP."]
        },
        estado: {
            type: String,
            required: [true,"A loja deve dizer em qual estado está."]
        },
        cidade: {
            type: String,
            required: [true, "A loja deve dizer em qual cidade está."]
        },
        logradouro: {
            type: String,
            required: [true, "A loja deve dizer em qual logradouro está."]
        }
    },
    numero: {
        type: String,
        required: [true, "A loja deve ter um numero."]
    },
    distancia: {
        type: Number,
        required: false
    },
    coordenadas: {
        latitude: {
            type: Number,
            required: false
        },
        longitude: {
            type: Number,
            required: false
        }
    }
})

//Exportação do modelo da loja
export const Store = mongoose.model('Store', storeSchema);