<template>
  <div>
    deduction details
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
      checkingDeductions: false
    };
  },
  methods: {
    ...mapActions({
      checkTransactionalRecord: "IppisMini/checkTransactionalRecord"
    }),
    async CheckTransactionalRecords(ippis) {
      this.checkingDeductions = true;
      const response = await this.checkTransactionalRecord(ippis);
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
      singleTransactionalRecords: "IppisMini/singleTransactionalRecords"
    }),
    details() {
      if (this.singleTransactionalRecords) {
        const Item = this.singleTransactionalRecords.data.data;
        const reject = ["created_at", "updated_at"];
        const filtered = Object.keys(Item)
          .filter(key => !reject.includes(key))
          .reduce((obj, key) => ({ ...obj, [key]: Item[key] }), {});
        return filtered;
      }
      return null
    }
  },
  mounted() {
    const ippis = this.$route.params.ippis;
    this.CheckTransactionalRecords(ippis);
  }
};
</script>

<style>
</style>