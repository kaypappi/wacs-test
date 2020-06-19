<template>
    <tr class="loan-request-table-row" @click="goToDetails(id)">
        <td>{{date}}</td>
        <td class="text-capitalize">{{name}}</td>
        <td>{{ippissNo}}</td>
        <td>{{salary}}</td>
        <td>{{loanRequest}}</td>
        <td><span :class="{'status-circle':true, pending:status==='Pending', rejected:status==='Declined'}"></span>{{status}}</td>
    </tr>
</template>
<script>
    export default {
        props: {
            'id': Number,
            'date': [String, Number],
            'name': String,
            'ippissNo': [String, Number],
            'salary': [String, Number],
            'loanRequest': [String, Number],
            'availableLoan': [String, Number],
            'status': String,
        },
        methods: {
            goToDetails(id) {
                this.$router.push(
                    {
                        name:'loanRequestDetails',params:{requestId:id}
                    }
                )
            }
        },
    }
</script>
