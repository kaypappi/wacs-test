<template>
  <div>
    <b-table small :fields="fields" :items="users" responsive hover>
      <template v-slot:cell(Initials)="data"><b-avatar variant="secondary" :text="data.item.initial"></b-avatar></template>
      <template v-slot:cell(Name)="data">{{data.item.full_name}}</template>
      <template v-slot:cell(Username)="data">{{data.item.user_name}}</template>
      <template v-slot:cell(Email)="data">{{data.item.email}}</template>
      <template v-slot:cell(Role)="data">{{data.item.roles[0].name}}</template>
      <template v-slot:cell(Status)="data">{{data.item.status}}</template>
      <template #head(Initials)="data">
        <span class="text-info"></span>
      </template>
    </b-table>
  </div>
</template>

<script>
//import CustomModal from "../Modals/CustomModal";
export default {
  props: {
    users: Array
  },
  components: {
    //CustomModal
  },
  data() {
    return {
      fields: [
        "Initials",
        "Name",
        "Username",
        "Email",
        "Role",
        "Status",
      ],
    };
  },
  methods: {
  },
  computed: {},
};
</script>

<style>
.view-schedule {
  color: #27be58;
  font-size: 14px;
  cursor: pointer;
}
.details-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
.detail-title {
  font-weight: 500;
}
.detail-body {
  font-size: 14px;
  font-weight: 300;
}
/* .data-validation{
  font-size: 20px;
  font-weight: 600;
  text-align: center;
} */
</style>