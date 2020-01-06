import Vue from 'vue'
import { Can, abilitiesPlugin } from '@casl/vue'
import { AbilityBuilder } from '@casl/ability'
import store from '@/store'

Vue.component('Can', Can);


let abilities = AbilityBuilder.define(can => {
    if(store.getters['auth/authenticated'].data){
        store.getters['auth/user'].data.permissions.forEach((permission)=>{
            can(...permission)
        })
    }
});
Vue.use(abilitiesPlugin, abilities);