<template>
  <div class="notifications-card-wrapper">
    <h6 class="title">New Loan Request</h6>
    <p class="message">You got a new loan Request from Chukwuma Ezikel on Housing Loan Offer</p>
    <p class="timestamp">12.30PM</p>
  </div>
</template>

<script>
export default {};
</script>

<style>
.notifications-card-wrapper {
  max-width: 1000px;
  margin: 0 auto 20px auto;
  background: white;
  box-shadow: -6px 4px 7px -1px rgba(0, 0, 0, 0.4);
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #e8e7e794;
}

.notifications-card-wrapper .title {
  color: #27be58;
  font-weight: 500;
  margin-bottom: 4px;
}
.notifications-card-wrapper .message {
  font-size: 14px;
  margin-bottom: 4px;
}
.notifications-card-wrapper .timestamp {
  font-size: 12px;
  color: #9d9d9d;
  margin-bottom: 4px;
}
</style>