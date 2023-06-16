import axios from 'axios';

// const { REACT_APP_PUBLIC_URL } = process.env
const authToken = localStorage.getItem('authToken')

const baseURL = 'https://dev.tirminator.com'
// const baseURL = 'https://2410-119-155-38-72.ngrok-free.app'
// const baseURL = 'https://100b-119-155-49-70.ngrok-free.app'

class ApiClient {

    constructor() {
        this.client = axios.create({
            baseURL: baseURL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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