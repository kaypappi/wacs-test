import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:8000/api/v1`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export default {
  getAdmins(perPage, page) {
    return apiClient.get('/user/creditor')
  },
  addAdmin(data) {
    return apiClient.post('/user/creditor', data)
  }
}
