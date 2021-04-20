<template>
  <div class="file-input-div">
    <div class="file-input-label d-flex align-items-center">
      <img src="/assets/images/file.svg" alt />
      <span class="top-label-text ml-2">{{label}}</span>

      <!-- <span class="bottom-label-text">{{fileTypes}}</span> -->
      <!-- <a class="bottom-label-text" href="/assets/file/repayment.csv" target="_blank">
        <img class="download-img" src="/assets/images/download.svg" alt="download" />Download sample payment schedule
      </a>-->
    </div>
    <b-form-file v-if="loadingCount===0" v-model="inputVal" plain accept=".xls, .xlsx, .csv"></b-form-file>
    <div class="file-input-background">
      <template v-if="loadingCount>0">
        <div class="fileLoading w-100 h-100">
          <img src="/assets/images/file.svg" alt />
          <div class="fileLoading-info d-flex flex-column justify-content-center">
            <span class="filename text-start mr-auto">{{value.name}}</span>
            <b-progress :value="loadingCount" height="5px" variant="secondary" :max="max" class="mb-0"></b-progress>
            <span :style="{visibility:loadingCount<120 ? 'hidden' : 'visible'}"  class="mr-auto complete">Upload Complete</span>
          </div>
          <b-icon @click="deleteFile" class="trash" icon="trash-fill"></b-icon>
        </div>
      </template>
      <template v-else>
        <div class="d-flex flex-column justify-content-center w-100 h-100 pt-3">
          <img src="/assets/images/Cloud-upload.svg" alt />
          <span>Drag & Drop to upload</span>
          <p class="subtext">
            or
            <span>browse</span> to select an xls/csv file
          </p>
        </div>
      </template>
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
    onfile: {
      type: Function,
      default: () => {}
    },
    label: String,
    fileTypes: String,
    value: File,
    isLoading: Boolean,
    loadingCount: Number,
    max:{
      type:Number,
      default:100
    },
    deleteFile:{
      type:Function,
      default:()=>{}
    }
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
.download-img {
  margin-right: 5px;
  width: 10px !important;
  height: 10px !important;
}

.fileLoading {
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  grid-gap: 10px;
  align-items: center;
}

.filename{
  font-weight: 500;
  font-size: 12px;
}

.complete{
  font-size: 12px;
  font-weight: 400;
}
.trash{
  color:#27be58;
  cursor: pointer;
}
</style>
