<template>
  <ol class="step-indicator m-0 p-0">
    <li v-for="step in steps" :key="step.id" is="step-navigation-step" :step="step" :currentstep="currentstep"></li>
  </ol>
</template>

<script>
import StepNavigationStep from  "./StepNavigationStep"
export default {
  props: ["steps", "currentstep"],
  components:{
      StepNavigationStep
  },
  data: function() {
    return {
      indicatorclass: false
    };
  }
};
</script>

<style>
</style>