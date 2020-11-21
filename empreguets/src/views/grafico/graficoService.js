import axios from 'axios';
export default class api {
    static async getGraphicData(id) {
        return await axios.get('https://empreguets.herokuapp.com/teste', { headers: {Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxLCJpYXQiOjE2MDU1ODQ4MTAsImV4cCI6MTYwNTU4ODQxMH0.bJFuiWbN0MC_Nx1VkG81lPip5B0XC6u5WcjiHgMmihw' }});
    }
}
