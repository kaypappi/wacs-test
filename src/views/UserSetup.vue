<template>
     <div class="users">
         <addUserModal :onHide="onHide">
             <div v-if="postSuccess">
                 <p class="modal-success-message">You have successfully added <b>{{addUser.full_name}}</b> as a {{addUser.role}}</p> 
                 <button class="form-modal-button" @click="$bvModal.hide('form-modal')">Close</button>
             </div>
            <template v-else>
                <h5 class="form-modal-title">New User</h5>
                <div class="form-modal-title-border"></div>
                <form @submit.prevent="onSubmit">
                    <TextInput 
                        label="Full Name"
                        id="name"
                        name="full_name"
                        :error="formErrors.full_name"
                        placeholder="Lauren Micheals"
                        classes="form-modal-inputs"
                        v-model="addUser.full_name"
                        :keyupEvent="keyupEvent"
                    />
                    <TextInput 
                        label="Username"
                        id="username"
                        name="user_name"
                        :error="formErrors.user_name"
                        placeholder="LMicheals"
                        classes="form-modal-inputs"
                        v-model="addUser.user_name"
                        :keyupEvent="keyupEvent"
                    />
                    <TextInput 
                        type="email"
                        label="Email"
                        id="email"
                        name="email"
                        :error="formErrors.email"
                        placeholder="laurenmicheal@gmail.com"
                        classes="form-modal-inputs"
                        v-model="addUser.email"
                        :keyupEvent="keyupEvent"
                    />
                    <TextInput 
                        label="Phone Number"
                        id="phoneNumber"
                        name="phone_number"
                        :error="formErrors.phone_number"
                        placeholder="09040590023"
                        classes="form-modal-inputs"
                        v-model="addUser.phone_number"
                        :keyupEvent="keyupEvent"
                    />
                    <label for="role" class="form-modal-label">User Role</label>
                    <select name="role" id="role" class="form-modal-inputs" required v-model="addUser.role">
                        <option value="Super Admin">Super Admin</option>
                        <option value="User Admin">User Admin</option>
                    </select>
                    <button type="submit" class="form-modal-button">
                        <img src="/assets/images/form-loader.gif" alt="loader" v-if="isPosting">
                        <span v-else>Create</span>
                    </button>
                </form>
            </template>
            
         </addUserModal>
         
         <UserCard 
            v-for="user in users"
            :fullName = "user.user.full_name"
            :userName = "user.user_name"
            :isActive = "user.is_active"
            :email = "user.user.email"
            :phone = "user.phone_number"
            :role = "user.role"
            :key="user.id"
         />
         <AddUserCard />
     </div>
</template>

<script>
    import CustomModal from '../components/Modals/CustomModal';
    import AddUserCard from '../components/Cards/AddUserCard';
    import UserCard from '../components/Cards/UserCard';
    import TextInput from '../components/Inputs/TextInput';
    export default {
        components: {
            AddUserCard,
            UserCard,
            TextInput,
            'addUserModal': CustomModal
        },
         data() {
            return {
                availableRoles: ['Super Admin', 'User Admin'],
                addUser: {
                    full_name: '',
                    user_name: '',
                    email: '',
                    phone_number: '',
                    role: '',
                },
                formErrors: {
                    full_name: '',
                    user_name: '',
                    email: '',
                    phone_number: '',
                }
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch('createAdmin', this.addUser);
            },
            keyupEvent(name) {
                this.formErrors[name] = '';
            },
            onHide() {
                this.resetInputs();
                this.resetFormErrors();
                this.$store.dispatch('resetPostingStatus');
            },
            resetInputs() {
                this.addUser.full_name = '';
                this.addUser.user_name = '';
                this.addUser.email = '';
                this.addUser.phone_number = '';
                this.addUser.role = '';
            },
            resetFormErrors() {
                this.formErrors.full_name = '';
                this.formErrors.user_name = '';
                this.formErrors.email = '';
                this.formErrors.phone_number = '';
            },
        },
        computed: {
            users() {
                return this.$store.state.AdminUser.adminUsers;
            },
            postSuccess() {
                return this.$store.state.AdminUser.postAdminSuccess;
            },
            getError() {
                return this.$store.state.AdminUser.error;
            },
            isPosting() {
                return this.$store.state.AdminUser.isPostingAdmin;
            }
        },
        watch: {
            getError(errors) {
                for (const error in errors) {
                    this.formErrors[error] = errors[error][0];
                }
            }
        },
        mounted() {
            this.$store.dispatch('fetchAdmins');
        },
    }
</script>
