import store from '@/store';

export const beforeEach = (to, from, next) =>{
    store.dispatch('clearAllValidationErrors');

    next()
};