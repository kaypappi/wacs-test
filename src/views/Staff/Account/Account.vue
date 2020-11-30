<template>
  <div class="account-wrapper">
      <div class="account-head">
          <div class="account-name">
              <span >OM</span>
          </div>
          <div class="account-details">
              <p class="account-name">Okafor Mustapha</p>
              <p class="numbers"><span>+234 8145858300</span> | <span>+234 8145858300</span></p>
              <p class="account-email">mustaphadotun@gmail.com</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.account-head{
    display: grid;
    grid-template-columns: 90px 1fr;
    padding: 20px 30px;
    grid-gap: 30px;
    border: 1px solid #DBDBDB;
    border-radius: 8px;
    align-items: center;
}

.account-head .account-name span{
    width: 100%;
    height:90px;
    background: #27BE58;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: 500;
    color: white;
}

.account-head p{
    color: #606A7A;
    font-size: 18px;
}
</style>