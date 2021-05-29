<template>
  <div class="stascard-wrapper">
    <div class="stats-top mt-2 d-flex">
      <span :style="{color:'#10852C'}" class="icon mr-2">
        <IconBase  :icon="icon"/>
      </span>
      <span :class="['stats-value']">{{value}}</span>
    </div>
    <div class="stats-title">{{title}}</div>
  </div>
</template>

<script>
import IconBase from "./Icons/IconBase"
export default {
  props: {
    title: String,
    value: Number || String,
    icon: String,
  },
  components:{
    IconBase
  },
  data(){
    return{
     
    }
  }
};
</script>

<style scoped>
.stascard-wrapper {
  padding: 10px 20px;
  border: 1px solid #dee4df;
  border-radius: 6px;
  background-color: #ffffff;
}

.stascard-wrapper .stats-title {
  font-size: 14px;
  font-weight: 400;
  color: #6f6c6c;
}
.stascard-wrapper .stats-value {
  color: #424242;
  font-size: 20px;
  letter-spacing: 0;
  line-height: 25px;
}

.red {
  color: red;
}
.green {
  color: #27be58;
}
.orange {
  color: #f08c14;
}
</style>