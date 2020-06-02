<template>
    <div>
        <Toast 
            :show="toast.show"
            :title="toast.title"
            :successMessage="toast.message"
            failureMessage="Invalid token"
            :success="toast.success"
        />
        <div class="section-header">
            <MakeOfferSectionTitle :section="1" title="Basic Info" :steps="steps"/>
            <span class="arrow-separator">></span>
            <MakeOfferSectionTitle :section="2" title="Repayment Schedule" :steps="steps"/>
            <span class="arrow-separator">></span>
            <MakeOfferSectionTitle :section="3" title="Summary" :steps="steps"/>
        </div>
        <div class="make-offer-div">
        

        <div class="form-wrapper">
                <!-- <div v-if="serverResponse" class="error-div">{{serverResponse}}</div> -->
                <form @submit.prevent="goToNext">
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
                            :required="true"
                            :tagLeft="true"
                            :tagRight="false"
                            leftImage="naira.svg"
                            v-model.number="offer.loan_amount"
                        />
                        <div class="first-repayment">
                            <div class="">
                            <label for="payback-period" class="form-modal-label">Repayment Period</label>
                            <select name="payback-period" id="payback-period" class="form-modal-inputs " required v-model="offer.repayment_period">
                                <option value="0" >Select Month</option>
                                <option v-for="n in 12" :value="n" :key="n">{{n}} {{n == 1 ? 'Month' : 'Months'}}</option>
                            </select>
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
                                    type="number"
                                    :max="offer.loan_amount"
                                    :tagLeft="true"
                                    :tagRight="false"
                                    leftImage="naira.svg"
                                    v-model.number="offer.repayment_amount"
                                />

                                <div>
                                    <label class="form-modal-label">First Repayment</label>
                                <div class="first-repayment">
                                    
                                    <select
                                        name="first-repayment-month"
                                        id="first-repayment-month"
                                        class="form-modal-inputs "
                                        v-model="offer.first_repayment_month"
                                        required
                                        
                                >
                                        <option value="0" hidden>Select Month</option>
                                        <option v-for="n in 12" :value="n" :key="n">{{n}} {{n == 1 ? 'Month' : 'Months'}}</option>
                                    </select>
                                    <select
                                        name="first-repayment-year"
                                        id="first-repayment-year"
                                        class="form-modal-inputs "
                                        v-model="offer.first_repayment_year"
                                        required
                                        
                                >
                                        <option value="0" hidden>Select Year</option>
                                        <option v-for="n in 21" :value="n+getYear" :key="n">{{n + getYear}} </option>
                                    </select>
                                </div>

                                </div>
                                <div>
                                    <label class="form-modal-label">Last Repayment</label>
                                <div class="first-repayment">
                                    
                                    <select
                                        name="last-repayment-month"
                                        id="last-repayment-month"
                                        class="form-modal-inputs "
                                        v-model="offer.last_repayment_month"
                                        required
                                        
                                >
                                        <option value="0" hidden>Select Month</option>
                                        <option v-for="n in 12" :value="n" :key="n">{{n}} {{n == 1 ? 'Month' : 'Months'}}</option>
                                    </select>
                                    <select
                                        name="last-repayment-year"
                                        id="last-repayment-year"
                                        class="form-modal-inputs "
                                        v-model="offer.last_repayment_year"
                                        required
                                        
                                >
                                        <option value="0" hidden>Select Year</option>
                                        <option v-for="n in 21" :value="n+getYear" :key="n">{{n + getYear}} </option>
                                    </select>
                                </div>
                                
                                </div>
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
                                <DragDropFileInput 
                                :onfile="fileChange"
                                :value="file"
                                :isLoading="fileLoading"
                                @changed="fileChange($event)"
                                label="Upload Payment Schedule"
                                fileTypes="xls, csv up to 5MB"
                            />
                            <div class="separator">
                                <hr><span>OR</span><hr>
                            </div>
                            <p class="form-modal-label"><img src="/assets/images/file.svg" alt="">Enter Repayment Schedule</p>
                            <div class="schedule-wrapper" :key="index" v-for="(n,index) in (offer.unequal_repayment)">
                                <div class="text-input">
                                    <label for="">{{index==0?'No.':''}}</label>
                                    <input placeholder="No" v-model="offer.unequal_repayment[index].no" type="text">
                                </div>
                                <div class="text-input">
                                    <label for="repayment-month">{{index==0?'Months':''}}</label>
                                    <select
                                        name="repayment-month"
                                        id="repayment-month"
                                        class="form-modal-inputs "
                                        v-model="offer.unequal_repayment[index].month"
                                        required
                                        
                                >
                                        <option value="0" hidden>Select</option>
                                         <option value="01">January</option>
                                        <option value="02">February</option>
                                        <option value="03">March</option>
                                        <option value="04">April</option>
                                        <option value="05">May</option>
                                        <option value="06">June</option>
                                        <option value="07">July</option>
                                        <option value="08">August</option>
                                        <option value="09">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                </div>
    
                                <div class="text-input">
                                    <label for="repayment-year">{{index==0?'Year':''}}</label>
                                    <select
                                        name="repayment-year"
                                        id="repayment-year"
                                        class="form-modal-inputs "
                                        v-model="offer.unequal_repayment[index].year"
                                        required
                                        
                                >
                                        <option value="0" hidden>Select</option>
                                        <option v-for="n in 21" :value="n+getYear" :key="n">{{n + getYear}} </option>
                                    </select>
                                </div>
                                
                            
                                    <TaggedInput
                                        :label="index==0 ? 'Amount' : ''"
                                        id="amount"
                                        name="amount"
                                        length="long"
                                        labelClass="form-modal-label"
                                        :required="false"
                                        :placeholder="n <= offer.moratorium ? 'moratorium' : 'e.g 200,000'"
                                        :tagLeft="true"
                                        :max="offer.loan_amount"
                                        type="number"
                                        :tagRight="false"
                                        leftImage="naira.svg"
                                        v-model="offer.unequal_repayment[index].amount"
                                    />
                            </div>
                            <img src="/assets/images/plus-icon.svg" alt="" class="add-sign" @click="addMonth">
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
                        <div class="summary-nav-buttons">
                                    <button @click="goToPrev" class="previous-btn" type="button">
                                    <span><BIconArrowLeft/></span>
                                    Back
                                </button>
                                <button @click="submitWizard"><img :style="{height:'100%',width:'auto'}" v-show="isLoading" src="/assets/images/button-ring-loader.svg"/><span v-show="!isLoading">Submit</span></button>
                                </div>
                    </template>
                   
        </div>
        
    </div>
    </div>
