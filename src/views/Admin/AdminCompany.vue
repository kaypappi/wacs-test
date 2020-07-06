<template>
  <div>
    <div class="page-filters">
      <!-- <SearchFilterInput
        placeholder="Search by name, role, status"
        v-model="searchTerm"
        :onSearch="searchAdmin"
      /> -->
      <div class="cta-div">
        <Button v-b-modal.add-user-form-modal class="cta-button">
          <img src="/assets/images/Plus.svg" alt="Plus sign" />
          Create Company
        </Button>
      </div>
    </div>
    <CustomModal :onHide="onHide" id="add-user-form-modal">
      <div v-if="postCompany">
          <p class="modal-success-message" v-if="edittingUser">Successful Created Company</p>
        <p class="modal-success-message" v-else-if="edittingUser">Edit Successful</p>
        <p
          class="modal-success-message"
          v-else-if="changingUserRole"
        >Users role has been changed successfully</p>
        <p class="modal-success-message" v-else>
          You have successfully added
          <b>{{addUser.full_name}}</b> as an admin
        </p>
        <button class="form-modal-button" @click="$bvModal.hide('add-user-form-modal')">Close</button>
      </div>
      <template v-else>
        <h5
          class="form-modal-title"
        >{{ edittingUser || changingUserRole ? 'Edit User' : 'New User'}}</h5>
        <div class="form-modal-title-border"></div>
        <form @submit.prevent="onSubmit">
          <TextInput
            v-if="!changingUserRole"
            label="Name"
            id="name"
            name="name"
            :error="error.name"
            inputClass="form-modal-inputs"
            labelClass="form-modal-label"
            v-model="addUser.name"
            :keyupEvent="keyupEvent"
          />
          
          <TextInput
            v-if="!changingUserRole"
            type="email"
            label="Email"
            id="email_address"
            name="email_address"
            :error="error.email_address"
            inputClass="form-modal-inputs"
            labelClass="form-modal-label"
            v-model="addUser.email_address"
            :keyupEvent="keyupEvent"
          />
          <TextInput
            v-if="!changingUserRole"
            label="Address"
            id="address"
            name="address"
            :disabled="edittingUser"
            :error="error.address"
            inputClass="form-modal-inputs"
            labelClass="form-modal-label"
            v-model="addUser.address"
            :keyupEvent="keyupEvent"
          />
          <TextInput
            v-if="!changingUserRole"
            label="Number"
            id="mobile_number"
            name="mobile_number"
            :disabled="edittingUser"
            :error="error.mobile_number"
            inputClass="form-modal-inputs"
            labelClass="form-modal-label"
            v-model="addUser.mobile_number"
            :keyupEvent="keyupEvent"
          />
          <TextInput
            v-if="!changingUserRole"
            label="Background Color"
            id="bg_color"
            name="bg_color"
            :disabled="edittingUser"
            :error="error.bg_color"
            inputClass="form-modal-inputs"
            labelClass="form-modal-label"
            v-model="addUser.bg_color"
            :keyupEvent="keyupEvent"
          />
          <TextInput
            v-if="!changingUserRole"
            label="Button Color"
            id="btn_color"
            name="btn_color"
            :disabled="edittingUser"
            :error="error.btn_color"
            inputClass="form-modal-inputs"
            labelClass="form-modal-label"
            v-model="addUser.btn_color"
            :keyupEvent="keyupEvent"
          />
          <TextInput
            v-if="!changingUserRole"
            label="Logo Link"
            id="logo"
            name="logo"
            :disabled="edittingUser"
            :error="error.logo"
            inputClass="form-modal-inputs"
            labelClass="form-modal-label"
            v-model="addUser.logo"
            :keyupEvent="keyupEvent"
          />
          <!-- <label v-if="!edittingUser || changingUserRole" for="role" class="form-modal-label">User Role</label>
                <select v-if="!edittingUser" name="role" id="role" class="form-modal-inputs" required v-model="addUser.role_id">
                    <template v-for="role in roles">
                        <option :value="role.id" :key="role.id">{{role.name}}</option>
                    </template>
          </select>-->
          <SubmitButton
            buttonClass="form-modal-button"
            :name="edittingUser || changingUserRole ? 'Save' : 'Create'"
            :isLoading="isPosting"
          />
        </form>
      </template>
    </CustomModal>
    <ConfirmModal />
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="isGettingCompany"
      class="page-loader"
    />
    <template v-else-if="companies.length>0">
      <Table :tableHeaders="['Name','Email','Address']">
        <AdminCompanyTableRow
          v-for="user in companies"
          :id="user.id"
          :name="user.name"
          :email="user.email_address"
          :address="user.address"
          :key="user.id"
          :onEdit="editUser"
          :onResetPassword="confirmResetPassword"
          :onToggleStatus="toggleUserStatus"
          :onChangeRole="changeUserRole"
        />
      </Table>
      <Pagination
          v-if="!searchTerm"
          :total="paginationData.total"
          :currentPage="paginationData.current_page"
          :lastPage="paginationData.last_page"
          :from="paginationData.from"
          :to="paginationData.to"
      />
    </template>
  </div>
