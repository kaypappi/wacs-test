import Vue from 'vue'
import { Can, abilitiesPlugin } from '@casl/vue'
import { AbilityBuilder } from '@casl/ability'
import store from '@/store'

    Vue.component('Can', Can);

export const defineAbilities = () => {
    function defineAbilitiesFor() {
        const { rules, can } = AbilityBuilder.extract();
        if(store.getters['Auth/authenticated']){
            store.getters['Auth/user'].data.permissions.forEach((permission)=>{
                can(...permission)
            })
        }
        return rules;
      }
    
    Vue.prototype.$ability.update(defineAbilitiesFor());
};

Vue.use(abilitiesPlugin);


