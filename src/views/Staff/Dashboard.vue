<template>
  <div class="dashboard-wrapper">
    <div class="summary-card">
      <p class="title">Eligibility Credit Amount</p>
      <div class="h1">
        <span class="h5">₦</span>
        <span>{{user.data.eligibility}}</span>
      </div>
    </div>
    <div class="content">
      <img src="/assets/images/nodata.png" alt class="nodata" />
      <p class="message">Your loan records will appear here</p>
      <div class="btn-holder">
        <button class="request">Request Loan Offer</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
computed:{
    ...mapGetters({
        user:"Auth/user"
    })
}
};
</script>

<style scoped>
.dashboard-wrapper {
  padding: 35px;
}

.summary-card {
  background: #176229;
  background-size: 150px 150px;
  background-repeat: no-repeat;
  color: white;
  display: flex;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
  border-radius: 8px;
  box-shadow: 0 0 12px 0 rgba(188, 188, 188, 0.5);
}

.title {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 21px;
}
.content {
  display: flex;
  flex-direction: column;
}
img.nodata {
  width: 300px;
  margin: 130px auto 16px auto;
}
.btn-holder {
  width: 300px;
  margin: 0 auto;
}
button.request {
  width: 100%;
  border: none;
  background: #27be58;
  color: white;
  padding: 10px;
}
.message {
    color: #A6A6A6;
    font-size: 18px;
    letter-spacing: 0;
    line-height: 30px;
    text-align: center;
    margin-bottom: 30px;
}
</style>