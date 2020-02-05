<template>
    <nav>
        <ul>
            <li class="page-title">{{title}}</li>
            <li>{{entityName}}</li>
            <li v-if="userName"><img src="/assets/images/notification-icon.svg" alt="bell"></li>
            <li v-if="userName">
                {{userName}}
            </li>
            <Dropdown 
                iconName="sprite.svg#carret-arrow"
                :options="[
                    {
                        name: 'Change Password',
                        icon: 'change-password.svg',
                        handler: changePassword,
                    }, 
                    {
                        name: 'Logout',
                        icon: 'Sign-out.svg',
                        handler: logout
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
           'title': String,
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
            changePassword() {
                this.$router.push({
                    name: 'change password',
                })
            }
        },
    }
</script>
