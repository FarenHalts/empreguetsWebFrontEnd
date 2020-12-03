import axios from 'axios';

export default class Service{
    static async markService(obj){
        return await axios.post(`${process.env.VUE_APP_BASEURL}/marcarservico`, obj ,{headers: {authorization: localStorage.getItem('token')}})
    }
    static async reservedDates(id){
        return await axios.get(`${process.env.VUE_APP_BASEURL}/datasReservadas/${id}`,{headers: {authorization: localStorage.getItem('token')}})
    }
}