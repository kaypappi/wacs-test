<template>
    <nav>
        <ul>
            <li v-if="details.parents" class="page-title">
                <span v-for="(parent, index) in details.parents" :key="index" @click="goBack((details.parents.length - index)*-1)" class="back-link">{{parent}} / </span>
                <span>{{details.title}}</span>
            </li>
            <li v-else class="page-title">{{details.title}}</li>
            <li>{{entityName}}</li>
            <li v-if="userName"><img @click="goToNotifications" src="/assets/images/notification-icon.svg" alt="bell"></li>
            <li v-if="userName">
                {{userName}}
            </li>
            <Dropdown v-if="userName"
                iconName="sprite.svg#carret-arrow"
                :options="[
                    {
                        name: 'Change Password',
                        icon: 'change-password.svg',
                        handler: changePassword,
                        shouldRender: true,
                    }, 
                    {
                        name: 'Logout',
                        icon: 'Sign-out.svg',
                        handler: logout,
                        shouldRender: true,
                    }, 
                ]"
            />
        </ul>
        
    </nav>
</template>

<script>
    import Dropdown from './Dropdown/Dropdown';
    export default {
        components: {
            Dropdown,
        },
        props: {
           'details': Object,
           'entityName': String,
           'userName': String,
        },
        methods: {
            logout() {
                this.$store.dispatch('auth/logout').then(() => {
                    this.$router.push({
                        name: 'login',
                    }).catch(()=>{})
                });
            },
            goToNotifications(){
                this.$router.push({name:'notifications'})
            },
            changePassword() {
                this.$router.push({
                    name: 'changePassword',
                })
            },
            goBack(times) {
                this.$router.go(times);
            }
        },
    }
</script>
