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
                        name: "Dashboard",
                        iconPath: "/assets/images/Money.svg",
                        altText: "money",
                        to: "/ippis/dashboard",
                        permission: ["manage", "repayment"],
                        nameSpace: 'dashboard',
                    },
                    {
                        name: "Loan Management",
                        iconPath: "/assets/images/Money.svg",
                        altText: "money",
                        to: "/ippis/loanrequest",
                        permission: ["manage", "repayment"],
                        nameSpace: 'loan',
                    },
                    {
                        name: "User Management",
                        iconPath: "/assets/images/Money.svg",
                        altText: "money",
                        to: "/ippis/usermanagement",
                        permission: ["manage", "repayment"],
                        nameSpace: 'usermanagement',
                    },
                    {
                        name: "Employee Records",
                        iconPath: "/assets/images/Money.svg",
                        altText: "money",
                        to: "/ippis/masterrecords",
                        permission: ["view", "master-records"],
                        nameSpace: 'ippis masterRecords',
                    },
                    {
                        name: "Deduction",
                        iconPath: "/assets/images/Money.svg",
                        altText: "money",
                        to: "/ippis/deduction",
                        permission: ["view", "historical-records"],
                        nameSpace: 'ippis Deduction',
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
