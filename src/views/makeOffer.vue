<template>
    <div>
        <Toast 
            :show="getToast.show"
            :title="getToast.title"
            :successMessage="getToast.message"
            :failureMessage="getToast.message"
            :success="getToast.success"
        />
        <div class="section-header">
            <MakeOfferSectionTitle :section="1" title="Basic Info" :steps="steps"/>
            <span class="arrow-separator">></span>
            <MakeOfferSectionTitle :section="2" title="Repayment Schedule" :steps="steps"/>
            <span class="arrow-separator">></span>
            <MakeOfferSectionTitle :section="3" title="Summary" :steps="steps"/>
        </div>
        <img
                    src="/assets/images/page-ring-loader.svg"
                    alt="loader"
                    v-if="isFetching"
                    class="page-loader"
                    />
        <div v-else class="make-offer-div">
        
        <transition name="fade">
        <div v-if="steps==2" class="side-basic-info">
            <div class="basic-info-content">
                <div class="section-head">
                Basic Info
            </div>   
            <h6>Loan Amount</h6>
            <p>N{{offer.loan_amount}}</p>
            <h6>Repayment Period</h6>
            <p>{{offer.repayment_period}} Months</p>
            <h6>Interest Rate</h6>
            <p>{{offer.interest}}%</p>
            <h6>Moratorium Period</h6>
            <p>{{this.positons[this.offer.moratorium - 1] + " Month "}}</p>
            </div>
        </div>
        </transition>
        <div class="form-wrapper">
                <!-- <div v-if="serverResponse" class="error-div">{{serverResponse}}</div> -->
                
                <form  @submit.prevent="goToNext">
                    <template v-if="steps===1">
                         <div :style="{maxWidth:'400px',margin:'0 auto'}">
                             <div class="section-head">
                                Basic Info
                                <p>enter the basic info for your offer</p>
                            </div>
                        <TaggedInput
                            label="Loan Amount"
                            id="amount"
                            name="amount"
                            labelClass="form-modal-label"
                            placeholder="e.g 200,000"
                            length="long"
                            type="text"
                            :required="true"
                            :tagLeft="true"
                            :tagRight="false"
                            leftImage="naira.svg"
                            @input="tempDataPush($event,'loan_amount')"
                            v-model="offer.loan_amount"
                        />
                        <div class="first-repayment">
                            <div class="">
                            <label for="payback-period" class="form-modal-label">Repayment Period</label>
                            <!-- <select name="payback-period" id="payback-period" class="form-modal-inputs " required v-model="offer.repayment_period">
                                <option value="0" >Select Month</option>
                                <option v-for="n in 12" :value="n" :key="n">{{n}} {{n == 1 ? 'Month' : 'Months'}}</option>
                            </select> -->
                            <TextInput v-model.number="offer.repayment_period" :required="true" type="number" placeholder="In Months"  inputClass="inputClasses" length="short"  />
                        </div>
                        <TaggedInput
                            label="Interest Rate"
                            id="interest"
                            name="interest"
                            placeholder="e.g 4"
                            labelClass="form-modal-label"
                            length="long"
                            :tagLeft="false"
                            :tagRight="true"
                            rightImage="percent.svg"
                            v-model.number="offer.interest"
                        />
                        </div>
                        <label for="moratorium" class="form-modal-label margin-top-30">Moratorium Period (time of first repayment)</label>
                        <span class="form-field-info">(on interest and principal)</span>
                        <select name="moratorium" id="moratorium" class="form-modal-inputs" required v-model="offer.moratorium">
                            <option :value="0" hidden>Select Month</option>
                            <option :value="1">1 Month</option>
                            <option :value="2">2 Months</option>
                            <option :value="3">3 Months</option>
                        </select>
                        <p class="error-div" v-show="errors.step1">{{errors.step1}}</p>
                        <button >Next</button>
                         </div>
                    </template>
                </form>
                
                   
                        <template v-if="steps===2">
                            <div :style="{maxWidth:'400px',margin:'0 auto'}">
                                <div class="section-head">
                                Repayment Schedule
                                <p>provide a repayment schedule for your offer</p>
                            </div>
                        <div class="radio-switch-wrapper">
                            <div class="radio-div">
                            <input type="radio" id="equal-schedule" class="radio-select" name="scheduleType" v-model="equalRepayment" :value="true">
                            <label for="equal-schedule">
                                <span class="custom-radio"></span>
                                Equal Repayments
                            </label>
                        </div>
                        <div class="radio-div">
                            <input type="radio" id="upload-schedule" class="radio-select" name="scheduleType" v-model="equalRepayment" :value="false">
                            <label for="upload-schedule">
                                <span class="custom-radio"></span>
                                Unequal Repayments
                            </label>
                        </div>
                        </div>

                        <template v-if="equalRepayment">
                            <form @submit.prevent="goToNext">
                                <TaggedInput
                                    label="Repayment Amount"
                                    fieldInfo="(Equal monthly deductions)"
                                    id="amount"
                                    name="amount"
                                    labelClass="form-modal-label"
                                    placeholder="e.g 200,000"
                                    length="long"
                                    type="text"
                                    :keyupEvent="formatNumber"
                                    :max="offer.loan_amount"
                                    :tagLeft="true"
                                    :tagRight="false"
                                    leftImage="naira.svg"
                                    @input="formatNumberField($event,'repayment_amount')"
                                    v-model="offer.repayment_amount"
                                />

                                
                                 <p class="error-div" v-if="errors.step2.equal">{{errors.step2.equal}}</p>
                                <div class="nav-buttons-wrapper">
                                    <button @click="goToPrev" class="previous-btn" type="button">
                                    <span><BIconArrowLeft/></span>
                                    Back
                                </button>
                                <button>Next</button>
                                </div>
                            </form>
                        </template>

                        <div v-if="!equalRepayment" class="upload-schedule-div">
                            <form @submit.prevent="goToNext">
                            <p class="form-modal-label"><img src="/assets/images/file.svg" alt="">Enter Repayment Schedule</p>
                            <div class="schedule-wrapper" :key="index" v-for="(n,index) in (offer.unequal_repayment)">
                                <div class="text-input">
                                    <label for="">{{index==0?'No.':''}}</label>
                                    <input placeholder="No" :disabled="true" v-model="offer.unequal_repayment[index].no" type="text">
                                </div>
                                <div class="text-input">
                                    <label :key="Math.random()*10+index" for="repayment-month">{{index==0?'Months':''}}</label>
                                    <input :key="Math.random()*10+index" placeholder="No" :disabled="true" :value="months[offer.unequal_repayment[index].month]" type="text">
                                </div>
    
                                <div class="text-input">
                                    <label for="repayment-year">{{index==0?'Year':''}}</label>
                                    <input :key="Math.random()*10+index" placeholder="No" :disabled="true" :value="offer.unequal_repayment[index].year" type="text">
                                </div>
                                
                            
                                    <TaggedInput
                                        :label="index==0 ? 'Amount' : ''"
                                        name="amount"
                                        length="long"
                                        labelClass="form-modal-label"
                                        :required="false"
                                        :placeholder="n <= offer.moratorium ? 'moratorium' : 'e.g 200,000'"
                                        :tagLeft="true"
                                        :max="offer.loan_amount"
                                        type="text"
                                        :tagRight="false"
                                        leftImage="naira.svg"
                                        @input="formatUnequalAmount($event,index)"
                                        v-model="offer.unequal_repayment[index].amount"
                                    />
                            </div>
                            <p class="error-div" v-show="errors.step2.unequal">{{errors.step2.unequal}}</p>
                            <div class="nav-buttons-wrapper">
                                    <button @click="goToPrev" class="previous-btn" type="button">
                                    <span><BIconArrowLeft/></span>
                                    Back
                                </button>
                                <button>Next</button>
                                </div>
                            </form>
                        </div>
                            </div>
                    </template>
                    <template v-if="steps===3">
                         <div class="section-head">
                            Summary
                            <p>Preview your entries to complete your offer.</p>
                            </div>
                        <MakeOfferSummary :equalRepayment="equalRepayment" :offer="offer"/>
                        <div class="summary-total">
                            <p>Total</p>
                            <p>{{formatNumber(summaryTotal)}}</p>
                        </div>
                        <div class="summary-nav-buttons">
                                    <button @click="goToPrev" class="previous-btn" type="button">
                                    <span><BIconArrowLeft/></span>
                                    Back
                                </button>
                                <button @click="submitWizard"><img :style="{height:'100%',width:'auto'}" v-if="isMakingOffer" src="/assets/images/button-ring-loader.svg"/><span v-if="!isMakingOffer">Submit</span></button>
                                </div>
                    </template>
                   
        </div>
        
    </div>
    </div>
