<template>
    <div>
        <div class="page-filters">
            <div class="search-box filter-boxes">
                <input type="text" placeholder="Search loan offers, codes">
                <img src="assets/images/search-icon.svg" alt="">
            </div>
            <div class="new-offer-div">
                <button data-toggle="modal" v-b-modal.add-user-form-modal>
                    <img src="assets/images/Plus.svg" alt="Plus sign">
                    Add User
                </button>
            </div>
        </div>
            <addUserModal :onHide="onHide">
                <div v-if="postSuccess">
                    <p class="modal-success-message">You have successfully added <b>{{addUser.full_name}}</b> as an admin</p> 
                    <button class="form-modal-button" @click="$bvModal.hide('form-modal')">Close</button>
                </div>
                <template v-else>
                    <h5 class="form-modal-title">{{ edittingUser ? 'Edit User' : 'New User'}}</h5>
                    <div class="form-modal-title-border"></div>
                    <form @submit.prevent="onSubmit">
                        <TextInput 
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
                            label="Phone Number"
                            id="phoneNumber"
                            name="phone_number"
                            :error="error.phone_number"
                            inputClass="form-modal-inputs"
                            labelClass="form-modal-label"
                            v-model="addUser.phone_number"
                            :keyupEvent="keyupEvent"
                        />
                        <label for="role" class="form-modal-label">User Role</label>
                        <select name="role" id="role" class="form-modal-inputs" required v-model="addUser.role_id">
                            <template v-for="role in roles">
                                <option :value="role.id" :key="role.id">{{role.name}}</option>
                            </template>
                        </select>
                        <SubmitButton 
                            buttonClass="form-modal-button"
                            :name="edittingUser ? 'Submit' : 'Create'"
                            :isLoading="isPosting"
                        />
                    </form>
                </template>
            </addUserModal>
            <img src="/assets/images/page-ring-loader.svg" alt="loader" v-if="isGettingUsers" class="page-loader">
            <template v-else>
                <Table :tableHeaders="['', 'Name', 'Username', 'Email', 'Role', 'Status', '']">
                    <AdminUsersTableRow
                        v-for="user in users"
                        :id="user.id"
                        :fullName="user.full_name"
                        :userName="user.full_name"
                        :isActive="user.profile.is_active"
                        :email="user.email"
                        :role="user.roles[0]"
                        :key="user.id"
                        :onEdit="editUser"
                    />
                </Table>
            </template>

    </div>
</template>

<script>
    import CustomModal from '../components/Modals/CustomModal';
    import Table from '../components/Table/Table';
    import AdminUsersTableRow from '../components/Table/AdminUsersTableRow';
    import SubmitButton from '../components/Buttons/SubmitButton';
    import TextInput from '../components/Inputs/TextInput';
    export default {
        components: {
            Table,
            AdminUsersTableRow,
            SubmitButton,
            TextInput,
            'addUserModal': CustomModal
        },
         data() {
            return {
                addUser: {},
                edittingUser: false,
                roles: [
                    {
                        id: 1,
                        name: "Super Admin",
                    },
                    {
                        id: 2,
                        name: "User Admin",
                    },
                ]
            }
        },
        methods: {
            onSubmit() {
                if(!this.$can('create', 'user')){
                    alert('No Permission');
                    return;
                }
                if(this.edittingUser) {
                    this.$store.dispatch('AdminUser/editAdmin', this.addUser);
                } else{
                    this.$store.dispatch('AdminUser/createAdmin', this.addUser);
                }
            },
            keyupEvent(name) {
                if(this.error[name]) {
                    this.$store.dispatch('clearOneValidationError', name);
                }
            },
            editUser(data) {
                this.edittingUser = true;
                this.addUser = data;
                this.$bvModal.show('add-user-form-modal');
            },
            onHide() {
                this.addUser = {};
                this.edittingUser = false;
                this.$store.dispatch('AdminUser/resetPostingStatus');
                this.$store.dispatch('clearAllValidationErrors');
            },
        },
        computed: {
            users() {
                return this.$store.state.AdminUser.adminUsers;
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
            }
        },
        mounted() {
            this.$store.dispatch('AdminUser/fetchAdmins');
        },
    }
</script>
