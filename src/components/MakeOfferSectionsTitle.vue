<template>
  <div class="sections-title-wrapper">
    <span v-if="section<steps" class="past-section">
      <b-icon-check-circle-fill />
      <p>{{title}}</p>
    </span>
    <span v-if="section===steps" class="current-section">
      <b-icon-check-circle />
      <p>{{title}}</p>
    </span>
    <span v-if="section>steps" class="next-section">
      <b-icon-circle />
      <p>{{title}}</p>
    </span>
  </div>
</template>

<script>
import {
  BIconCheckCircle,
  BIconCheckCircleFill,
  BIconCircle
} from "bootstrap-vue";
export default {
  props: {
    section: {
      type: Number,
      default: 1
    },
    steps: {
      type: Number,
      default: 1
    },
    title: String
  },
  components: {
    BIconCheckCircle,
    BIconCheckCircleFill,
    BIconCircle
  }
};
</script>

<style >
.sections-title-wrapper p{
    display: inline;
    margin-left: 10px;
    font-weight: 500;
}
.past-section{
    color: #27BE58;
}
.past-section p{
    color: #535353;
}
.current-section{
    color: #27BE58;
}
.next-section {
    color: #8F8F8F;
}
</style>