</template>

<script>
    import TaggedInput from '../components/Inputs/TaggedInput';
    import TextInput from '../components/Inputs/TextInput'
   // import DragDropFileInput from '../components/Inputs/DragDropFileInput';
    import MakeOfferSectionTitle from '../components/MakeOfferSectionsTitle'
    import MakeOfferSummary from '../components/MakeOfferSummary'
    import {BIconArrowLeft} from 'bootstrap-vue'
    import {baseUrl} from '../router/api_routes'
    import Toast from '../components/Toast'
    import axios from "axios"
    import moment from 'moment'
    export default {
        components: {
            TaggedInput,
           // DragDropFileInput,
            MakeOfferSectionTitle,
            BIconArrowLeft,
            MakeOfferSummary,
            Toast,
            TextInput
        },
        data() {
            return {
                monthCount: 1,
                months:["January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"],
                positons: [
                    "First",
                    "Second",
                    "Third",
                    "Fourth",
                    "Fifth",
                    "Sixth",
                    "Seventh",
                    "Eight",
                    "Nineth",
                    "Tenth",
                    "Eleventh",
                    "Twelveth"
                ],
                equalRepayment: true,
                steps:1,
                offerId:'',
                completeBasicInfo: false,
                formData:new FormData(),
                file:new File([""], ""),
                formValues:'',
                fileLoading:false,
                errors:{
                    step1:'',
                    step2:{
                        equal:'',
                        unequal:''
                    }
                },
                tempData:{
                    loan_amount:'',
                    repayment_amount:''
                },
                offer: { 
                    repayment_period:0,
                    moratorium:0,
                    loan_amount:"",
                    csv_repayment:[],
                    first_repayment_month:0,
                    last_repayment_month:0,
                    first_repayment_year:0,
                    last_repayment_year:0,
                    unequal_repayment:[{month:0,year:0,no:1,amount:""}]
                },
            }
        },
        methods: {
            submit() {
                
            },
            fileChange(file) {
                //const formData = new FormData();
                this.formData.append('csvUpload', file);
                this.formValues = this.formData;
                this.file=file
                const URL=baseUrl+'creditor/repayments/csvRead'
                this.fileLoading=true
                axios.post(URL,this.formValues).then(response=>{
                    this.offer.csv_repayment=[...response.data]
                    this.fileLoading=false
                })
                .catch(()=>{
                    this.fileLoading=false
            })},
            addMonth() {
                if(this.offer.unequal_repayment.length<this.offer.repayment_period){
                    const unequal_repayment_length=this.offer.unequal_repayment.length
                    const month=this.offer.unequal_repayment[unequal_repayment_length-1].month==12 ? 1 : this.offer.unequal_repayment[unequal_repayment_length-1].month +1
                    const year=this.offer.unequal_repayment[unequal_repayment_length-1].month==12? this.offer.unequal_repayment[unequal_repayment_length-1].year +1: this.offer.unequal_repayment[unequal_repayment_length-1].year
                    const no=parseInt(this.offer.unequal_repayment[unequal_repayment_length-1].no) +1
                    this.offer.unequal_repayment=[...this.offer.unequal_repayment,{month,year,no,amount:""}]
                }
            },
            checkProperties(obj) {
                let valid=true, EmptyItems=[]

                obj.map(item=>{
                    if(Object.values(item).filter(item=> item===null || item==="" ||item===undefined).length>0){
                        EmptyItems=[...EmptyItems,item]
                    }
                })
                if(EmptyItems.length>0){
                    valid=false
                }
                return valid
            },
            validateStepOne(){
                if(this.offer.repayment_period==0 || this.offer.moratorium==0){
                    this.errors.step1='All fields are required'
                    return false
                }
                this.errors.step1=''
                return true
            },
            validateEqual(){

                /* if(this.offer.first_repayment_month==0||this.offer.first_repayment_year==0||this.offer.last_repayment_month==0||this.offer.last_repayment_year==0){
                    this.errors.step2.equal='All fields are required'
                    return false
                } */
                if(this.getTotalEqualRepaymentAmount() <this.stripString(this.offer.loan_amount)){
                    this.errors.step2.equal='Total repayment amount cannot be less than loan amount'
                    return false
                }
                this.errors.step2.equal=''
                return true
            },
            validateUnequal(){
                if(this.formValues){
                    let valid=this.checkProperties(this.offer.csv_repayment)

                    if(!valid){
                        this.errors.step2.unequal='All fields are required for manual schedule entry'
                    }
                    else if(this.getTotalCsvRepaymentAmount() < this.stripString(this.offer.loan_amount)){
                        valid=false
                        this.errors.step2.unequal='Total repayment amount cannot be less than loan amount'
                    }
                    else{
                        this.errors.step2.unequal=''
                    }

                    return valid
                    //return true
                }
                else{
                    let valid=this.checkProperties(this.offer.unequal_repayment)
                    if(!valid){
                        this.errors.step2.unequal='All fields are required for manual schedule entry'
                    }
                    else if(this.getTotalUnequalRepaymentAmount() < this.stripString(this.offer.loan_amount)){
                        valid=false
                        this.errors.step2.unequal='Total repayment amount cannot be less than loan amount'
                    }
                    else{
                        this.errors.step2.unequal=''
                    }

                    return valid
                }
            },

            validateStepTwo(){
                if(this.equalRepayment){
                    return this.validateEqual()
                }
                else{
                    return this.validateUnequal()
                }
            },
            goToNext() {
                if(this.steps===1){
                    const valid=this.validateStepOne()
                    if(valid){
                        this.steps = this.steps+1;
                    }
                    return
                }
                if(this.steps===2){
                    const valid=this.validateStepTwo()
                    if(valid){
                        this.steps=this.steps+1
                    }
                    return
                }
            },
            goToPrev() {
                this.steps = this.steps-1;
            },
            handleInput(event,type,position){
                if(position){
                this.offer[type][position]=event
                }
                else{
                    this.offer[type]=event
                    
                }
            },
            showToast(title,message,success){
                    this.toast={show:true,title,message,success}
                        setTimeout(()=>{
                            this.toast.show=false
                        },2000)
            },
            
            getTotalEqualRepaymentAmount(){
                return this.stripString(this.offer.repayment_amount) * this.offer.repayment_period
            },
            getTotalCsvRepaymentAmount(){
               return this.offer.csv_repayment.reduce((a, b) => ({amount: parseFloat(this.stripString(a.amount)) + parseFloat(this.stripString(b.amount))})).amount;
            },
            getTotalUnequalRepaymentAmount(){
                return this.offer.unequal_repayment.reduce((a, b) => ({amount: parseFloat(this.stripString(a.amount)) + parseFloat(this.stripString(b.amount))})).amount;
            },
            monthDiff(firstDate, secondDate) {
                firstDate=moment(firstDate)
                secondDate=moment(secondDate)
                return firstDate.diff(secondDate,'months')
                },
                formatNumber(num) {
                return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                },
            submitWizard(){
                const data=this.getSubmitData
                const formData=new FormData()
                for ( var key in data ) {
                    formData.append(key, data[key]);
                }                
                if(this.equalRepayment){
                    const amount=parseInt(this.stripString(this.offer.repayment_amount))
                    const startDate=moment().add(this.offer.moratorium,'months');
                    let month=this.formatMonth(startDate.month()),
                    year=startDate.year();
                    data.plan_type="equal"
                    data.plan={month,year,amount}
                }
                else{
                    if(this.offer.csv_repayment.length>0){
                        data.plan_type="unequal"
                        data.plan=[...this.offer.csv_repayment]
                        /* formData.append("plan_type", "unequal");
                        formData.append("csvUpload",this.formValues); */
                    }
                    else{
                        data.plan_type="unequal"
                        data.plan=this.offer.unequal_repayment.map(item=>{
                            return {...item,amount:this.stripString(item.amount),month:moment().month(item.month).format("MMMM")}
                        })
                    }
                }

               this.$store.dispatch("CreditorLoanRequest/makeOffer",data)
                
            },
            formatMonth(month){
                if(month<9){
                    return `0${month+1}`
                }
                return `${month+1}`
            },
            fetchLoanDetails(requestId){
                return this.$store.dispatch("CreditorLoanRequest/fetchLoanRequestsDetials",requestId)
            },
            getDefaultValues(data){
                //this.fetchLoanDetails(requestId)
                if (data.amount){
                    this.offer.loan_amount=this.formatNumber(data.amount)
                    this.offer.repayment_period=data.offer.payback_period
                    this.offer.interest=data.offer.interest_rate
                    this.offer.moratorium=data.offer.moratorium_period
                    //this.populateUnequalRepayment()
                }

            },
            getDefaultData(){
                const loanDetails=this.$store.state.CreditorLoanRequest.loanDetails
                this.offerId=loanDetails.offer.id
                return this.getDefaultValues(loanDetails)
            },
            formatNumberField(num,position) {
            num=this.stripString(num)
            this.offer[position]= Number(num).toLocaleString() 
            },
            formatUnequalAmount(num,index){
                num=this.stripString(num)
                this.offer.unequal_repayment[index].amount=Number(num).toLocaleString() 
            },
            stripString(data){
            return data.toString().replace(/,/g,"")
            },
            tempDataPush(data,position){
                this.tempData[position]=data
            },
            populateUnequalRepayment(){
                const data = [];
                const startDate=moment().add(this.offer.moratorium,'months');
                let startMonth=startDate.month(),
                startYear=startDate.year();
                for(let index=0; index<this.offer.repayment_period; index++){
                    let month = (startMonth + index) % 12,
                        year =
                        startYear +
                            Math.floor((startMonth + index) / 12);
                        const obj = {
                        no: index + 1,
                        month: month,
                        year,
                        amount: this.offer.repayment_amount
                        };
                    data[index]={...obj}
                }
                this.offer.unequal_repayment=[...data]
            }
            
        },
        computed: {
            summaryTotal(){
                let total=""
                if(this.equalRepayment){
                    total=this.getTotalEqualRepaymentAmount()
                }
                else{
                    if(this.offer.csv_repayment.length>0){
                        total=this.getTotalCsvRepaymentAmount()
                    }
                    else{
                        total=this.getTotalUnequalRepaymentAmount()
                    }
                }

                return total
            },
            isMakingOffer(){
                return this.$store.state.CreditorLoanRequest.Loading
            },
            getSubmitData(){
                const data={}
                data.loan_amount=parseInt(this.stripString(this.offer.loan_amount))
                data.repayment_period=this.offer.repayment_period
                data.interest_rate=this.offer.interest
                data.offer_id=this.offerId
                data.moratorium_period=this.offer.moratorium
                data.loan_request_id=this.loan_request_id
                return data
            },
            getYear(){
                const date=new Date()
                return date.getFullYear() -1
            },
            isFetching(){
                return this.$store.state.CreditorLoanRequest.isFetchingLoanDetails
            },
            
            getToast(){
                return this.$store.state.CreditorLoanRequest.toast
            },
        },
        watch: {
            payBackDuration() {
                this.monthCount = 0;
            },
            moratoriumPeriod() {
                this.monthCount = 0;
            },
            'tempData.loan_amount' : function (){
                this.formatNumberField(this.tempData.loan_amount,'loan_amount')
            },
            'offer.repayment_period': function(){
                this.populateUnequalRepayment()
            },
            'offer.moratorium': function(){
                this.populateUnequalRepayment()
            }
            
        },
        mounted() {
            this.offerId=this.$route.params.offerId
            this.loan_request_id=this.$route.params.loan_request_id
            this.fetchLoanDetails(this.loan_request_id).then(response=>{
                response
                this.getDefaultData()
            })
            

        },
    }
