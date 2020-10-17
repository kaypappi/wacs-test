<template>
  <div class="Staff-Header d-flex">
    <div class="page-title h3 mr-auto">
      <span
        v-for="(parent, index) in details.parents"
        :key="index"
        @click="goBack((details.parents.length - index)*-1)"
        class="back-link"
      >{{parent}} /</span>
      <span>{{details.title}}</span>
    </div>
    <div class="right-header h3 ml-auto">
      <b-icon icon="bell"></b-icon>
      <span class="red-dot"></span>
    </div>
  </div>
</template>

<script>
//import { BIconBoxArrowRight } from "bootstrap-vue";
export default {
  props:{
    details:Object
  },
  components: {
    //BIconBoxArrowRight
  },
  methods: {
    goBack(times) {
      this.$router.go(times);
    }
  }
};
</script>

<style scoped>
.Staff-Header {
  align-items: center;
  height: 130px;
}
.page-title {
  color: #738191;
}
.right-header {
  position: relative;
  color: #697686;
  cursor: pointer;
}

.red-dot {
  width: 10px;
  height: 10px;
  border-radius: 50px;
  background: red;
  border: 2px solid white;
  position: absolute;
  top: 3px;
  right: 3px;
}
</style>