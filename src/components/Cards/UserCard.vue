<template>
    <div class="user-card">
        <div class="card-head dropleft">
            <Dropdown 
                :options="[
                    {
                        name: 'Edit',
                        handler: edit,
                    }, 
                    {
                        name: 'Deactivate',
                        handler: deactivate,
                    }, 
                    {
                        name: 'Reset Password',
                        handler: resetPassword,
                    }
                ]"
            />
            <div class="picture">
                {{initials}}
            </div>
            <div class="names">
                <h5 class="fullname">{{cleanFullName}}</h5>
                <h5 class="user-detail">username: {{cleanUserName}}</h5>
                <span v-if="isActive" class="status-oval active-status">Active</span>
                <span v-else class="status-oval inactive-status">Inactive</span>
            </div>
        </div>
        <div class="card-body">
            <h5 class="user-detail">Email</h5>
            <h5 class="user-detail-value">{{email}}</h5>
            <h5 class="user-detail">Phone Number</h5>
            <h5 class="user-detail-value">{{phone}}</h5>
            <h5 class="user-detail">Role</h5>
            <h5 class="user-detail-value">{{role}}</h5>
        </div>
    </div>
</template>

<script>
    import Dropdown from '../Dropdown/Dropdown';
    export default {
        components: {
            Dropdown,
        },
        props: {
            'fullName': String,
            'userName': String,
            'isActive': [Boolean, Number],
            'email': String,
            'phone': [Number, String],
            'role': String,
            'onEdit': Function,
        },
        methods: {
            edit() {
                const cardInfo = {
                    full_name: this.fullName,
                    user_name: this.userName,
                    email: this.email,
                    phone_number: this.phone,
                    role: this.role,
                }
                this.onEdit(cardInfo);
            },
            deactivate() {
                alert('deactivating');
            },
            resetPassword() {
                alert('resetting password');
            }
        },
        computed: {
            initials() {
                const names = this.fullName.split(' ');
                return names[0][0]+names[1][0];
            },
            cleanFullName() {
               return  this.fullName.length > 20 ? this.fullName.substring(0, 17)+'..' : this.fullName;
            },
            cleanUserName() {
               return  this.userName.length > 12 ? this.userName.substring(0, 9)+'..' : this.userName;
            }
        }
    }
</script>
