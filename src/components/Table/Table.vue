<template>
    <div style="overflow-x:auto;">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="(title, index) in tableHeaders" :key="index">{{title}}</th>
                </tr>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props: {
            'tableHeaders': Array,
        },
        methods: {
            deactivate() {
                alert('deactivating');
            },
            resetPassword() {
                alert('resetting password');
            },
            initials(fullName) {
                const names = fullName.split(' ');
                return names[0][0]+names[1][0];
            },
        },
    }
</script>
