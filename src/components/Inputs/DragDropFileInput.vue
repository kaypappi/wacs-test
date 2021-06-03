<template>
  <div class="file-input-div">
    <!-- <div class="file-input-label d-flex align-items-center">
      <img src="/assets/images/file.svg" alt />
      <span class="top-label-text ml-2">{{label}}</span>

      <span class="bottom-label-text">{{fileTypes}}</span>
      <a class="bottom-label-text" href="/assets/file/repayment.csv" target="_blank">
        <img class="download-img" src="/assets/images/download.svg" alt="download" />Download sample payment schedule
      </a>
    </div>-->
    <b-form-file v-if="loadingCount===0" v-model="inputVal" plain accept=".xls, .xlsx, .csv"></b-form-file>
    <div class="file-input-background">
      <div class="d-flex flex-column justify-content-center w-100 h-100 pt-3">
        <img src="/assets/images/Cloud-upload.svg" alt />
        <p class="my-1 subtext">
          <span class="green-text">Click to Browse</span> or
        </p>
        <p class="subtext">Drag and drop your xls/csv file</p>
      </div>

      
    </div>
    <template v-if="loadingCount>0">
        <p class=" m3-5 mr-auto mt-3 subtext">Uploading...</p>
        <div class="fileLoading subtext w-100 my-2">
          

          <div class="fileLoading-info  d-flex align-items-center justify-content-start ">
            <img src="/assets/images/file.svg" alt />
            <span class="filename text-start mx-2">{{value.name}}</span>
            <span class="ml-auto">{{loadingCount-20}} of 100%</span>
          </div>
        </div>
        <div class="my-2 row align-items-center">
          <div class="col-11"><b-progress :value="loadingCount" height="5px" variant="success" :max="max" class=""></b-progress></div>
          <div class="col-1"><b-icon @click="deleteFile" class="trash" icon="trash-fill"></b-icon></div>
        </div>
      </template>
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
    max: {
      type: Number,
      default: 100
    },
    deleteFile: {
      type: Function,
      default: () => {}
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

<style  >
.subtext {
  font-size: 14px;
  color: #898989;
}

.subtext .green-text {
  color: #27be58;
  font-size: 14px;
}

.download-img {
  margin-right: 5px;
  width: 10px !important;
  height: 10px !important;
}

.fileLoading {
  /* display: grid;
  grid-template-columns: 30px 1fr 30px;
  grid-gap: 10px;
  align-items: center; */
}

.filename {
  font-weight: 500;
  font-size: 12px;
}

.complete {
  font-size: 14px;
  font-weight: 400;
}
.trash {
  color: #27be58;
  cursor: pointer;
}

.file-input-div .form-control-file {
  height: 200px;
  top: 0;
}
</style>
