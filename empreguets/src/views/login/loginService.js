import axios from 'axios';

export default class Api{

    static async login(data){
        return await axios.post(`${process.env.VUE_APP_BASEURL}/login`, data)
    }
    static async verifyToken(){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/profile`, {headers: {authorization: localStorage.getItem('token')}})
    }
}