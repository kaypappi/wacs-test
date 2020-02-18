<template>
    <div>
        <div class="page-filters">
            <SearchFilterInput 
                placeholder="Search by name, role, status"
                v-model="searchTerm"
                :onSearch="()=>{}"
            />        
        </div>
        <img src="/assets/images/page-ring-loader.svg" alt="loader" v-if="fetchingRequests" class="page-loader">
        <Table :tableHeaders="['Date', 'Name', 'Ippiss No.', 'Mont. Salary', 'Loan Request', 'Available Loan', 'Status']" v-else>
            <LoanRequestTableRow
              v-for="loanRequest in loanRequests"
              :key="loanRequest.id"
              :id="loanRequest.id"
              :date="loanRequest.Date"
              :name="loanRequest.Name"
              :ippissNo="7777777777"
              :salary="loanRequest.Mon_Salary"
              :loanRequest="loanRequest.Loan_Req"
              :availableLoan="loanRequest.Avail_loan"
              :status="loanRequest.Status"
            />
        </Table>
    </div>
</template>

<script>
    import axios from 'axios';
    import SearchFilterInput from '../components/Inputs/SearchFilterInput';
    import Table from '../components/Table/Table';
    import LoanRequestTableRow from '../components/Table/LoanRequestTableRow';

    export default {
        components: {
            SearchFilterInput,
            Table,
            LoanRequestTableRow,
        },
        data() {
            return {
                searchTerm: '',
                loanRequests: [],
                fetchingRequests: true,
            }
        },
        methods: {
            fetchLoanRequests() {
                this.fetchingRequests = true;
                axios.get(
                    'https://eefa7b97-cdec-42d9-a0ec-cdfd47d37847.mock.pstmn.io/loanrequest', 
                    {
                        headers: {
                            'x-api-key': 'PMAK-5e68f691b9867b002aa8f289-dc8516605218b3d250fe4da3a28142662c'
                        }
                    }
                )
                .then((res) => {
                    this.fetchingRequests = false;
                    this.loanRequests = res.data;
                })
                // .catch(err => {
                //     console.log('err', err);
                // });
            }
        },
        mounted() {
            this.fetchLoanRequests();
        },
    }
</script>

<style>

</style>