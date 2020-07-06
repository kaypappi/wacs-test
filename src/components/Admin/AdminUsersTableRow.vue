<template>
    <tr class="admin-table-row">
        <td class="user-initials-cell">
            <span >{{initials(fullName)}}</span>
        </td>
        <td class="text-capitalize">{{fullName}}</td>
        <td>{{userName}}</td>
        <td>{{email}}</td>
        <td>{{role}}</td>
        <td>
            <span v-if="isActive === 'Active'" class="status-oval active-status">Active</span>
            <span v-if="isActive ==='Inactive'" class="status-oval inactive-status">Inactive</span>
            <span v-if="isActive ==='New'" class="status-oval new-status">New</span>
        </td>
        <td class="dropdown-cell">
            <Dropdown
              :options="[
                    {
                        name: 'Edit',
                        icon: 'Edit.svg',
                        handler: edit,
                        shouldRender: true,
                    },
                ]"
            />
        </td>
    </tr>
</template>
<script>
    import Dropdown from '../Dropdown/Dropdown';
    export default {
        components: {
            Dropdown,
        },
        props: {
            'id': [String, Number],
            'fullName': String,
            'userName': String,
            'isActive': String,
            'email': String,
            'phone_number':String || null,
            'role': String,
            'roleId': Number,
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
                    phone_number:this.phone_number
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
            initials() {
                const names = this.fullName.split(' ');
                return names[0][0]+names[1][0];
            },
        },
    }

    /* {
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
                    } */
</script>
