<template>
    <div class="container">
        <div class="form-wrapper">
            <img src="/assets/images/WACS.png" class="logo" alt="WACS logo">
            <div class="login-area">
                <p>LOGIN</p>
                <form @submit.prevent="submit">
                    <label for="username">Email</label>
                    <input type="text" v-model="form.email" id="username" placeholder="Enter Email">
                    <label for="password">Password</label>
                    <div class="password-container">
                        <input type="password" v-model="form.password" id="password" placeholder="Enter password">
                        <span>Visible</span>
                    </div>
                    <button>Enter</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: "Login",
        data(){
            return {
                form:{
                    email:'',
                    password:''
                }
            }
        },
        computed:{
            ...mapGetters({
                authenticated : 'auth/authenticated',
                user : 'auth/user'
            })
        },
        methods:{
           ...mapActions({
               signIn: 'auth/signIn'
           }),

            submit (){
               this.signIn(this.form).then(()=> {
                   this.$router.replace({
                       name: 'dashboard'
                   })
               })
            }
        }

    }
</script>

<style scoped>
    .container{
        background-image: url("/assets/images/login-background.png");
        background-size: cover;
        min-height: 100vh;
        min-width: 100vw;
    }

    .form-wrapper{
        width: 408px;
        height: 100%;
        margin: 0 auto;
        padding: 86px 0 86px 0;
    }

    .form-wrapper .logo{
        height: 82px;
        width: 78px;
        margin: 0 165px 41px 165px;
    }

    .form-wrapper .login-area{
        height: 402px;
        padding: 35px;
        box-sizing: border-box;
        border-radius: 8px;
        background-color: #FFFFFF;
        box-shadow: 0 2px 20px 0 rgba(97,97,97,0.5);
    }

    .form-wrapper .login-area>p{
        margin: 0 138px 12px 138px;
        height: 24px;
        width: 62px;
        color: #333333;
        font-size: 20px;
        line-height: 24px;
    }

    .form-wrapper .login-area label{
        display: block;
        height: 19px;
        width: 80px;
        color: #333333;
        font-size: 16px;
        line-height: 19px;
        margin: 30px 0 6px 0;
    }

    .form-wrapper .login-area input{
        box-sizing: border-box;
        height: 45px;
        width: 338px;
        border: 1px solid #CCCCCC;
        background-color: #F8F8F8;
        padding: 15px;
    }

    .form-wrapper .login-area input::-webkit-input-placeholder {
        height: 16px;
        width: 110px;
        color: #9D9D9D;
        font-size: 14.4px;
        font-weight: 300;
        line-height: 16px;
    }

    .form-wrapper .login-area .password-container span{
        height: 15px;
        width: 40px;
        color: #009831;
        font-family: "Work Sans";
        font-size: 12.4px;
        line-height: 15px;
        position: relative;
        top: -33px;
        left: 282px
    }

    .form-wrapper .login-area button{
        height: 50px;
        width: 338px;
        margin: 44px 0;
        background-color: #27BE58;
        border: none;
        color: #FFFFFF;
        font-family: "Work Sans";
        font-size: 20.6px;
        line-height: 24px;
    }
</style>