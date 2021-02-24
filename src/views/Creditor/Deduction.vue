<template>
  <div class="deduction-wrapper">
    <div class="section-header">
      <MakeOfferSectionTitle :section="1" title="Upload" :steps="steps" />
      <span class="arrow-separator">></span>
      <MakeOfferSectionTitle :section="2" title="Preview" :steps="steps" />
      <span class="arrow-separator">></span>
      <MakeOfferSectionTitle :section="3" title="Title & Description" :steps="steps" />
    </div>

    <div class="deduction-body ">
        <UploadDeduction/>
    </div>
  </div>
</template>

<script>
import MakeOfferSectionTitle from "../../components/MakeOfferSectionsTitle";
import UploadDeduction from "../../components/UploadDeduction"
export default {
  components: {
    MakeOfferSectionTitle,
    UploadDeduction
  },
  data() {
    return {
      steps: 1
    };
  }
};
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: center;
  padding: 16px 0;
  border-bottom: 1px solid #e7e7e7;
}
.arrow-separator {
  margin: 0 20px;
}

.deduction-body{
    max-width: 400px;
    margin: 0 auto;
}
</style>