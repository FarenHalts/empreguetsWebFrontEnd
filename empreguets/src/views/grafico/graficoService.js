import axios from 'axios';
export default class api {
    static async getGraphicData(id) {
        try {
            const resposta = await axios.get(process.env.VUE_APP_BASEURL + '/grafico/203');
            return resposta.data
        } catch (err) {
            console.warn('Erro na API');
        }
    }
}
