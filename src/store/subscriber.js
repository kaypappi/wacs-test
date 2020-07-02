import store from '@/store'
import axios from 'axios'

store.subscribe((mutation) => {
    switch (mutation.type) {

        case 'auth/SET_TOKEN':
            if(mutation.payload){
                 axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload.access_token}`;
                 localStorage.setItem('access_token', mutation.payload.access_token)
                 localStorage.setItem('userType', mutation.payload.userType)
            } else  {
                axios.defaults.headers.common['Authorization'] = null;
                localStorage.removeItem('access_token')
                localStorage.removeItem('userType')
            }
        break;
        
        
        
    }
});
