<template>
     <div class="modal fade form-modal" id="add-user-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalScrollableTitle">{{title}}</h5>
                    <div class="header-border"></div>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
            </div>
            <div class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            'title':String,
        },
    }
</script>
