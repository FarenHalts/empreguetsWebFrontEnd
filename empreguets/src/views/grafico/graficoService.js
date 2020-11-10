import axios from 'axios';
export default class api {
    static async getGraphicData(id) {
        try {
            const resposta = await axios.get('http://localhost:5000/grafico/195');
            return resposta.data

        } catch (err) {
            console.warn('Erro na API');
        }
    }
}
