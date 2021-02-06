<template>
  <div class="loan-request-success-wrapper">
    <div class="success-box">
      <img src="/assets/images/money-bag.png" alt class="success-img" />
      <p class="well-done h3">Well Done!</p>
      <p
        class="info-content"
      >Your loan application has been received and a review of your application is currently in progress. You will be notified in 48hours on the status of your loan.</p>
      <div class="buttons">
        <button @click="$router.push({name:'StaffLoanOffers'})"  class="form-modal-button mx-auto">More Loan Offers</button>
        <button @click="$router.push({name:'staffDashboard'})" class="form-modal-button clear mx-auto">Back To Home</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.success-box {
  display: grid;
  justify-items: center;
  justify-content: center;
  max-width: 500px;
  margin: 0 auto;
}

.well-done {
  color: #606a7a;
  margin-top: 24px;
}

.info-content {
  color: #606a7a;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
}
.buttons{
    width: 100%;
    display:grid
}
.clear{
    background: none;
    border: 1px solid #27be58;
    color: #27be58;
}
</style>