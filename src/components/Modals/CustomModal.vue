<template>
    <b-modal id="form-modal" hide-footer no-close-on-backdrop @hidden="onHide">
        <template v-slot:modal-header="{ close }">
            <div class="close"  @click="close()">
                <span aria-hidden="true">&times;</span>
            </div>
        </template>
        <slot></slot>
    </b-modal>
</template>

<script>
    export default {
        props: {
            'title':String,
            'onHide': Function,
        },
    }
</script>