</script>

<style scoped>
    .form-wrapper{
        width: 600px;
        margin: 0 auto;
    }
    .form-wrapper button{
        height: 50px;
        width: 100%;
        margin: 20px 0 10px 0;
        background-color: #27BE58;
        border: none;
        color: #FFFFFF;
        font-size: 20.6px;
        line-height: 24px;
    }
    hr{
        display: inline-block;
        width: 100%;
        vertical-align: middle;
        color: #E7E7E7;
        position: relative;
    }
    hr+span{
        display: inline-block;
        margin: 0 15px;
        font-size: 14px;
        font-weight: 500;
        color: #535353;
        
    }
    .add-sign{
        height: 20px;
        width: 20px;
        position: relative;
        top: -36px;
        right: -103%;
        cursor: pointer;
    }
    .upload-schedule-div{
        margin-top: 17px;
    }
    .month{
        width: 140px;
        display: inline-block;
        vertical-align: bottom;
    }
    .section-header{
        
        display: flex;
    justify-content: center;
    padding: 16px 0;
    border-bottom: 1px solid #E7E7E7;
    }
    .arrow-separator{
        margin: 0 20px;
    }

    .first-repayment {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}

.section-head{
    font-size: 21px;
  font-weight: 500;
  color: #535353;
  margin-bottom: 20px;
}

