<template>
    <div class="make-offer-div">
        <div class="progress-div">
            <div class="progress-stage">
                <div class="progress-circle current-stage-circle">
                    <img src="/assets/images/check-mark-circle.svg" alt="" v-if="completeBasicInfo">
                </div>
                <span>Basic Info</span>
            </div>
            <div class="progress-middle" :class="{'current-stage-circle': completeBasicInfo}"></div>
            <div class="progress-stage">
                <div class="progress-circle" :class="{'current-stage-circle': completeBasicInfo}"></div>
                <span>Payment Schedule</span>
            </div>
        </div>

        <div class="form-wrapper">
                <!-- <div v-if="serverResponse" class="error-div">{{serverResponse}}</div> -->
                <form @submit.prevent="submit">
                    <template v-if="!completeBasicInfo">
                        <TaggedInput
                            label="Amount"
                            id="amount"
                            name="amount"
                            labelClass="form-modal-label"
                            placeholder="e.g 200,000"
                            length="long"
                            :tagLeft="true"
                            :tagRight="false"
                            leftImage="naira.svg"
                            v-model.number="offer.amount_from"
                        />
                        <div class="short-dropdown-box">
                            <label for="payback-period" class="form-modal-label">Payback Period</label>
                            <select name="payback-period" id="payback-period" class="form-modal-inputs form-short-input" required v-model="offer.paybackPeriod">
                                <option value="0" hidden>Select</option>
                                <option v-for="n in 12" :value="n" :key="n">{{n}} {{n == 1 ? 'Month' : 'Months'}}</option>
                            </select>
                        </div>
                        <div class="double-input-range-text"></div>
                        <TaggedInput
                            label="Interest Rate"
                            id="interest"
                            name="interest"
                            placeholder="e.g 4"
                            labelClass="form-modal-label margin-top-30"
                            :tagLeft="false"
                            :tagRight="true"
                            rightImage="percent.svg"
                            v-model.number="offer.interest"
                        />
                        <label for="moratorium" class="form-modal-label margin-top-30">Moratorium Period (first repayment)</label>
                        <span class="form-field-info">(on interest and principal)</span>
                        <select name="moratorium" id="moratorium" class="form-modal-inputs" required v-model="offer.moratorium">
                            <option :value="0" hidden>Select</option>
                            <option :value="1">1 Month</option>
                            <option :value="2">2 Months</option>
                            <option :value="3">3 Months</option>
                        </select>
                        <button @click="goToRepayment">Next</button>
                    </template>
                    <template v-else>
                        <div class="radio-div">
                            <input type="radio" id="equal-schedule" class="radio-select" name="scheduleType" v-model="equalRepayment" :value="true">
                            <label for="equal-schedule">
                                <span class="custom-radio"></span>
                                Equal payments
                            </label>
                        </div>
                        <div class="radio-div">
                            <input type="radio" id="upload-schedule" class="radio-select" name="scheduleType" v-model="equalRepayment" :value="false">
                            <label for="upload-schedule">
                                <span class="custom-radio"></span>
                                Upload schedule
                            </label>
                        </div>

                        <TaggedInput
                            v-if="equalRepayment"
                            label="Amount"
                            fieldInfo="(equal amount of monthly deductions)"
                            id="amount"
                            name="amount"
                            labelClass="form-modal-label"
                            placeholder="e.g 200,000"
                            length="long"
                            :tagLeft="true"
                            :tagRight="false"
                            leftImage="naira.svg"
                            v-model.number="offer.amount_from"
                        />

                        <div v-if="!equalRepayment" class="upload-schedule-div">
                            <DragDropFileInput 
                                :onfile="fileChange"
                                label="Upload Payment Schedule"
                                fileTypes="xls, csv up to 5MB"
                            />
                            <hr><span>OR</span><hr>
                            <p class="form-modal-label">Create Payment Schedule</p>
                            <template v-for="n in (offer.moratorium + monthCount)">
                                <div :key="n">
                                    <div class="month">
                                        <label class="form-modal-label" v-if="n == 1">Month</label>
                                        <div class="form-modal-inputs">{{'Month '+n}}</div>
                                    </div>
                                    <div class="double-input-range-text"></div>
                                    <TaggedInput
                                        :label="n == 1 ? 'Amount' : ''"
                                        id="amount"
                                        name="amount"
                                        labelClass="form-modal-label"
                                        :disabled="n <= offer.moratorium"
                                        :placeholder="n <= offer.moratorium ? 'moratorium' : 'e.g 200,000'"
                                        :tagLeft="true"
                                        :tagRight="false"
                                        leftImage="naira.svg"
                                        v-model="offer['month'+n]"
                                    />
                                </div>
                            </template>
                            <img src="/assets/images/plus-icon.svg" alt="" class="add-sign" @click="addMonth">
                            <button></button>
                        </div>
                    </template>
                </form>
        </div>
        
    </div>
</template>

<script>
    import TaggedInput from '../components/Inputs/TaggedInput';
    import DragDropFileInput from '../components/Inputs/DragDropFileInput';
    export default {
        components: {
            TaggedInput,
            DragDropFileInput,
        },
        data() {
            return {
                monthCount: 1,
                equalRepayment: true,
                completeBasicInfo: false,
                offer: {
                    paybackPeriod: 0,
                    moratorium: 0,
                },
            }
        },
        methods: {
            submit() {
                
            },
            fileChange(file) {
                const formData = new FormData();
                formData.append('paymentSchedule', file);
                // this.formValues = formData;
            },
            addMonth() {
                if(this.monthCount + this.offer.moratorium < this.offer.paybackPeriod) {
                    this.monthCount++;
                }
            },
            goToRepayment() {
                this.completeBasicInfo = true;
            }
        },
        computed: {
            payBackDuration() {
                return this.offer.paybackPeriod;
            },
            moratoriumPeriod() {
                return this.offer.moratorium;
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
        },
    }
</script>

<style scoped>
    .form-wrapper{
        width: 313px;
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
        width: 130px;
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
        margin-top: 15px;

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
</style>