<template>
    <div class="left-menu">
        <div v-for="(menu, index) in menus" :key="index" class="left-menu-items" :class="{'active-left-menu': currentNameSpace === menu.nameSpace}" @click="goTo(menu.to)">
            <img :src="menu.iconPath" :alt="menu.altText">
            <span>{{menu.name}}</span>
        </div>
    </div>
</template>

<script>
    import {defineAbilities} from '@/services/roles';

    export default {
        props: {
           'name': String,
           'iconPath': String,
           'to': String,
           'altText': String,
        },
        data() {
            return {
                menuItems: [
                    {
                        name: "Loan Management",
                        iconPath: "/assets/images/Money.svg",
                        altText: "money",
                        to: "/ippis/dashboard",
                        permission: ["read", "loan"],
                        nameSpace: 'loan',
                    },
                    
                ],
            }
        },
        methods: {
            goTo(location) {
                this.$router.push({path: location})
            },
        },
        computed: {
            menus() {
                return this.menuItems.filter(item => this.$can(item.permission[0], item.permission[1]))
            },
            currentNameSpace() {
                return this.$route.meta.nameSpace;
            }
        },
        mounted() {
            defineAbilities();
        },

    }
</script>
