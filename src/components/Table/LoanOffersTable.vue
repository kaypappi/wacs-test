<template>
  <div class="offers-table-wrapper">
    <b-table
      ref="selectableTable"
      selectable
      small
      :select-mode="selectMode"
      :items="items"
      :fields="fields"
      @row-selected="onRowSelected"
      responsive="sm"
    >
      <template v-slot:cell(Status)="data">
        <span v-if="data.item.status === 'Active'" class="status-oval active-status">Active</span>
        <span v-if="data.item.status ==='Inactive'" class="status-oval inactive-status">Inactive</span>
      </template>
      <template v-slot:head(Options)>
        <span></span>
      </template>
      <template v-slot:cell(Options)>
        <div class="dropdown-wrapper">
          <Dropdown
            :options="[
                    {
                        name: 'Edit',
                        icon: 'Edit.svg',
                        handler: edit,
                        shouldRender: true,
                    },
                    {
                        name: 'Activate',
                        icon: 'switch.svg',
                        handler: changeStatus,
                        shouldRender: true,
                    },
                    {
                        name: 'View Details',
                        icon: 'Visible.svg',
                        handler: toggleDetails,
                        shouldRender: true,
                    },
                    {
                        name:`Delete`,
                        icon: 'Trash-red.svg',
                        handler: Delete,
                        shouldRender: true,
                        class:'danger'
                    }
                ]"
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
export default {
  components: {
    Dropdown
  },
  props:{
    items:Array
  },
  data() {
    return {
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
      /* items: [
        {
          Date: "13/02/2019",
          Code: "0346",
          Title: "Gtb easter easter loans…",
          Amount: "500,000 to 1,000…",
          Interest: "3%",
          Status: "Active"
        },
        {
          Date: "13/02/2019",
          Code: "0346",
          Title: "Gtb easter easter loans…",
          Amount: "500,000 to 1,000…",
          Interest: "3%",
          Status: "Active"
        },
        {
          Date: "13/02/2019",
          Code: "0346",
          Title: "Gtb easter easter loans…",
          Amount: "500,000 to 1,000…",
          Interest: "3%",
          Status: "Active"
        },
        {
          Date: "13/02/2019",
          Code: "0346",
          Title: "Gtb easter easter loans…",
          Amount: "500,000 to 1,000…",
          Interest: "3%",
          Status: "Active"
        }
      ], */
      selectMode: "multi",
      selected: []
    };
  },
  methods: {
    edit() {},
    changeStatus() {},
    toggleDetails() {},
    Delete() {},
    onRowSelected(items) {
      this.selected = items;
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
    selectThirdRow() {
      // Rows are indexed from 0, so the third row is index 2
      this.$refs.selectableTable.selectRow(2);
    },
    unselectThirdRow() {
      // Rows are indexed from 0, so the third row is index 2
      this.$refs.selectableTable.unselectRow(2);
    }
  },
  mounted(){
    console.log(this.items)
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