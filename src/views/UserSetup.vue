<template>
     <div class="users">
         <addUserModal title="Add User">
            <form @submit.prevent="onSubmit">
                <TextInput 
                    label="Name"
                    id="name"
                    placeholder="Lauren Micheals"
                    classes="modal-inputs"
                    v-model="addUser.full_name"
                />
                <TextInput 
                    label="Username"
                    id="username"
                    placeholder="LMicheals"
                    classes="modal-inputs"
                    v-model="addUser.user_name"
                />
                <TextInput 
                    type="email"
                    label="Email"
                    id="email"
                    placeholder="laurenmicheal@gmail.com"
                    classes="modal-inputs"
                    v-model="addUser.email"
                />
                <TextInput 
                    label="Phone Number"
                    id="phoneNumber"
                    placeholder="09040590023"
                    classes="modal-inputs"
                    v-model="addUser.phone_number"
                />
                <label for="role">User Role</label>
                <select name="role" id="role" class="modal-inputs" v-model="addUser.role">
                    <option value="Super Admin">Super Admin</option>
                    <option value="User Admin">User Admin</option>
                </select>
                <!-- <DropdownInput 
                    :options="availableRoles"
                    :v-model="addUser.role"
                    label="User Role"
                    id="role"
                /> -->
                <!-- <label for="name">Name</label> -->
                <!-- <label for="role">User Role</label>
                <select name="" id="role" class="modal-inputs">
                    <option selected="selected" value="">Select</option>
                </select> -->
                <button type="submit" class="form-modal-button">Create</button>
            </form>
         </addUserModal>
         <UserCard 
            v-for="user in userss"
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
    import axios from 'axios';
    import CustomModal from '../components/Modals/CustomModal';
    import AddUserCard from '../components/Cards/AddUserCard';
    import UserCard from '../components/Cards/UserCard';
    import TextInput from '../components/Inputs/TextInput';
    // import DropdownInput from '../components/Inputs/Dropdown';
    export default {
        components: {
            AddUserCard,
            UserCard,
            TextInput,
            // DropdownInput,
            'addUserModal': CustomModal
        },
         data() {
            return {
                users: [],
                availableRoles: ['Super Admin', 'User Admin'],
                addUser: {
                    full_name: '',
                    user_name: '',
                    email: '',
                    phone_number: '',
                    role: '',
                    password: "12345678",
                }
            }
        },
        methods: {
            onSubmit() {
                axios.post('http://127.0.0.1:8000/api/v1/user/creditor', this.addUser)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            }
        },
        computed: {
            userss() {
                return this.$store.state.AdminUser.adminUsers;
            },
        },
        mounted() {
            this.$store.dispatch('fetchAdmins')
        },
    }
</script>
