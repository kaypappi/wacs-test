import axios from 'axios'
import store from '@/store'

axios.interceptors.response.use((response) => {

    return response
}, (error) => {

    if(error.response.status === 422){
        store.dispatch('setValidationErrors', error.response.data)
    }
    if(error.response.status === 401){
        store.dispatch('setValidationErrors', {errors: {message: 'Username and password do not match'}})
    }
    return Promise.reject(error)
});
