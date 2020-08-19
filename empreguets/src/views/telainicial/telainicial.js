import axios from 'axios';

export default class AppApi {

    static async findPermissionModules() {
        try {
            const response = await axios.get(`http://localhost:3000/teste-get/`,)
            return response.data
        } catch (err) {
            app.use(cors())
            console.error('Error fetching IAM roles API')
        }
    }
}