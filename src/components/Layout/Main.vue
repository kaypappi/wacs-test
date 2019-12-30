<template>
     <div class="main">
        <div class="left">
            <img src="/assets/images/WACS.png" class="logo" alt="WACS logo">
            <div class="left-menu">
                <LeftMenuItems v-for="(menu, index) in menuItems" :key="index"
                    :name="menu.name"
                    :iconPath="menu.iconPath"
                    :altText="menu.altText"
                    :to="menu.to"
                />
            </div>
        </div>
        <div class="right">
            <Header
              title="User Setup"
              entityName="Gtbank"
              userName="Olaniyi Mohammed"
            />
            <div class="main-body">
                <div class="main-body-content">
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../Header';
    import LeftMenuItems from '../LeftMenuItems';
    export default {
        components: {
            Header,
            LeftMenuItems,
        },
         data() {
            return {
                menuItems: [
                    {
                        name: "Loan Management",
                        iconPath: "/assets/images/Money.svg",
                        altText: "money",
                        to: "/",
                    },
                    {
                        name: "User Setup",
                        iconPath: "/assets/images/User.svg",
                        altText: "money",
                        to: "/user-setup",
                    },
                    {
                        name: "Loan Management",
                        iconPath: "/assets/images/Chart-bar.svg",
                        altText: "money",
                        to: "/",
                    }
                ]
            }
        },
    }
</script>
