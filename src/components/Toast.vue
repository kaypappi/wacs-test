<template>
    <div>
        <b-toast id="my-toast" toaster="b-toaster-top-center" :visible="show" solid>
            <template v-slot:toast-title>
                <img src="/assets/images/check.svg" class="logo" alt="WACS logo">
                <div>
                    <h5 v-if="success">{{title}}</h5>
                    <span v-if="success">{{successMessage}}</span>
                    <span v-else>{{failureMessage}}</span>
                </div>
            </template>
        </b-toast>
    </div>
</template>

<script>
    export default {
       props: {
           'successMessage': String,
           'failureMessage': String,
           'title': String,
           'success': Boolean,
           'show': Boolean,
       },
    }
</script>