.section-head p{
    font-size: 14px;
    color: #797878;
}
.radio-switch-wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr;
    
}
.radio-switch{
    width: 100%;
    display: inline-block;
    margin-bottom: 10px;
}
.form-modal-label img{
    margin-right: 10px;
}
.nav-buttons-wrapper{
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    margin-top: 10px;
}
.summary-total{
    display: flex;
    justify-content: space-between;
}
.summary-nav-buttons{
    display: flex;
    justify-content: space-between;
}

.summary-nav-buttons button{
    max-width: 200px;
}

.previous-btn {
    background-color: white !important;
    color: #27BE58 !important;
    text-align: start;
}

.separator {
    display: flex;
    align-items: center;
    margin: 30px 0;
}

.schedule-wrapper {
    display: grid;
    grid-template-columns: 50px 1fr 1fr 1.5fr;
    grid-gap: 10px;
    align-items: center;
}

.text-input {
    display: grid;
    align-items: center;
}

.text-input label{
    margin-top: 15px;
}

.text-input input{
    padding: 15px;
    height: 45px;
    background-color: #F8F8F8;
    outline: none;
    border: 1px solid #CCCCCC;
    width: 100%;
}

.schedule-wrapper .long-tagged-input {
    display: grid;
    align-self: end;
    /* align-items: baseline; */
}

.form-modal-label{
    display: flex;
}

.side-basic-info{
    position: absolute;
    top: 0px;
    left: 20px;
    width: 200px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity  0.25s ease-in;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}



</style>