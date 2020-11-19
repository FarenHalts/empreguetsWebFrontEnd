import axios from 'axios';

export default class Api{
    static async getProfile(token){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/profile`, {headers: {authorization: token}})
    }
}