<template>
    <tr class="loan-request-table-row" @click="goToDetails(id)">
        <td>{{date}}</td>
        <td class="text-capitalize">{{name}}</td>
        <td>{{ippissNo}}</td>
        <td>{{mda}}</td>
        <td>{{salary}}</td>
        <td>{{loanRequest}}</td>
        <td>{{creditAdmin}}</td>
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
            'mda':String,
            'salary': [String, Number],
            'loanRequest': [String, Number],
            'creditAdmin':String,
            'availableLoan': [String, Number],
            'status': String,
        },
        methods: {
            goToDetails(id) {
                console.log('madness',)
                this.$router.push(
                    {
                        name:'adminLoanDetails',params:{requestId:id}
                    }
                )
            }
        },
    }
</script>
