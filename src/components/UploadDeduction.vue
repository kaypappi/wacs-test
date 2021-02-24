<template>
  <div class="upload-deduction-wrapper pt-5">
    <LineBreakTitle title="Step 1" />
    <div class="deduction-sample">
      <div class="sample-box py-2 pl-3">
        <span class="mr-2">
          <b-icon icon="download"></b-icon>
        </span>
        <span>Download sample deduction schedule</span>
      </div>
      <div class="readme-box mt-2">
        <span class="readme">Read Me: </span>
        <span>Download the sample schedule. Input repayment entries and re-upload below as repayment schedule</span>
      </div>
    </div>
    <LineBreakTitle title="Step 2" />
  </div>
</template>

<script>
import LineBreakTitle from "./LineBreakTitle";
export default {
  components: {
    LineBreakTitle
  }
};
</script>

<style scoped>
.sample-box {
  border:#32ac59 1px solid;
  background: #27be581c;
  color: #27be58;
}

.readme-box{
    max-width: 400px;
    color: #8f8f8f;
    font-size: 12px;
}
.readme{
    font-size: 14px;
    font-weight: 600;
}
</style>