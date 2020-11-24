import axios from 'axios';

export default class Api{
    static async getPrestadores(token){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/prestador`, {headers: {authorization: token}})
    }
    static async getSolicitadores(token){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/solicitador`, {headers: {authorization: token}})
    }
    static async getTopPrestadores(token){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/topprestadores`, {headers: {authorization: token}})
    }
    static async getTopSolicitadores(token){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/topsolicitadores`, {headers: {authorization: token}})
    }
}