<template>
    <div class="full-user-details">
        <img src="/assets/images/page-ring-loader.svg" alt="loader" v-if="fetchingRequests" class="page-loader">
        <template >
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
                    <tr class="t-field" :key="history.Date">
                        <td>
                            {{history.Date}}
                        </td>
                        <td>
                            {{history.loanOffer_coll}}
                        </td>
                        <td>
                            {{history.crdt_admin}}
                        </td>
                        <td>
                            {{history.loan_amount}}
                        </td>
                        <td>
                            {{history.amount_paid}}
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
    export default {
        components: {
            NoBorderTableRow,
        },
        data() {
            return {
                customerName: '',
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
                axios.get('http://wacs.mocklab.io/viewloan')
                .then((res) => {
                    this.fetchingRequests = false;
                    const loanData = res.data.find(data => data.id == this.requestId);
                    this.splitDetails(loanData);
                })
                .catch(err=>console.log(err))
               
            },
            declineRequest() {
                alert(`declining loan request of id ${this.requestId} for ${this.customerName}`);
            },
            makeOffer() {
                this.$router.push('/make-offer');
            },
            splitDetails(loanData) {
                this.customerName = loanData['bio-data'].Name;
                this.firstRowBio = [
                    {name: 'Ippiss Number', value: loanData['bio-data'].Ippis_No},
                    {name: 'Phone Number', value: loanData['bio-data'].phone_no},
                    {name: 'Marital Status', value: loanData['bio-data'].Marital_Stat},
                    {name: 'Monthly Salary', value: loanData['bio-data'].Mon_Salary},
                ];
                this.secondRowBio = [
                    {name: 'MDA', value: loanData['bio-data'].MDA},
                    {name: 'Gender', value: loanData['bio-data'].Gender},
                    {name: 'BVN', value: loanData['bio-data'].BVN},
                    {name: 'Email', value: loanData['bio-data'].Email},
                ];
                this.thirdRowBio = [
                    {name: 'Religion', value: loanData['bio-data'].religion},
                    {name: 'State Of Origin', value: loanData['bio-data'].State_of_origin},
                    {name: 'Nationality', value: loanData['bio-data'].Nationality},
                    {name: 'Address', value: loanData['bio-data'].Address},
                ];
                this.loanDetailsRow = [
                    {name: 'Date Requested', value: loanData['loan-details'].Date_req},
                    {name: 'Requested Amount', value: loanData['loan-details'].Req_Amount},
                    {name: 'Repayment Period', value: loanData['loan-details'].First_PaynDate},
                    {name: 'First Repayment Date', value: loanData['loan-details'].Repayn_Period},
                    {name: 'Interest Rate', value: loanData['loan-details'].Interest_rate},
                ];
                this.loanHistory = loanData['loan-history'];
            }
        },
        mounted() {
            this.fetchLoanDetails();
        },
    }
</script>

<style>

</style>