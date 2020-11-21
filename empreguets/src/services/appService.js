import axios from 'axios';

export default class Api{
    static async getProfile(token){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/profile`, {headers: {authorization: token}})
    }
    static async checkSolicitations(id, token){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/agendamento/${id}`, {headers: {authorization: token}})
    }
    static async acceptService(obj, token){
        return await axios.post(`${process.env.VUE_APP_BASEURL}/aceitarservico`, obj ,{headers: {authorization: token}})
    }
    static async rejectService(obj, token){
        return await axios.post(`${process.env.VUE_APP_BASEURL}/rejeitarservico`, obj ,{headers: {authorization: token}})
    }
}