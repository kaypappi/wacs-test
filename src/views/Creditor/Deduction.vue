<template>
  <div class="deduction-wrapper">
    <div class="section-header position-relative align-items-center">
      <step-navigation v-if="currentstep<3" :steps="Steps" :currentstep="currentstep"></step-navigation>
      <!-- <div class="progress-divider"></div>
      <MakeOfferSectionTitle :section="1" title="Preview" :steps="steps" />-->
    </div>

    <div class="deduction-body">
      <keep-alive>
        <component :prev="goToPrev" :next="goToNext" :is="currentTab" class="tab"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import UploadDeduction from "../../components/UploadDeduction";
import DeductionPreview from "../../components/DeductionPreview";
import StepNavigation from "../../components/Wizard/StepNavigation";
import DownloadTemplate from "../../components/DownloadTemplate";
import UploadComplete from "../../components/UploadComplete";
export default {
  components: {
    UploadDeduction,
    DeductionPreview,
    StepNavigation,
    DownloadTemplate,
    UploadComplete
  },
  data() {
    return {
      steps: 0,
      tabs: ["DownloadTemplate", "UploadDeduction", "UploadComplete"],
      sectionTitles: ["Download", "Upload"],
      currentstep: 1,
      indicatorclass: true,
      step: 1,
      active: 1,
      firststep: true,
      nextStep: "",
      lastStep: "",
      laststep: false,
      Steps: [
        {
          id: 1,
          title: "Download",
          icon_class: "fa fa-map-marker"
        },
        {
          id: 2,
          title: "Upload",
          icon_class: "fa fa-folder-open"
        }
      ]
    };
  },
  methods: {
    goToNext() {
      this.currentstep = this.currentstep + 1;
    },
    goToPrev() {
      this.currentstep = this.currentstep > 0 ? this.currentstep - 1 : 0;
    }
  },
  computed: {
    currentTab() {
      return this.tabs[this.currentstep - 1];
    }
  }
};
</script>

<style lang="scss" >
$wizard-color-neutral: #ccc !default;
$wizard-color-active: #27be58 !default;
$wizard-color-complete: #27be58 !default;
$wizard-step-width-height: 30px !default;
$wizard-step-font-size: 14px !default;
.section-header {
  display: flex;
  justify-content: center;
  padding: 16px 0;
}
.arrow-separator {
  margin: 0 20px;
}

.deduction-body {
}

.step-wrapper {
  padding: 20px 0;
  display: none;

  &.active {
    display: block;
  }
}

.step-indicator {
  border-collapse: separate;
  display: table;
  margin-left: 0px;
  position: relative;
  min-width: 40%;
  max-width: 800px;
  table-layout: fixed;
  text-align: center;
  vertical-align: middle;
  padding-left: 0;
  padding-top: 20px;

  li {
    display: table-cell;
    position: relative;
    float: none;
    padding: 0;
    width: 1%;

    &:after {
      background-color: $wizard-color-neutral;
      content: "";
      display: block;
      height: 1px;
      position: absolute;
      width: 100%;
      top: $wizard-step-width-height/2;
    }

    &:after {
      left: 50%;
    }

    &:last-child {
      &:after {
        display: none;
      }
    }

    &.active {
      .step {
        border-color: $wizard-color-active;
        color: $wizard-color-active;
      }

      .caption {
        color: $wizard-color-active;
      }
    }

    &.completed {
      &:after {
        background-color: $wizard-color-complete;
      }

      .step {
        background-color: $wizard-color-complete;
        color: white;
        border-color: $wizard-color-complete;
      }

      .caption {
        color: $wizard-color-complete;
      }
    }
  }

  .step {
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid $wizard-color-neutral;
    color: $wizard-color-neutral;
    font-size: $wizard-step-font-size;
    height: $wizard-step-width-height;
    line-height: $wizard-step-width-height;
    margin: 0 auto;
    position: relative;
    width: $wizard-step-width-height;
    z-index: 1;

    &:hover {
      cursor: pointer;
    }
  }

  .caption {
    color: $wizard-color-neutral;
    padding: 5px 16px;
  }
}
</style>