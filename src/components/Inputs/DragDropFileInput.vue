<template>
    <div class="file-input-div">
        <div  class="file-input-label">
            <img src="/assets/images/file.svg" alt="">
            <span class="top-label-text">{{label}}</span>
            <span class="bottom-label-text">{{fileTypes}}</span>
        </div>
        <b-form-file v-model="file" plain></b-form-file>
        <div class="file-input-background">
            <img src="/assets/images/Double-check1.svg" alt="">
            <span>{{ file ? file.name : 'Select or Drag & Drop file to upload' }}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            file: null
        }
    },
    props: {
        onfile: Function,
        label: String,
        fileTypes: String,
    },
    watch: {
        file: function (file) {
            this.onfile(file);
        }
    },
}
</script>
