<template>
    <div class="left-menu">
        <div v-for="(menu, index) in menus" :key="index" class="left-menu-items" @click="goTo(menu.to)">
            <img :src="menu.iconPath" :alt="menu.altText">
            <span>{{menu.name}}</span>
        </div>
    </div>
</template>

<script>
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
                    to: "/",
                    permission: ["manage", "loan"],
                },
                {
                    name: "User Management",
                    iconPath: "/assets/images/User.svg",
                    altText: "money",
                    to: "/user-setup",
                    permission: ["create", "user"],
                },
                {
                    name: "Repayment",
                    iconPath: "/assets/images/Chart-bar.svg",
                    altText: "chart",
                    to: "/",
                    permission: ["manage", "repayment"],
                }
                ],
            }
        },
        methods: {
            goTo(location) {
                this.$router.push(
                    {
                        path: location,
                    }
                )
            },
        },
        computed: {
            menus() {
                return this.menuItems.filter(item => this.$can(item.permission[0], item.permission[1]))
            },
        }
    }
</script>
