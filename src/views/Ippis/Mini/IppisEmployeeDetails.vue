<template>
  <div class="p-4">
    <div v-if="details" class="details-wrapper">
      <template v-for="(value,name,index) in details">
        <div :key="name + index" class="detail-holder mb-2">
          <p class="detail-title mb-0">{{formatLabel(name)}}</p>
          <p class="detail-body">{{value}}</p>
        </div>
      </template>
    </div>
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
      return response;
    },
    formatLabel(sentence) {
      const newSentence = sentence
        .replace(/_/g, " ")
        .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

      return newSentence;
    }
  },
  computed: {
    ...mapGetters({
      masterRecord: "IppisMini/masterRecord"
    }),
    details() {
      if (this.masterRecord) {
        const Item = this.masterRecord.data.data[0];
        const reject = ["created_at", "updated_at", "id"];
        const filtered = Object.keys(Item)
          .filter(key => !reject.includes(key))
          .reduce((obj, key) => ({ ...obj, [key]: Item[key] }), {});
        return filtered;
      }
      return null;
    }
  },
  mounted() {
    const ippis = this.$route.params.ippis;
    this.CheckMasterRecords(ippis);
  }
};
</script>

<style>
</style>