<template>
    <div class="full-user-details">
        <img src="/assets/images/page-ring-loader.svg" alt="loader" v-if="fetchingRequests" class="page-loader">
        <template v-else >
            <div class="details-top">
                <h3>{{customerName}}</h3>
                <Button class="cta-button decline-btn margin-left-auto" @click="declineRequest">
                    <img src="/assets/images/cancel.svg" alt="Plus sign">
                    Decline
                </Button>
                <Button class="cta-button margin-left-30" @click="makeOffer">
                    <img src="/assets/images/double-check.svg" alt="Plus sign">
                    Make Offer 
                </Button>
            </div>
            <table class="table personal-info-table no-border-table">
                <NoBorderTableRow
                    :data="firstRowBio"
                />
                <NoBorderTableRow
                    :data="secondRowBio"
                />
                <NoBorderTableRow
                    :data="thirdRowBio"
                />
            </table>

            <h5>Loan Details</h5>
            <table class="table personal-info-table no-border-table">
                <NoBorderTableRow
                    :data="loanDetailsRow"
                />
            </table>

            <h5>Loan History</h5>
            <table class="table personal-info-table border-table">
                <tr class="t-head">
                    <td >
                        Date
                    </td>
                    <td>
                        Loan Offer Collected
                    </td>
                    <td>
                        Credit Administrator
                    </td>
                    <td>
                        Loan Amount
                    </td>
                    <td>
                        Amount Paid
                    </td>
                </tr>
                <template v-for="history in loanHistory">
                    <tr class="t-field" :key="history.date">
                        <td>
                            {{history.date}}
                        </td>
                        <td>
                            {{history.title}}
                        </td>
                        <td>
                            {{history.description}}
                        </td>
                        <td>
                            {{history.amount_from}}
                        </td>
                        <td>
                            {{history.amount_from}}
                        </td>
                    </tr>
                </template>
            </table>
        </template>
    </div>
</template>

<script>
    import axios from 'axios';
    import NoBorderTableRow from '../components/Table/NoBorderTableRow';
    import {baseUrl} from '../router/api_routes'
    export default {
        components: {
            NoBorderTableRow,
        },
        data() {
            return {
                customerName: '',
                offerId:"",
                fetchingRequests: true,
                firstRowBio: [],
                secondRowBio: [],
                thirdRowBio: [],
                loanDetailsRow: [],
                loanHistory: [],
                requestId: '',
            }
        },
        methods: {
            fetchLoanDetails() {
                this.requestId = this.$route.params.requestId;
                this.fetchingRequests = true;
                const URL=baseUrl+'creditor/request/view/'+this.requestId
                axios.get(URL)
                .then((res) => {
                    this.fetchingRequests = false;
                    const loanData = res.data.data[0]
                    this.splitDetails(loanData);
                    console.log(res)
                })
                .catch(err=>console.log(err))
               
            },
            declineRequest() {
                alert(`declining loan request of id ${this.requestId} for ${this.customerName}`);
            },
            makeOffer() {
                this.$router.push({name:'makeOffer',params:{offerId:this.offerId}});
            },
            splitDetails(loanData) {
                console.log(loanData)
                this.customerName = loanData.user_info.full_name;
                this.offerId=loanData.offer_details.id
                //const userData=this.$route.params.userData
                this.firstRowBio = [
                    {name: 'Ippiss Number', value: loanData.user_info.ippis_number},
                    {name: 'Phone Number', value: loanData.user_info.mobile_number},
                    {name: 'Marital Status', value: loanData.user_info.marital_status},
                    {name: 'Monthly Salary', value: loanData.user_info.monthly_salary},
                ];
                this.secondRowBio = [
                    {name: 'MDA', value: loanData.user_info.mda},
                    {name: 'Gender', value: loanData.user_info.gender},
                    {name: 'BVN', value: loanData.user_info.bvn},
                    {name: 'Email', value: loanData.user_info.email},
                ];
                this.thirdRowBio = [
                    {name: 'Religion', value: loanData.user_info.religion},
                    {name: 'State Of Origin', value: loanData.user_info.state},
                    {name: 'Nationality', value: loanData.user_info.nationality},
                    {name: 'Address', value: loanData.user_info.address},
                ];
                this.loanDetailsRow = [
                    {name: 'Date Requested', value: loanData.date},
                    {name: 'Requested Amount', value: loanData.amount},
                    {name: 'Repayment Period', value: loanData.offer_details.payback_period+" Months"},
                    {name: 'First Repayment Date', value: loanData.offer_details.moratorium_period+ " months after"},
                    {name: 'Interest Rate', value: loanData.offer_details.interest_rate},
                ];
                this.loanHistory = loanData.user_info.loan_history;
            }
        },
        mounted() {
            this.fetchLoanDetails();
            //console.log(this.$route)
        },
    }
</script>

<style>

</style>