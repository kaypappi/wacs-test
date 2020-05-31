<template>
  <div class="file-input-div">
    <div class="file-input-label">
      <img src="/assets/images/file.svg" alt />
      <span class="top-label-text">{{label}}</span>
      <!-- <span class="bottom-label-text">{{fileTypes}}</span> -->
      <a class="bottom-label-text" href="/assets/file/repayment.csv" target="_blank">
        <img class="download-img" src="/assets/images/download.svg" alt="download" />Download sample payment schedule
      </a>
    </div>
    <b-form-file v-model="inputVal" plain></b-form-file>
    <div class="file-input-background">
      <img v-if="!isLoading" src="/assets/images/Cloud-upload.svg" alt />
      <img
        :style="{width:'20px',height:'auto'}"
        v-if="isLoading"
        src="/assets/images/page-ring-loader.svg"
        alt="loader"
      />
      <span>{{ value.name ? value.name : 'Drag & Drop to upload' }}</span>
      <p class="subtext">
        or
        <span>browse</span> to select an xls/csv file
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null
    };
  },
  props: {
    onfile: Function,
    label: String,
    fileTypes: String,
    value: File,
    isLoading: Boolean
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("changed", val);
      }
    }
  }
  /* watch: {
        file: function (file) {
            this.onfile(file);
        }
    }, */
};
</script>

<style >
.subtext {
  font-size: 10px;
  color: #898989;
  display: flex;
  justify-content: center;
}

.subtext span {
  color: #27be58 !important;
  margin: 0 5px;
  font-size: 10px !important;
}
.download-img{
    margin-right: 5px;
    width: 10px !important;
    height: 10px !important;
}
</style>
