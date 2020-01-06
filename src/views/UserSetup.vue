<template>
    <div class="users">
         <addUserModal :onHide="onHide">
            <div v-if="postSuccess">
                <p class="modal-success-message">You have successfully added <b>{{addUser.full_name}}</b> as an admin</p> 
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
                        :error="error.full_name"
                        placeholder="Lauren Micheals"
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
                        placeholder="LMicheals"
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
                        placeholder="laurenmicheal@gmail.com"
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
                        placeholder="09040590023"
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
                        name="Create"
                        :isLoading="isPosting"
                    />
                </form>
            </template>
         </addUserModal>
        <img src="/assets/images/page-ring-loader.svg" alt="loader" v-if="isGettingUsers" class="page-loader">
        <template v-else>
            <UserCard 
                v-for="user in users"
                :fullName = "user.user.full_name"
                :userName = "user.user_name"
                :isActive = "user.is_active"
                :email = "user.user.email"
                :phone = "user.phone_number"
                :role = "getRole(user.role)"
                :key="user.id"
            />
            <AddUserCard />
        </template>
        
        <Can I="edit" a="user">
            <div>
                fffdd
            </div>
        </Can>
    </div>
</template>

<script>
    import CustomModal from '../components/Modals/CustomModal';
    import AddUserCard from '../components/Cards/AddUserCard';
    import UserCard from '../components/Cards/UserCard';
    import SubmitButton from '../components/Buttons/SubmitButton';
    import TextInput from '../components/Inputs/TextInput';
    export default {
        components: {
            AddUserCard,
            UserCard,
            SubmitButton,
            TextInput,
            'addUserModal': CustomModal
        },
         data() {
            return {
                availableRoles: ['Super Admin', 'User Admin'],
                addUser: {},
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
            getRole(roleData) {
                if(roleData.role_id){
                    const requiredRole = this.roles.find(role => role.id === roleData.role_id);
                    return requiredRole.name;
                }else {
                    return roleData[0].name;
                }
            },
            onSubmit() {
                if(!this.$can('create', 'user')){
                    alert('No Permission');
                    return;
                }
                this.$store.dispatch('AdminUser/createAdmin', this.addUser);
            },
            keyupEvent(name) {
                if(this.error[name]) {
                    this.$store.dispatch('clearOneValidationError', name);
                }
            },
            onHide() {
                this.addUser = {};
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
