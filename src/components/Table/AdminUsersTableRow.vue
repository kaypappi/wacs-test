<template>
    <tr>
        <td class="user-initials-cell">
            <span >{{initials(fullName)}}</span>
        </td>
        <td class="text-capitalize">{{fullName}}</td>
        <td>{{userName}}</td>
        <td>{{email}}</td>
        <td>{{role}}</td>
        <td>
            <span v-if="isActive" class="status-oval active-status">Active</span>
            <span v-else class="status-oval inactive-status">Inactive</span>
        </td>
        <td class="dropdown-cell">
            <Dropdown 
                :options="[
                    {
                        name: 'Edit',
                        icon: 'Edit.svg',
                        handler: edit,
                    }, 
                    {
                        name: 'Deactivate',
                        icon: 'switch.svg',
                        handler: deactivate,
                    }, 
                    {
                        name: 'Reset Password',
                        icon: 'Unlock.svg',
                        handler: resetPassword,
                    },
                    {
                        name: 'Change Role',
                        icon: 'Lock-overturning.svg',
                        handler: changeRole,
                    }
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
            'fullName': String,
            'userName': String,
            'isActive': [Boolean, Number],
            'email': String,
            'role': String,
            'onEdit': Function,
        },
        methods: {
            edit() {
                const cardInfo = {
                    full_name: this.fullName,
                    user_name: this.userName,
                    email: this.email,
                    role: this.role,
                }
                this.onEdit(cardInfo);
            },
            deactivate() {
                alert('deactivating');
            },
            resetPassword() {
                alert('resetting password');
            },
            changeRole() {
                alert('changing role');
            },
            initials() {
                const names = this.fullName.split(' ');
                return names[0][0]+names[1][0];
            },
        },
    }
</script>
