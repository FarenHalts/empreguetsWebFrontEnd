import axios from 'axios';

export default class Api{

    static async getPrestadoresLocalization(auth){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/localizationPrestador`, {headers: {authorization: auth}})
    }
    static async getSolicitadoresLocalization(auth){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/localizationSolicitador`, {headers: {authorization: auth}})
    }
}