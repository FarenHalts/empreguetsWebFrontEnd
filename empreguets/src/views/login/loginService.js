import axios from 'axios';

export default class AppApi {

    static async checkLogin(obj) {
        try {
            const response = await axios.post(`http://localhost:5000/users/login`, obj)
            return response.data
        } catch (err) {
            console.error('Ocorreu um erro na API')
        }
    }
}