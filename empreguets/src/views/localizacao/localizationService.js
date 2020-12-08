import axios from 'axios';

export default class Api{

    static async getPrestadoresLocalization(auth){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/localizationPrestador`, {headers: {authorization: auth}})
    }
    static async getSolicitadoresLocalization(auth){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/localizationSolicitador`, {headers: {authorization: auth}})
    }
    static async getOnePrestador(id, auth){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/prestador/${id}`, {headers: {authorization: auth}})
    }
    static async getOneSolicitador(id, auth){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/solicitador/${id}`, {headers: {authorization: auth}})
    }
}