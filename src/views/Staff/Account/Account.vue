<template>
  <div class="account-wrapper">
      <div class="account-head">
          <div class="account-name">
              <span >OM</span>
          </div>
          <div class="account-details">
              <p class="account-name mb-1">Okafor Mustapha</p>
              <p class="numbers mb-1"><span>+234 8145858300</span> | <span>+234 8145858300</span></p>
              <p class="account-email text-break">mustaphadotun@gmail.com</p>
          </div>
      </div>
      <div class="account-body">
          <div class="menu">
              <AccountManagementMenu/>
          </div>
          <div class="account-content">
               <router-view />
          </div>
         
      </div>
  </div>
</template>

<script>
import AccountManagementMenu from "../../../components/Staff/AccountManagementMenu"
export default {
components:{
    AccountManagementMenu
}
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
    margin-bottom: 20px;
}

.account-name{
    align-self: start;
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



.menu >>> ul li {
    list-style-type: none;
    height: 19px;
    color: #7C8D9C;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    padding: 0 42px 28px 42px;
    cursor: pointer;
}

.menu >>> ul li>span {
    padding: 2px;
    border-radius: 50%;
    background-color: #d0e9cc;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    text-align: center;
}

.menu >>> ul {
    height: 52px;
    padding: 22px 30px 0 30px;
    display: flex;
    border-bottom: 1px solid #E7E7E7;
    margin-bottom: 0;
}
.menu >>> .active-loan-menu {
    border-bottom: 4px solid #27BE58;
    margin-bottom: 10px;
    color: #27BE58;
}

.account-content{
    max-width: 600px;
    padding: 50px 0 0 0;
    margin: 0 auto;
}

</style>