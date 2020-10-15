import axios from 'axios';

export default class Api{

    static async getCEP(cep) {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
            return response.data
        } catch (err) {
            console.error('Ocorreu um erro na API')
        }
    }
}