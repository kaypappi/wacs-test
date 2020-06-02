<template>
  <div class="offers-table-wrapper">
    <Toast 
            :show="toast.show"
            :title="toast.title"
            :successMessage="toast.message"
            :failureMessage="toast.message"
            :success="toast.success"
        />
    <CustomModal :onHide="onHide" id="edit-form-modal">
      <h5 class="form-modal-title">Edit Offer</h5>
      <div class="form-modal-title-border"></div>
      <form @submit.prevent="onSubmit">
        <!-- <DragDropFileInput
          :onfile="fileChange"
          label="Upload Banner"
          fileTypes="PNG, JPG up to 5MB"
        />-->
        <div class="cot">
            
            <div class="cot-code">
                <TextInput :value="this.addOffer.code_name"  :required="true" type="text" @input="handleText($event,'code_name')" placeholder="Enter Code"  inputClass="inputClasses" length="short" label="Code"></TextInput>
            </div>
            <div class="double-input-range-text"></div>
            <div class="cot-title">
                <TextInput :value="this.addOffer.title" :required="true" @input="handleText($event,'title')" placeholder="Enter Title"  inputClass="inputClasses" length="short" label="Title"></TextInput>
            </div>
        </div>
        <div class="description">
          <TextArea :value="this.addOffer.description" row="2" :required="true" @changes="handleText($event,'description')" label='Description' inputClass="inputClasses" placeholder="Enter Description"/>
        </div>
        <TaggedInput
          label="Amount"
          id="amount"
          name="amount"
          labelClass="form-modal-label"
          placeholder="e.g 200,000"
          type="number"
          :max="this.addOffer.amount_to"
          :tagLeft="true"
          :required="true"
          :tagRight="false"
          leftImage="naira.svg"
          v-model.number="addOffer.amount_from"
        />
        <div class="double-input-range-text">To</div>
        <TaggedInput
          :tagLeft="true"
          :tagRight="false"
          :required="true"
          type="number"
          :min="this.addOffer.amount_from"
          placeholder="e.g 500,000"
          leftImage="naira.svg"
          v-model.number="addOffer.amount_to"
        />
        <div class="short-dropdown-box">
          <label for="payback-period" class="form-modal-label">Payback Period</label>
          <select
            name="payback-period"
            id="payback-period"
            class="form-modal-inputs form-short-input"
            required
            v-model="addOffer.payback_period"
          >
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
          :required="true"
          rightImage="percent.svg"
          v-model.number="addOffer.interest_rate"
        />
        <label
          for="moratorium"
          class="form-modal-label margin-top-30"
        >Moratorium Period (first repayment)</label>
        <span class="form-field-info">(on interest and principal)</span>
        <select
          name="moratorium"
          id="moratorium"
          class="form-modal-inputs"
          required
          v-model="addOffer.moratorium_period"
        >
          <option value="0" hidden>Select</option>
          <option value="1">1 Month</option>
          <option value="2">2 Months</option>
          <option value="3">3 Months</option>
        </select>
        <SubmitButton buttonClass="form-modal-button" name="Submit" :isLoading="creatingOffer" />
      </form>
    </CustomModal>
    <b-table
      ref="selectableTable"
      selectable
      :select-mode="selectMode"
      :items="offers"
      :fields="fields"
      @row-selected="onRowSelected"
      responsive="sm"
    >
      <template v-slot:cell(Status)="data">
        <span v-if="data.item.status === 'Active'" class="status-oval active-status">Active</span>
        <span v-else-if="data.item.status ==='InActive'" class="status-oval inactive-status">Inactive</span>
        <span v-else class="status-oval new-status">Draft</span>
      </template>
      <template v-slot:head(Options)>
        <span></span>
      </template>
      <template v-slot:cell(Options)="data">
        <div  class="dropdown-wrapper" @click.capture="changeId(data.item)">
          <Dropdown
            :options="data.item.options"
          />
        </div>
      </template>
      <template v-slot:head(Selected)>
        <div class="custom-control custom-checkbox">
          <input
            v-model="checked"
            @click="selectAllRows"
            type="checkbox"
            class="custom-control-input"
            id="selectAll"
          />
          <label class="custom-control-label" for="selectAll"></label>
        </div>
      </template>

      <!-- Example scoped slot for select state illustrative purposes -->
      <template v-slot:cell(selected)="{ rowSelected,index }">
        <div class="custom-control custom-checkbox">
          <input
            :checked="rowSelected"
            @click="selectRow(rowSelected,index)"
            type="checkbox"
            class="custom-control-input"
            :id="index"
          />
          <label class="custom-control-label" :for=index></label>
        </div>
      </template>
      <template v-slot:cell(Date)="data">
        {{data.item.date}}
      </template>
      <template v-slot:cell(Code)="data">
        {{data.item.code_name}}
      </template>
      <template v-slot:cell(Title)="data">
        {{data.item.title}}
      </template>
      <template v-slot:cell(Amount)="data">
        {{data.item.amount_from}} to {{data.item.amount_to}}
      </template>
      <template v-slot:cell(Interest)="data">
        {{data.item.interest_rate}}%
      </template>
      <template v-slot:cell(Duration)="data">
        {{data.item.payback_period}}mnths
      </template>
    </b-table>
  </div>
</template>

