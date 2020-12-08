import axios from 'axios';

export default class Api{

    static async getRates(id, auth){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/avaliacoes/${id}`, {headers: {authorization: auth}})
    }
    static async updatePrestador(obj, auth){
        return await axios.put(`${process.env.VUE_APP_BASEURL}/prestador`, obj ,{headers: {authorization: auth}})
    }
    static async updateSolicitador(obj, auth){
        return await axios.put(`${process.env.VUE_APP_BASEURL}/solicitador`, obj ,{headers: {authorization: auth}})
    }
}