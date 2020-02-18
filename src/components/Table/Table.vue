<template>
    <div class="table-container">
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
    }
</script>
