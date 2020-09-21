<template>
  <div class="Staff-Header d-flex">
    <div class="page-title h3 mr-auto">Home</div>
    <div class="logout ml-auto">
      <span>Logout</span>
      <span class="ml-2">
        <BIconBoxArrowRight />
      </span>
    </div>
  </div>
</template>

<script>
import { BIconBoxArrowRight } from "bootstrap-vue";
export default {
  components: {
    BIconBoxArrowRight
  }
};
</script>

<style scoped>
.Staff-Header {
  align-items: center;
  height: 130px;
  padding: 0 35px;
}
.page-title{
    color: #738191;
}
.logout{
    color: #697686;
}
</style>