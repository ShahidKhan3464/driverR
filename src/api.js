import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL
// const baseURL = 'https://db28-203-99-174-147.ngrok-free.app/'
const authToken = localStorage.getItem('authToken')

class ApiClient {

    constructor() {
        this.client = axios.create({
            baseURL: baseURL,
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
                'ngrok-skip-browser-warning': 'ngrok-skip-browser-warning',
            },
        })
    }

    async get(endpoint, params) {
        const response = await this.client.get(endpoint, { params })
        return response
    }

    async post(endpoint, data) {
        const response = await this.client.post(endpoint, data)
        return response
    }

    async put(endpoint, data) {
        const response = await this.client.put(endpoint, data)
        return response
    }

    async delete(endpoint, data) {
        const response = await this.client.delete(endpoint, { data })
        return response
    }
}

export default ApiClient