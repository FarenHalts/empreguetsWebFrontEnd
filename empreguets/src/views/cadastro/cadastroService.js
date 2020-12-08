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
    static async registerPrestador(data){
        return await axios.post(`${process.env.VUE_APP_BASEURL}/prestador`, data)
    }
    static async registerSolicitador(data){
        return await axios.post(`${process.env.VUE_APP_BASEURL}/solicitador`, data)
    }
    // static async getLatLngPrest(adressData){
    //     return await axios.get(`https://photon.komoot.io/api?lang=en&limit=1&q=${adressData.cep}+${adressData.num}+curitiba+${adressData.rua}`)
    // }
    static async getLatLngPrest(adressData){
        return await axios.get(`https://photon.komoot.io/api?lang=en&limit=1&q=${adressData.rua}+${adressData.num}+curitiba`)
    }
}