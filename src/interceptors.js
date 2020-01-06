import axios from 'axios'
import store from '@/store'

axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    if(error.response.status === 422){
        store.dispatch('setValidationErrors', error.response.data)
    }
    return Promise.reject(error)
});
