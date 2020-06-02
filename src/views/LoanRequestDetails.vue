<template>
    <div class="full-user-details">
        <Toast 
            :show="toast.show"
            :title="toast.title"
            :successMessage="toast.message"
            failureMessage="Invalid token"
            :success="toast.success"
        />
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
    import Toast from '../components/Toast'
    export default {
        components: {
            NoBorderTableRow,
            Toast
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
                toast:{
                    show:false,
                    title:'',
                    message:"",
                    success:false
                },
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
                })
               
            },
            showToast(title,message,success){
                    this.toast={show:true,title,message,success}
                        setTimeout(()=>{
                            this.toast.show=false
                        },2000)
            },
            declineRequest() {
                const URL=baseUrl+`creditor/request/decline`
                const data={id:this.offerId}
                axios.post(URL,data).then(Response=>{
                    this.showToast('Successful',Response.message,true)
                    setTimeout(()=>{
                            this.$router.push({name:'loanRequest'})
                        },2000)
                })
                
            },
            makeOffer() {
                this.$router.push({name:'makeOffer',params:{offerId:this.offerId}});
            },
            splitDetails(loanData) {
                this.customerName = loanData.user.full_name;
                this.offerId=loanData.offer.id
                //const userData=this.$route.params.userData
                this.firstRowBio = [
                    {name: 'Ippiss Number', value: loanData.user.ippis_number},
                    {name: 'Phone Number', value: loanData.user.mobile_number},
                    {name: 'Marital Status', value: loanData.user.marital_status},
                    {name: 'Monthly Salary', value: loanData.user.monthly_salary},
                ];
                this.secondRowBio = [
                    {name: 'MDA', value: loanData.user.mda},
                    {name: 'Gender', value: loanData.user.gender},
                    {name: 'BVN', value: loanData.user.bvn},
                    {name: 'Email', value: loanData.user.email},
                ];
                this.thirdRowBio = [
                    {name: 'Religion', value: loanData.user.religion},
                    {name: 'State Of Origin', value: loanData.user.state},
                    {name: 'Nationality', value: loanData.user.nationality},
                    {name: 'Address', value: loanData.user.address},
                ];
                this.loanDetailsRow = [
                    {name: 'Date Requested', value: loanData.date},
                    {name:  'Loan Offer', value:loanData.offer.title},
                    {name: 'Requested Amount', value: loanData.amount},
                    {name: 'Repayment Period', value: loanData.offer.payback_period+" Months"},
                    {name: 'First Repayment Date', value: loanData.offer.moratorium_period+ " months after"},
                    {name: 'Interest Rate', value: loanData.offer.interest_rate},
                ];
                this.loanHistory = loanData.user.loan_history;
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