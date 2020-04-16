<template>
    <tr>
        <td v-for="info in data" :key="info.name">
            <span class="t-field">{{info.name}}</span>
            <span class="t-value">{{info.value}}</span>
        </td>
    </tr>
</template>
<script>
    export default {
        props: {
            'data': {
                type: Array,
                required: true,
            },
        },
    }
</script>
