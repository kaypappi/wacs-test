<template>
    <div class="user-card add-user">
        <img src="/assets/images/add-user.svg" alt="">
        <Botton data-toggle="modal" data-target="#add-user-modal">
            Add User
        </Botton>
    </div>
</template>

<script>
    import Botton from '../Buttons/Botton';
    export default {
        components: {
            Botton,
        },
    }
</script>
