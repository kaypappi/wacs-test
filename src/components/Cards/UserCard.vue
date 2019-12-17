<template>
    <div class="user-card">
        <div class="card-head dropleft">
            <div class="picture">
                SF
            </div>
            <div class="names">
                <h5 class="fullname">{{fullName}}</h5>
                <h5 class="user-detail">username: {{userName}}</h5>
                <span v-if="isActive" class="loan-status active-loan-status">Active</span>
                <span v-else class="loan-status inactive-loan-status">Inactive</span>
            </div>
            <svg class="icon dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <use xlink:href="/assets/sprite.svg#vertical-ellipsis"></use>
            </svg>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <span class="dropdown-item" data-toggle="modal" data-target="#add-user-modal">
                    <img src="/assets/cancel.svg" alt="pencil"> Edit
                </span>
                <span class="dropdown-item">
                    <img src="/assets/cancel.svg" alt="switch"> Deactivate
                </span>
                <span class="dropdown-item" data-toggle="modal" data-target="#confirm-action-modal">
                    <img src="/assets/cancel.svg" alt="pencil"> Reset Password
                </span>
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
    export default {
        props: {
            'fullName': String,
            'userName': String,
            'isActive': [Boolean, Number],
            'email': String,
            'phone': [Number, String],
            'role': String
        },
    }
</script>
