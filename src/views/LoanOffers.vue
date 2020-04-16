<template>
    <div>
        <div class="page-filters">
            <SearchFilterInput 
                placeholder="Search by name, role, status"
                v-model="searchTerm"
                :onSearch="()=>{}"
            />        
            <div class="cta-div">
                <Button v-b-modal.add-form-modal class="cta-button">
                    <img src="assets/images/Plus.svg" alt="Plus sign">
                    Create New Offer
                </Button>
            </div>
        </div>
        <CustomModal :onHide="onHide" id="add-form-modal">
            <h5 class="form-modal-title">Create Offer</h5>
            <div class="form-modal-title-border"></div>
            <form @submit.prevent="onSubmit">
                    <DragDropFileInput 
                        :onfile="fileChange"
                        label="Upload Banner"
                        fileTypes="PNG, JPG up to 5MB"
                    />
                    <TaggedInput
                        label="Amount"
                        id="amount"
                        name="amount"
                        labelClass="form-modal-label"
                        placeholder="e.g 200,000"
                        :tagLeft="true"
                        :tagRight="false"
                        leftImage="naira.svg"
                        v-model.number="addOffer.amount_from"
                    />
                    <div class="double-input-range-text">To</div>
                    <TaggedInput
                        :tagLeft="true"
                        :tagRight="false"
                        placeholder="e.g 500,000"
                        leftImage="naira.svg"
                        v-model.number="addOffer.amount_to"
                    />
                    <div class="short-dropdown-box">
                        <label for="payback-period" class="form-modal-label">Payback Period</label>
                        <select name="payback-period" id="payback-period" class="form-modal-inputs form-short-input" required v-model="addOffer.payback_period">
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
                        v-model.number="addOffer.interest_rate_from"
                    />
                    <label for="moratorium" class="form-modal-label margin-top-30">Moratorium Period (first repayment)</label>
                    <span class="form-field-info">(on interest and principal)</span>
                    <select name="moratorium" id="moratorium" class="form-modal-inputs" required v-model="addOffer.moratorium_principal">
                        <option value="0" hidden>Select</option>
                        <option value="1">1 Month</option>
                        <option value="2">2 Months</option>
                        <option value="3">3 Months</option>
                    </select>
                    <SubmitButton
                        buttonClass="form-modal-button"
                        name="Submit"
                        :isLoading="creatingOffer"
                    />
            </form>
        </CustomModal>
        <img src="/assets/images/page-ring-loader.svg" alt="loader" v-if="fetchingOffers" class="page-loader">
        <Table :tableHeaders="['Date', 'Code', 'Title', 'Amount', 'Interest', 'Duration', 'Status', '']" v-else>
            <LoanOffersTableRow
              v-for="loanOffer in loanOffers"
              :key="loanOffer.id"
              :id="loanOffer.id"
              :date="loanOffer.date"
              :code="loanOffer.code"
              :title="loanOffer.title"
              :amount="loanOffer.amount"
              :interest="loanOffer.interestRate"
              :duration="loanOffer.duration"
              :status="loanOffer.status"
              :onEdit="editUser"
              :onResetPassword="confirmResetPassword"
              :onToggleStatus="toggleUserStatus"
              :onChangeRole="changeUserRole"
            />
        </Table>
    </div>
</template>

<script>
    import axios from 'axios';
    import CustomModal from '../components/Modals/CustomModal';
    import Table from '../components/Table/Table';
    import LoanOffersTableRow from '../components/Table/LoanOffersTableRow';
    import DragDropFileInput from '../components/Inputs/DragDropFileInput';
    import TaggedInput from '../components/Inputs/TaggedInput';
    import SearchFilterInput from '../components/Inputs/SearchFilterInput';
    import SubmitButton from '../components/Buttons/SubmitButton';
    import Button from '../components/Buttons/Botton';
    export default {
        components: {
            CustomModal,
            Table,
            LoanOffersTableRow,
            DragDropFileInput,
            TaggedInput,
            SearchFilterInput,
            SubmitButton,
            Button,
        },
        data() {
            return {
                searchTerm: '',
                creatingOffer: false,
                fetchingOffers: false,
                loanOffers: [],
                addOffer: {
                    moratorium_principal: 0,
                    payback_period: 0,
                },
                formValues: null,
            }
        },
        methods: {
            onSubmit() {
                this.creatingOffer = true;
                this.formValues.append('interest_rate_to', 10);
                this.formValues.append('code_name', 1234567890);
                this.formValues.append('title', 'Cheap anual loan')
                this.formValues.append('description', 'Do You Need To Renovate Your House? A Personal Loan Is The');
                this.formValues.append('moratorium_interest', 1);
                this.formValues.append('payback_date', 'year');
                this.formValues.append('amount_from', this.addOffer.amount_from);
                this.formValues.append('amount_to', this.addOffer.amount_to);
                this.formValues.append('payback_period', this.addOffer.payback_period);
                this.formValues.append('interest_rate_from', this.addOffer.interest_rate_from);
                this.formValues.append('moratorium_principal', this.addOffer.moratorium_principal);
                axios.post(
                    'creditor/offer/create', 
                    this.formValues, 
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                .then(() => {
                    this.creatingOffer = false;
                })
                .catch(err => {
                    console.log('err', err.response.data);
                    this.creatingOffer = false;
                });
                
            },
            fileChange(file) {
                const formData = new FormData();
                formData.append('image_banner', file);
                this.formValues = formData;
            },
            onHide() {
                this.addOffer = {};
            },
            fetchLoanOffers() {
                this.fetchingOffers = true;
                axios.get('http://wacs.mocklab.io/loanoffers')
                .then((res) => {
                    this.fetchingOffers = false;
                    this.loanOffers = res.data;
                })
                .catch(() => {
                    this.fetchingOffers = false;
                });
            },
            editUser() {
                alert('editting');
            },
            changeUserRole() {
                alert('changing role');
            },
            confirmResetPassword() {
                alert('resetting');
            },
            toggleUserStatus() {
                alert('changing status');
            },
        },
        mounted() {
            this.fetchLoanOffers();
        },
    }
</script>

<style>

</style>