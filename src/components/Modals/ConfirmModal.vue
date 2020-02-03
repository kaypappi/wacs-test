<template>
    <CustomModal id="confirm-action-modal">
        <template v-if="propObject.onSuccess">
            <img src="/assets/images/success-check.svg">
            <h5>Success!</h5>
            <p>{{propObject.successMessage}}</p>
            <button @click="$bvModal.hide('confirm-action-modal')">Close</button>
        </template>
        <template v-else>
            <img src="/assets/images/page-ring-loader.svg" alt="loader" v-if="loading" class="page-loader">
            <div v-else>
                <h5>Confirmation</h5>
                <p>{{propObject.promptMessage}}</p>
                <button @click="$bvModal.hide('confirm-action-modal')">Cancel</button>
                <button @click="onConfirm">Proceed</button>
            </div>
        </template>
    </CustomModal>
</template>

<script>
    import CustomModal from './CustomModal';
    import { EventBus } from '@/event.js';
    export default {
        components: {
            CustomModal
        },
        data() {
            return {
                propObject: {},
                loading: false
            }
        },
        methods: {
            onConfirm() {
                this.loading = true;
                return this.propObject.onConfirm();
            },
            sendMe(data) {
                this.propObject = data;
                this.$bvModal.show('confirm-action-modal');
            },
            finished(success) {
                if(success) {
                    this.propObject.onSuccess = true;
                    this.loading = false;
                }
                this.loading = false;
            }
        },
        mounted() {
            EventBus.$on('custom', this.sendMe);
            EventBus.$on('success', this.finished);
        }
        
    }
</script>
