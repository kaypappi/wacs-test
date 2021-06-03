<template>
  <li :class="[indicatorclass]">
    <div class="step">
      <span v-if="!(this.currentstep > this.step.id)">{{step.id}}</span><b-icon v-else icon="check"></b-icon>
    </div>
    <div class="caption hidden-xs hidden-sm"> {{ step.title }}</div>
  </li>
</template>

<script>
export default {
  props: ["step", "currentstep"],

  computed: {
    indicatorclass: function() {
      return {
        active: this.step.id == this.currentstep,
        completed: this.currentstep > this.step.id,
      };
    }
  }
};
</script>

<style>
</style>