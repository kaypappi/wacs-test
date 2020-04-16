<template>
    <tr class="admin-table-row">
        <td>{{date}}</td>
        <td>{{code}}</td>
        <td>{{title}}</td>
        <td>{{amount}}</td>
        <td>{{interest}}</td>
        <td>{{duration}}</td>
        <td>
            <span v-if="status === 'Active'" class="status-oval active-status">Active</span>
            <span v-if="status ==='Inactive'" class="status-oval inactive-status">Inactive</span>
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
                    {
                        name: status === 'Inactive' ? 'Activate' : 'Deactivate',
                        icon: 'switch.svg',
                        handler: changeStatus,
                        shouldRender: true,
                    },
                    {
                        name: 'View Details',
                        icon: 'Unlock.svg',
                        handler: resetPassword,
                        shouldRender: true,
                    },
                    {
                        name: 'Delete',
                        icon: 'Trash.svg',
                        handler: changeRole,
                        shouldRender: true,
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
            'id': [String, Number],
            'date': String,
            'code': String,
            'title': String,
            'amount': String,
            'interest': String,
            'duration': String,
            'status': String,
            'onEdit': Function,
            'onResetPassword': Function,
            'onToggleStatus': Function,
            'onChangeRole': Function,
        },
        methods: {
            edit() {
                this.onEdit();
            },
            changeStatus() {
                this.onToggleStatus();
            },
            resetPassword() {
                this.onResetPassword();
            },
            changeRole() {
                this.onChangeRole();
            },
        },
    }
</script>