<script>
import Dropdown from "../Dropdown/Dropdown";
import CustomModal from "../Modals/CustomModal"
import TextInput from "../Inputs/TextInput"
import TextArea from "../Inputs/TextArea"
import TaggedInput from "../Inputs/TaggedInput"
import SubmitButton from "../Buttons/SubmitButton"
import Toast from "../Toast"
import axios from "axios"
import {LOANOFFERSAPI,baseUrl} from "../../router/api_routes"
export default {
  components: {
    Dropdown,
    CustomModal,
    TextInput,
    TextArea,
    TaggedInput,
    SubmitButton,
    Toast
  },
  props:{
    items:Array,
    updateItems:Function,
    deleteRow:Function,
  },
  data() {
    return {
      addOffer:{},
      creatingOffer: false,
      toast:{
        show:false,
        title:'',
        message:"",
        success:false
      },
      modes: "multi",
      checked: "",
      allRowsSelected: false,
      fields: [
        "Selected",
        "Date",
        "Code",
        "Title",
        "Amount",
        "Interest",
        "Duration",
        "Status",
        "Options"
      ],
      actions:[
                    { 
                        name: 'Edit',
                        icon: 'Edit.svg',
                        handler: this.edit,
                        shouldRender: true,
                        type:"Edit"
                    },
                    {
                        name: 'Deactivate',
                        icon: 'switch.svg',
                        handler: this.changeStatus,
                        shouldRender: true,
                        type:"Status"
                    },
                    {
                        name: 'View Details',
                        icon: 'Visible.svg',
                        handler: this.toggleDetails,
                        shouldRender: true,
                        type:"Details"
                    },
                    {
                        name:`Delete`,
                        icon: 'Trash-red.svg',
                        handler: this.Delete,
                        shouldRender: true,
                        type:"Delete"
                    }
                ],
      selectMode: "multi",
      selected: [],
      activeRow:null
    };
  },
  methods: {
    changeId(item){
      this.activeRow=item.id
      this.addOffer={...this.getFields()}
    },
    getFields(){
      if(this.activeRow===null){
        return
      }
      const item={...this.items.filter(item=>{
        return item.id===this.activeRow
      })}
    
      return item[0]
    },
    edit() {
      this.$bvModal.show('edit-form-modal')
    },
    changeStatus() {
      let url=''
      if(this.addOffer.status==="Active"){
        url=baseUrl+`creditor/offer/${this.addOffer.id}/deactivate`
      }
      else{
        url=baseUrl+`creditor/offer/${this.addOffer.id}/activate`
      }

      axios.get(url)
        .then(response=>{
          this.updateItems(response.data.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    Delete() {
      let url=baseUrl+`creditor/offer/${this.addOffer.id}/delete`
      axios.get(url)
      .then(response=>{
        this.showToast("Successful",response.data.message,true)
        this.deleteRow(this.addOffer.id)
      })
      .catch(err=>{
        console.log(err)
        this.showToast("Error",err.response.data.message,false)
      })
    },
    onRowSelected(items) {
      this.selected = items;
    },
    handleText(event,type){
         this.addOffer[type]=event
    },
    onSubmit() {
      let data={
        id:this.addOffer.id,
        code_name:this.addOffer.code_name,
        title:this.addOffer.title,
        description:this.addOffer.description,
        interest_rate:this.addOffer.interest_rate,
        amount_from:this.addOffer.amount_from,
        amount_to:this.addOffer.amount_to,
        payback_period:this.addOffer.payback_period,
        interest_rate_from:this.addOffer.interest_rate_from,
        moratorium_period:this.addOffer.moratorium_period
      }
      axios
        .post(
          LOANOFFERSAPI.update,
          data,
        )
        .then((response) => {
          this.creatingOffer = false;
          this.updateItems(response.data.data)
          this.$bvModal.hide('edit-form-modal')
          this.showToast('Successful',response.data.message,true)
        })
        .catch(err => {
          console.log("err", err.response.data);
          this.showToast("Error",err.response.data.message,false)
          this.creatingOffer = false;
        });
    },
    showToast(title,message,success){
      this.toast={show:true,title,message,success}
          setTimeout(()=>{
            this.toast.show=false
          },2000)
    },
    onHide() {
      this.addOffer = {};
    },
    selectAllRows() {
      !this.checked
        ? this.$refs.selectableTable.selectAllRows()
        : this.$refs.selectableTable.clearSelected();
    },
    selectRow(rowSelected, index) {
      !rowSelected
        ? this.$refs.selectableTable.selectRow(index)
        : this.$refs.selectableTable.unselectRow(index);
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
  },
  computed:{
    offers: function(){
      const offers=this.items && this.items.map(item=>{
        const newItem={...item}
        let options=[...this.actions]
        options=options.map(option=>{
          let newOption={...option}
          if(newItem.status !=="Draft" && (newOption.name==="Edit"|| newOption.name==="Delete")){
            newOption.shouldRender=false
          }
          if(newItem.status !=="Active" && newOption.type==="Status"){
             newOption.name="Activate"
          }
          if(newItem.status==="Active" && newOption.type==="Status"){
            newOption.name==="Deactivate"
          }
          
          return newOption
        })
        newItem["options"]=options
        return newItem
      })
      return offers
    }
  },
  mounted(){
  }
};
</script>

<style >
.danger .dropdown-item {
  color: red !important;
}
.dropdown-wrapper {
  display: flex;
  justify-content: flex-end;
}

</style>