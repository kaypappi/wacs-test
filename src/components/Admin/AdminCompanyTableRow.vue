<template>
    <tr class="admin-table-row">
       <!--  <td class="user-initials-cell">
            <span >{{name}}</span>
        </td>
        <td class="text-capitalize">{{fullName}}</td> -->
        <td>{{name}}</td>
        <td>{{email}}</td>
        <td>{{address}}</td>
        <!-- <td>
            <span v-if="isActive === 'Active'" class="status-oval active-status">Active</span>
            <span v-if="isActive ==='Inactive'" class="status-oval inactive-status">Inactive</span>
            <span v-if="isActive ==='New'" class="status-oval new-status">New</span>
        </td> -->
        <!-- <td class="dropdown-cell">
            <Dropdown
              :options="[
                    {
                        name: 'Edit',
                        icon: 'Edit.svg',
                        handler: edit,
                        shouldRender: true,
                    },
                    {
                        name: isActive === 'Inactive' ? 'Activate' : 'Deactivate',
                        icon: 'switch.svg',
                        handler: changeStatus,
                        shouldRender: isActive !== 'New',
                    },
                    {
                        name: 'Reset Password',
                        icon: 'Unlock.svg',
                        handler: resetPassword,
                        shouldRender: true,
                    },
                    {
                        name: 'Change Role',
                        icon: 'Lock-overturning.svg',
                        handler: changeRole,
                        shouldRender: true,
                    }
                ]"
            />
        </td> -->
    </tr>
</template>
<script>
    //import Dropdown from '../Dropdown/Dropdown';
    export default {
        components: {
           // Dropdown,
        },
        props: {
            'id': [String, Number],
            'name': String,
            'email': String,
            'address':String,
            'onEdit': Function,
            'onResetPassword': Function,
            'onToggleStatus': Function,
            'onChangeRole': Function,
        },
        methods: {
            edit() {
                const userInfo = {
                    full_name: this.fullName,
                    user_name: this.userName,
                    email: this.email,
                }
                this.onEdit(userInfo, this.id);
            },
            changeStatus() {
                this.onToggleStatus(this.id);
            },
            resetPassword() {
                this.onResetPassword(this.email, this.fullName);
            },
            changeRole() {
                const roleInfo = {
                    role_id: this.roleId,
                }
                this.onChangeRole(roleInfo, this.id);
            },
        },
    }
</script>
