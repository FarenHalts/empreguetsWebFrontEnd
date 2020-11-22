import axios from 'axios';

export default class Api{
    static async services(id, token){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/servico/${id}`, {headers: {authorization: token}})
    }
    static async rateService(obj, token){
        return await axios.post(`${process.env.VUE_APP_BASEURL}/avaliarservico`, obj ,{headers: {authorization: token}})
    }
}