<template>
    <div class="make-offer-div">
        <div class="progress-div">
            <div class="progress-stage">
                <div class="progress-circle"></div>
                <span>Basic Info</span>
            </div>
            <div class="progress-middle"></div>
            <div class="progress-stage">
                <div class="progress-circle"></div>
                <span>Payment Schedule</span>
            </div>
        </div>

        <div class="form-wrapper">
                <!-- <div v-if="serverResponse" class="error-div">{{serverResponse}}</div> -->
                <form @submit.prevent="submit">
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
                        <select name="payback-period" id="payback-period" class="form-modal-inputs form-short-input" required v-model="offer.payback_period">
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
                    <select name="moratorium" id="moratorium" class="form-modal-inputs" required v-model="offer.moratorium_principal">
                        <option value="0" hidden>Select</option>
                        <option value="1">1 Month</option>
                        <option value="2">2 Months</option>
                        <option value="3">3 Months</option>
                    </select>

                    <SubmitButton 
                        name="Next"
                        :isLoading="false"
                    />
                </form>
        </div>
        
    </div>
</template>

<script>
    // import axios from 'axios';
    import TaggedInput from '../components/Inputs/TaggedInput';
    import SubmitButton from '../components/Buttons/SubmitButton';
    export default {
        components: {
            TaggedInput,
            SubmitButton
        },
        data() {
            return {
                offer: {},
            }
        },
        methods: {
            submit() {
                
            },
           
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
        margin: 31px 0 0 0;
        background-color: #27BE58;
        border: none;
        color: #FFFFFF;
        font-size: 20.6px;
        line-height: 24px;
    }
</style>