</template>
<script>
import CustomModal from "../../components/Modals/CustomModal";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import Table from "../../components/Table/Table";
import AdminCompanyTableRow from "../../components/Admin/AdminCompanyTableRow";
import SubmitButton from "../../components/Buttons/SubmitButton";
import Button from "../../components/Buttons/Botton";
import TextInput from "../../components/Inputs/TextInput";
import Pagination from '../../components/Pagination/Pagination';
//import SearchFilterInput from "../../components/Inputs/SearchFilterInput";
import { EventBus } from "@/event.js";
//import Fuse from 'fuse.js';
export default {
  components: {
    Table,
    AdminCompanyTableRow,
    SubmitButton,
    Button,
    TextInput,
    CustomModal,
    ConfirmModal,
    Pagination,
    //SearchFilterInput
  },
  data() {
    return {
      addUser: {},
      editUserIntialData: {},
      edittingUser: false,
      changingUserRole: false,
      targetUserId: "",
      searchTerm: "",
      roles: [
        {
          id: 1,
          name: "Super Admin"
        },
        {
          id: 2,
          name: "User Admin"
        }
      ],
      confirmModal: {}
    };
  },
  watch: {
    "$route.query": {
      handler() {
        this.changePage();
      }
    }
  },
  methods: {
    searchAdmin() {
      if (this.searchTerm) {
        alert("searching for " + this.searchTerm);
      }
    },
    changePage(page = this.$route.query.page, query = this.$route.query) {
      this.$store.dispatch("AdminUser/fetchCompanies", { page, query });
    },
    onSubmit() {
      if (!this.$can("view", "loan") || !Object.keys(this.addUser).length) {
        return;
      }
      if (this.edittingUser || this.changingUserRole) {
        this.$store.dispatch("AdminUser/editAdmin", {
          userData: { ...this.addUser, userId: this.targetUserId },
          userType: "ippiss"
        });
      } else {
        this.$store.dispatch("AdminUser/createCompany", this.addUser);
      }
    },
    compareDataOnEdit() {
      const edittedFields = { userId: this.targetUserId };
      for (const field in this.addUser) {
        if (this.addUser[field] !== this.editUserIntialData[field]) {
          edittedFields[field] = this.addUser[field];
        }
      }
      return edittedFields;
    },
    keyupEvent(name) {
      if (this.error[name]) {
        this.$store.dispatch("clearOneValidationError", name);
      }
    },
    editUser(data, userId) {
      this.edittingUser = true;
      this.addUser = data;
      this.editUserIntialData = { ...data };
      this.targetUserId = userId;
      this.$bvModal.show("add-user-form-modal");
    },
    changeUserRole(data, userId) {
      this.changingUserRole = true;
      this.addUser = data;
      this.editUserIntialData = { ...data };
      this.targetUserId = userId;
      this.$bvModal.show("add-user-form-modal");
    },
    confirmResetPassword(email, fullName) {
      this.confirmModal.resetPasswordTargetEmail = email;
      const modalDetails = {
        onConfirm: this.resetPassword,
        promptMessage:
          "Are you sure you want to reset password for " + fullName,
        successMessage: "Password reset link has been successfully to " + email
      };
      EventBus.$emit("custom", modalDetails);
    },
    toggleUserStatus(userId) {
      this.confirmModal.targetUserId = userId;
      const modalDetails = {
        onConfirm: this.toggleStatus,
        promptMessage: "Are you sure you want to change status",
        successMessage: "User status has been changed successfully"
      };
      EventBus.$emit("custom", modalDetails);
    },
    resetPassword() {
      this.$store.dispatch("ResetPassword/sendPasswordResetLink", {
        email: this.confirmModal.resetPasswordTargetEmail
      });
    },
    toggleStatus() {
      this.$store.dispatch(
        "UserStatus/toggleUserStatus",
        this.confirmModal.targetUserId
      );
    },
    onHide() {
      this.addUser = {};
      this.edittingUser = false;
      this.changingUserRole = false;
      this.$store.dispatch("AdminUser/resetPostingStatus");
      this.$store.dispatch("clearAllValidationErrors");
    }
  },
  computed: {
    companies() {
      let admins = this.$store.state.AdminUser.companies;
      if (this.searchTerm && admins) {
        admins = admins.filter(row => {
          return Object.keys(row).some(key => {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(this.searchTerm.toLowerCase()) > -1
            );
          });
        });
      }
      return admins;
    },
    paginationData() {
      return this.$store.state.AdminUser.companiesPaginationData;
    },
    postSuccess() {
      return this.$store.state.AdminUser.postAdminSuccess;
    },
    postCompany(){
        return this.$store.state.AdminUser.postCompanySuccess;
    },
    error() {
      return this.$store.state.validation;
    },
    isPosting() {
      return this.$store.state.AdminUser.isPostingAdmin;
    },
    isGettingCompany() {
      return this.$store.state.AdminUser.fetchingCompanies;
    }
  },
  mounted() {
    //this.$store.dispatch('AdminUser/fetchAdmins');
    this.changePage();
  }
};
</script>