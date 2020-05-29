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
                                <option value="0" hidden>Select Month</option>
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
                                        :tagRight="false"
                                        leftImage="naira.svg"
                                        v-model="offer.unequal_repayment[index].amount"
                                    />
                            </div>
                            <img src="/assets/images/plus-icon.svg" alt="" class="add-sign" @click="addMonth">
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
                                <button @click="submitWizard">Submit</button>
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
                equalRepayment: true,
                steps:1,
                offerId:'',
                completeBasicInfo: false,
                formData:new FormData(),
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
                const URL=baseUrl+'creditor/repayments/csvRead'
                axios.post(URL,this.formValues).then(response=>{
                    this.offer.csv_repayment=[...response.data]
                    console.log(response)
                })
                .catch(err=>{console.log(err)})
                console.log(this.formValues.csvUpload,'file present')
            },
            addMonth() {
                /* if(this.monthCount + this.offer.moratorium < this.offer.paybackPeriod) {
                    this.monthCount++;
                } */
                if(this.offer.unequal_repayment.length<this.offer.repayment_period){
                    this.offer.unequal_repayment=[...this.offer.unequal_repayment,{month:0,year:0}]
                }
            },
            goToNext() {
                this.steps = this.steps+1;
                console.log(this.offer)
            },
            goToPrev() {
                this.steps = this.steps-1;
                console.log(this.steps)
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
                //const formData=new FormData()
                const URL=baseUrl+'creditor/repayments'
                data.loan_amount=this.offer.loan_amount
                data.repayment_period=this.offer.repayment_period
                data.interest_rate=this.offer.interest
                data.offer_id=this.offerId
                data.moratorium_period=this.offer.moratorium
                if(this.equalRepayment){
                    const first=`${this.offer.first_repayment_year}-${this.offer.first_repayment_month}-01`
                    const last=`${this.offer.last_repayment_year}-${this.offer.last_repayment_month}-01`
                    const amount=this.offer.repayment_amount
                    data.plan_type='equal'
                    data.plan=JSON.stringify({first,last,amount})
                }
                else{
                    data.plan_type='unequal'
                    if(this.offer.csv_repayment.length>0){
                        this.formData.append("loan_amount",this.offer.loan_amount);
                        this.formData.append("offer_id",this.offerId );
                        this.formData.append("repayment_period", this.offer.repayment_period);
                        this.formData.append("interest_rate", this.offer.interest)
                        this.formData.append("moratorium_period", this.offer.moratorium);
                        this.formData.append("plan_type", "unequal");
                        this.formData.append("csvUpload",this.formValues);
                    }
                    else{
                        data.plan=JSON.stringify([...this.offer.unequal_repayment])
                    }
                }

                axios.post(URL,this.offer.csv_repayment.length>0 ? this.formData:data).then(response=>{
                    if(response.statusText==="Created"){
                        this.showToast('Successful','Successfully made offer',true)
                        setTimeout(()=>{
                            this.$router.push({name:'loanRequest'})
                        })
                    }
                    console.log(response)
                }).catch(err=>{
                    console.log(err)
                    this.showToast('Error!',err.message,false)
                })

                console.log(data)
            }
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