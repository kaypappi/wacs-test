<template>
  <div>
    <div class="page-filters">
      <SearchFilterInput
        placeholder="Search by name, role, status"
        v-model="searchTerm"
        :onSearch="searchAdmin"
      />
      <div class="cta-div">
        <Button :onclick="showModal" class="cta-button">
          <img src="/assets/images/Plus.svg" alt="Plus sign" />
          Add User
        </Button>
      </div>
    </div>
    <CustomModal :onHide="onHide" id="add-user-form-modal">
      <div v-if="postSuccess">
        <p class="modal-success-message" v-if="edittingUser">Edit Successful</p>
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
            label="Full Name"
            id="name"
            name="full_name"
            :error="error.full_name"
            inputClass="form-modal-inputs"
            labelClass="form-modal-label"
            v-model="addUser.full_name"
            :keyupEvent="keyupEvent"
          />
          <TextInput
            v-if="!changingUserRole"
            label="Username"
            id="username"
            name="user_name"
            :error="error.user_name"
            inputClass="form-modal-inputs"
            labelClass="form-modal-label"
            v-model="addUser.user_name"
            :keyupEvent="keyupEvent"
          />
          <TextInput
            v-if="!changingUserRole"
            type="email"
            label="Email"
            id="email"
            name="email"
            :error="error.email"
            inputClass="form-modal-inputs"
            labelClass="form-modal-label"
            v-model="addUser.email"
            :keyupEvent="keyupEvent"
          />
          <TextInput
            v-if="!changingUserRole"
            label="Phone Number"
            id="phone_number"
            name="phone_number"
            :error="error.phone_number"
            inputClass="form-modal-inputs"
            labelClass="form-modal-label"
            v-model="addUser.phone_number"
            :keyupEvent="keyupEvent"
          />
          <label
            v-if="!edittingUser || changingUserRole"
            for="role"
            class="form-modal-label"
          >Select Bank</label>
          <select
            v-if="!edittingUser"
            name="role"
            id="role"
            class="form-modal-inputs"
            required
            :disabled="isGettingCompany"
            v-model="addUser.company_id"
          >
            <template v-for="company in companies ">
              <option :value="company.id" :key="company.id">{{company.name}}</option>
            </template>
          </select>
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
      v-if="isGettingUsers"
      class="page-loader"
    />
    <template v-else-if="users.length>0">
      <Table :tableHeaders="['', 'Name', 'Username', 'Email', 'Role', 'Status', '']">
        <AdminUsersTableRow
          v-for="user in users"
          :id="user.id"
          :fullName="user.full_name"
          :userName="user.user_name"
          :isActive="user.status"
          :email="user.email"
          :phone_number="user.profile.phone_number"
          :key="user.id"
          :role="user.roles[0].name"
          :roleId="user.roles[0].id"
          :onEdit="editUser"
          :onResetPassword="confirmResetPassword"
          :onToggleStatus="toggleUserStatus"
          :onChangeRole="changeUserRole"
        />
      </Table>
      <Pagination
        v-if="!searchTerm && Object.values(paginationData).length>0"
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
import AdminUsersTableRow from "../../components/Admin/AdminUsersTableRow";
import SubmitButton from "../../components/Buttons/SubmitButton";
import Button from "../../components/Buttons/Botton";
import TextInput from "../../components/Inputs/TextInput";
import Pagination from "../../components/Pagination/Pagination";
import SearchFilterInput from "../../components/Inputs/SearchFilterInput";
import { EventBus } from "@/event.js";
//import Fuse from 'fuse.js';
export default {
  components: {
    Table,
    AdminUsersTableRow,
    SubmitButton,
    Button,
    TextInput,
    CustomModal,
    ConfirmModal,
    Pagination,
    SearchFilterInput
  },
  data() {
    return {
      addUser: {
      },
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
    showModal() {
      this.$bvModal.show("add-user-form-modal");
      this.$store.dispatch("AdminUser/fetchCompanies", { page: {}, query: {} });
    },
    searchAdmin() {
      if (this.searchTerm) {
        alert("searching for " + this.searchTerm);
      }
    },
    changePage(page = this.$route.query.page, query = this.$route.query) {
      const userType = "creditor";
      this.$store.dispatch("AdminUser/fetchAdmins", { page, query, userType });
    },
    onSubmit() {
      if (!this.$can("view", "loan") || !Object.keys(this.addUser).length) {
        return;
      }
      if (this.edittingUser || this.changingUserRole) {
        this.$store.dispatch("AdminUser/editAdmin", {
          userData: { ...this.addUser, userId: this.targetUserId },
          userType: "creditors"
        });
      } else {
        this.$store.dispatch("AdminUser/createAdmin", {
          userData: this.addUser,
          userType: "creditors"
        });
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
    users() {
      let admins = this.$store.state.AdminUser.adminUsers;
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
      return this.$store.state.AdminUser.paginationData;
    },
    postSuccess() {
      return this.$store.state.AdminUser.postAdminSuccess;
    },
    error() {
      return this.$store.state.validation;
    },
    isPosting() {
      return this.$store.state.AdminUser.isPostingAdmin;
    },
    isGettingUsers() {
      return this.$store.state.AdminUser.isGettingAdmins;
    },
    companies() {
      return this.$store.state.AdminUser.companies;
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