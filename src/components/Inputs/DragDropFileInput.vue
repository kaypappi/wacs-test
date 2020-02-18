<template>
    <div class="file-input-div">
        <div  class="file-input-label">
            <img src="/assets/images/Calendar.svg" alt="">
            <span class="top-label-text">Upload Banner (531 X 134)</span>
            <span class="bottom-label-text">PNG, JPG, GIF up to 2MB</span>
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
    },
    watch: {
        file: function (file) {
            this.onfile(file);
        }
    },
}
</script>
