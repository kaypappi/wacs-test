<template>
    <div class="container">
        
        <Toast 
            :show="isInvalidToken || resetSuccess"
            title="Successful!"
            successMessage="You have Successfully changed your password"
            failureMessage="Invalid token"
            :success="resetSuccess"
        />

        <div class="form-wrapper" v-if="isValidToken">
            <img src="/assets/images/change-password.svg" class="logo" alt="WACS logo">
            <div class="login-area">
                <form @submit.prevent="submit">
                    <TextInput 
                        label="New Password"
                        id="password"
                        name="password"
                        type="password"
                        inputClass="login-form-input"
                        labelClass="login-form-label"
                        :error="error.password"
                        placeholder="Enter Password"
                        v-model="formData.password"
                        :keyupEvent="keyupEvent"
                    />

                    <TextInput 
                        label="Re-Enter Password"
                        id="password-confirm"
                        name="passwordConfirm"
                        type="password"
                        inputClass="login-form-input"
                        labelClass="login-form-label"
                        :error="error.passwordConfirm"
                        placeholder="Enter New Password"
                        v-model="formData.passwordConfirm"
                        :keyupEvent="keyupEvent"
                    />

                    <SubmitButton 
                        name="Save"
                        :isLoading="isLoading"
                    />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import TextInput from '../../components/Inputs/TextInput';
    import SubmitButton from '../../components/Buttons/SubmitButton';
    import Toast from '../../components/Toast';
    export default {
        name: "Reset-password",
        components: {
            TextInput,
            SubmitButton,
            Toast,
        },
        data(){
            return {
                formData:{},
                showToss: false,
            }
        },
        computed:{
            error() {
                return this.$store.state.validation;
            },
            isLoading() {
                return this.$store.state.ResetPassword.isLoading;
            },
            isInvalidToken() {
                return this.$store.state.ResetPassword.tokenIsInvalid;
            },
            isValidToken() {
                return this.$store.state.ResetPassword.tokenIsValid;
            },
            resetSuccess() {
                return this.$store.state.ResetPassword.resetSuccess;
            }
        },
        methods:{
            submit() {
                if(this.formData.password !== this.formData.passwordConfirm) {
                    const error = {
                        errors: {
                            passwordConfirm: ["passwords do not match"]
                        }
                    }
                    this.$store.dispatch('setValidationErrors', error);
                    return;
                }
                this.formData.token = this.$route.params.token;
                this.$store.dispatch('ResetPassword/resetPassword', this.formData);
            },
            keyupEvent(name) {
                if(this.error[name]) {
                    this.$store.dispatch('clearOneValidationError', name);
                }
            },
        },
        mounted() { 
            this.$root.$on('bv::toast:hidden', () => { 
                this.$router.replace({
                    name: 'login'
                }); 
            }) 
        }

    }
</script>

<style scoped>
    .form-wrapper{
        width: 408px;
        /* height: 100%; */
        margin: 0 auto;
        padding: 40px 0 86px 0;
    }

    .form-wrapper .logo{
        height: 58px;
        width: 58px;
        margin: 0 165px 0px 165px;
    }

    .form-wrapper .login-area{
        min-height: 370px;
        padding: 0 35px;
    }

    .form-wrapper .login-area button{
        height: 50px;
        width: 338px;
        margin: 31px 0 0 0;
        background-color: #27BE58;
        border: none;
        color: #FFFFFF;
        font-family: "Work Sans";
        font-size: 20.6px;
        line-height: 24px;
    }
</style>