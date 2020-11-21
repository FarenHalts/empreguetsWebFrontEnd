import axios from 'axios';

export default class Api{

    static async getRates(id,auth){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/avaliacoes/${id}`, {headers: {authorization: auth}})
    }
}