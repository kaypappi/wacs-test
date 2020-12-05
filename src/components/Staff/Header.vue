<template>
  <div class="Staff-Header d-flex">
    <div class="page-title h3 mr-auto">
      <div class="top-title">
        {{details.title}}
      </div>
      <div v-if="details.parents" class="parent-links"><span
        v-for="(parent, index) in details.parents"
        :key="index"
        @click="goBack(parent.name)"
        class="back-link h6"
      >{{parent.title}} </span>
      <span class="h6">/{{details.title}}</span></div>
    </div>
    <div v-b-toggle.sidebar-right class="right-header h3 ml-auto">
      <b-icon icon="bell"></b-icon>
      <span class="red-dot"></span>
    </div>
    
  </div>
</template>

<script>
import {EventBus} from "../../event"
export default {
  props:{
    details:Object,
  },
  components: {
   
  },
  data(){
    
  },
  methods: {
    goBack(name) {
      this.$router.push({name});
    },
    openNotifications(){
      EventBus.$emit('open-notifications',true)
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
.back-link{
  color: #27be58;
  cursor: pointer;
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