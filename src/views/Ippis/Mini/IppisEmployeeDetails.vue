<template>
  <div>
    ippis employee details
<!--     <div v-if="currentItem" class="details-wrapper">
      <template v-for="(value,name,index) in previewDetails">
        <div :key="currentItem.ippis_number + index" class="detail-holder mb-2">
          <p class="detail-title mb-0">{{formatLabel(name)}}</p>
          <p class="detail-body">{{value}}</p>
        </div>
      </template>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      checkingMaster: false
    };
  },
  methods: {
    ...mapActions({
      checkMasterRecords: "IppisMini/checkMasterRecord"
    }),
    async CheckMasterRecords(ippis) {
      this.checkingMaster = true;
      const response = await this.checkMasterRecords(ippis);
      this.checkingMaster = false;
      console.log(response.data)
      return response;
    }
  },
  computed:{
      ...mapGetters({
          masterRecord:"IppisMini/masterRecord"
      }),
      
  },
  mounted(){
      //const ippis=this.$route.params.ippis
     // this.CheckMasterRecords(ippis)
  }
};
</script>

<style>
</style>