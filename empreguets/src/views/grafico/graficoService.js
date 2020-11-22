import axios from 'axios';

export default class Api{
    static async getGraphicData(id, token){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/grafico/${id}`, {headers: {authorization: token}})
    }
}