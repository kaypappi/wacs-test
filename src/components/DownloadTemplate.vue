<template>
  <div class="download-template-wrapper pt-5">
    <p class="h5">Download sample deduction schedule</p>
    <p
      class="sub mt-3"
    >Download the sample schedule. Input repayment entries and re-upload below as repayment schedule</p>
    <div class="download-box d-flex mt-5 align-items-center">
      <img src="/assets/images/file.svg" alt />
      <span class="top-label-text ml-3">Sample deduction schedule.xls</span>
      <a class="ml-auto" href="/assets/file/transactional-records-template.xlsx" target="_blank">
        <div class="sample-box py-2 px-3">
          <span class="mr-2">
            <b-icon icon="download"></b-icon>
          </span>
          <span>Download</span>
        </div>
      </a>
    </div>
    <div class="warning mt-3 mb-5">
      <b-icon icon="exclamation-circle"></b-icon>
      <span class="ml-2">Proceed to the next stage if you already have the sample deduction file</span>
    </div>
    <div  :style="{maxWidth:'200px'}" class="d-flex mx-auto ">
        <button @click="next">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    next: Function
  }
};
</script>

<style scoped>
.download-template-wrapper {
  max-width: 550px;
  margin: 0 auto;
}

.sub {
  color: #8f8f8f;
  font-size: 14px;
}

.sample-box {
  border: #32ac59 1px solid;
  background: #27be581c;
  color: #27be58;
  max-width: 200px;
}

button {
  height: 50px;
  width: 100%;
  margin: 0 auto;
  background-color: #27be58;
  border: none;
  color: #ffffff;
  font-size: 20.6px;
  line-height: 24px;
}

.download-box {
  height: 150px;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
}
.warning {
  color: #d4a036;
  font-size: 14px;
}
</style>