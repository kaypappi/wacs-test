<template>
    <div>
        <b-toast id="my-toast" :toast-class="toastClass" toaster="b-toaster-top-center" :visible="show" solid>
            <template v-slot:toast-title>
                <img src="/assets/images/check.svg" class="logo" alt="WACS logo" v-if="success">
                <img src="/assets/images/Error.svg" class="logo" alt="WACS logo" v-else>
                <div>
                    <h5>{{title}}</h5>
                    <span>{{message}}</span>
                </div>
            </template>
        </b-toast>
    </div>
</template>

<script>
    export default {
       props: {
           'message':String,
           /* 'successMessage': String,
           'failureMessage': String, */
           'title': String,
           'success': Boolean,
           'show': Boolean,
       },
       computed: {
           toastClass() {
               return !this.success ? 'error-toast' : 'success-toast';
           }
       },
       mounted(){
           console.log(this.message)
       }
    }
</script>
