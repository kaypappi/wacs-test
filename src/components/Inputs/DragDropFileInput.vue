<template>
    <div class="file-input-div">
        <div  class="file-input-label">
            <img src="/assets/images/file.svg" alt="">
            <span class="top-label-text">{{label}}</span>
            <span class="bottom-label-text">{{fileTypes}}</span>
        </div>
        <b-form-file v-model="file" plain></b-form-file>
        <div class="file-input-background">
            <img src="/assets/images/Cloud-upload.svg" alt="">
            <span>{{ file ? file.name : 'Drag & Drop to upload' }}</span>
            <p class="subtext">or <span>browse</span> to select an xls/csv file</p>
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

<style scoped>
.subtext{
    font-size: 10px;
    color: #898989;
    display: flex;
    justify-content: center;
}

.subtext span{
    color: #27BE58;
    margin: 0 5px;
    font-size: 10px;
}
</style>