</template>

<script>
    import TaggedInput from '../components/Inputs/TaggedInput';
   // import TextInput from '../components/Inputs/TextInput'
    import DragDropFileInput from '../components/Inputs/DragDropFileInput';
    import MakeOfferSectionTitle from '../components/MakeOfferSectionsTitle'
    import MakeOfferSummary from '../components/MakeOfferSummary'
    import {BIconArrowLeft} from 'bootstrap-vue'
    import {baseUrl} from '../router/api_routes'
    import Toast from '../components/Toast'
    import axios from "axios"
    export default {
        components: {
            TaggedInput,
            DragDropFileInput,
            MakeOfferSectionTitle,
            BIconArrowLeft,
            MakeOfferSummary,
            Toast,
        },
        data() {
            return {
                monthCount: 1,
                isLoading:false,
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
                toast:{
                    show:false,
                    title:'',
                    message:"",
                    success:false
                },
                offer: { 
                    repayment_period:0,
                    moratorium:0,
                    csv_repayment:[],
                    first_repayment_month:0,
                    last_repayment_month:0,
                    first_repayment_year:0,
                    last_repayment_year:0,
                    unequal_repayment:[{month:0,year:0}]
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
                    console.log(response.data)
                    this.offer.csv_repayment=[...response.data]
                    this.fileLoading=false
                })
                .catch(err=>{
                    this.fileLoading=false
                    console.log(err)})
            },
            addMonth() {
                if(this.offer.unequal_repayment.length<this.offer.repayment_period){
                    this.offer.unequal_repayment=[...this.offer.unequal_repayment,{month:0,year:0}]
                }
            },
            checkProperties(obj) {
                for (var key in obj) {
                    if (obj[key] !== null && obj[key] != ""&& obj[key]!==0)
                        return true;
                }
                return false;
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
                if(this.offer.first_repayment_month==0||this.offer.first_repayment_year==0||this.offer.last_repayment_month==0||this.offer.last_repayment_year==0){
                    this.errors.step2.equal='All fields are required'
                    return false
                }
                this.errors.step2.equal=''
                return true
            },
            validateUnequal(){
                if(this.formValues){
                    return true
                }
                else{
                    let valid=true
                    this.offer.unequal_repayment.map(obj=>{
                        return valid=this.checkProperties(obj)
                    })

                    if(!valid){
                        this.errors.step2.unequal='All fields are required for manual schedule entry'
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
            submitWizard(){
                const data={}
                this.isLoading=true
                //const formData=new FormData()
                const URL=baseUrl+'creditor/repayments'
                data.loan_amount=this.offer.loan_amount
                data.repayment_period=this.offer.repayment_period
                data.interest_rate=this.offer.interest
                data.offer_id=this.offerId
                data.moratorium_period=this.offer.moratorium
                data.loan_request_id=this.loan_request_id
                if(this.equalRepayment){
                    const first=`${this.offer.first_repayment_year}-${this.offer.first_repayment_month}-01`
                    const last=`${this.offer.last_repayment_year}-${this.offer.last_repayment_month}-01`
                    const amount=this.offer.repayment_amount
                    data.plan_type='equal'
                    data.plan=JSON.stringify({first,last,amount})
                }
                else{
                    if(this.offer.csv_repayment.length>0){
                        this.formData.append("loan_amount",this.offer.loan_amount);
                        this.formData.append("offer_id",this.offerId );
                        this.formData.append("repayment_period", this.offer.repayment_period);
                        this.formData.append("interest_rate", this.offer.interest)
                        this.formData.append("moratorium_period", this.offer.moratorium);
                        this.formData.append("plan_type", "unequal");
                        this.formData.append("csvUpload",this.formValues);
                        this.formData.append("loan_request_id",this.loan_request_id)
                    }
                    else{
                        data.plan=JSON.stringify([...this.offer.unequal_repayment])
                    }
                }

                axios.post(URL,this.offer.csv_repayment.length>0 ? this.formData:data).then(response=>{
                    if(response.statusText==="Created"){
                        this.isLoading=false
                        this.showToast('Successful','Successfully made offer',true)
                        setTimeout(()=>{
                            this.$router.push({name:'loanRequest'})
                        },2000)
                    }
                }).catch(err=>{
                    console.log(err)
                    this.isLoading=false
                    this.showToast('Error!',err.message,false)
                })

                
            },
        },
        computed: {
            payBackDuration() {
                return this.offer.paybackPeriod;
            },
            moratoriumPeriod() {
                return this.offer.moratorium;
            },
            getYear(){
                const date=new Date()
                return date.getFullYear() -1
            }
        },
        watch: {
            payBackDuration() {
                this.monthCount = 0;
            },
            moratoriumPeriod() {
                this.monthCount = 0;
            }
        },
        mounted() {
            this.offerId=this.$route.params.offerId
            this.loan_request_id=this.$route.params.loan_request_id
            console.log(this.loan_request_id)
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
    grid-template-columns: 50px 1fr 1fr 1fr;
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

</style>