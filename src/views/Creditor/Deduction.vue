<template>
  <div class="deduction-wrapper">
    <div class="section-header align-items-center">
      <MakeOfferSectionTitle :section="0" title="Upload" :steps="steps" />
      <b-icon class="arrow-separator" icon="chevron-right"/>
      <MakeOfferSectionTitle :section="1" title="Preview" :steps="steps" />
    </div>

    <div class="deduction-body">
      <keep-alive>
        <component :prev="goToPrev" :next="goToNext" :is="currentTab" class="tab"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import MakeOfferSectionTitle from "../../components/MakeOfferSectionsTitle";
import UploadDeduction from "../../components/UploadDeduction";
import DeductionPreview from "../../components/DeductionPreview";
export default {
  components: {
    MakeOfferSectionTitle,
    UploadDeduction,
    DeductionPreview
  },
  data() {
    return {
      steps: 0,
      tabs: ["UploadDeduction", "DeductionPreview"]
    };
  },
  methods: {
    goToNext() {
      this.steps = this.steps + 1;
    },
    goToPrev() {
      this.steps = this.steps > 0 ? this.steps - 1 : 0;
    }
  },
  computed: {
    currentTab() {
      return this.tabs[this.steps];
    }
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

.deduction-body {
}
</style>