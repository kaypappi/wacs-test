<template>
  <div class="staffmain">
    <div class="left">
      <img
        src="/assets/images/WACS.png"
        class="logo"
        alt="WACS logo"
      />
      <div class="divider"></div>
      <LeftMenuItems />
    </div>
    <div class="right">
      <Header
        
      />
      <div class="main-body">
        <!-- <LoanManagementMenu v-if="!$route.meta.parents && currentNameSpace === 'loan'" /> -->
        <div class="main-body-content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../Staff/Header"
import LeftMenuItems from "../Staff/LeftMenuItems"
export default {
    components:{
        Header,
        LeftMenuItems
    }
};
</script>

<style scoped>
.staffmain {
    grid-template-columns: 270px 1fr;
    display: grid;
    height: 100vh;
    
}

.left{
    border-right: 1.5px solid #EAEAEA;
}

.left img{
    width: 70px;
    height: 70px;
    margin: 30px auto;
    display: flex;
}

.divider{
    height: 1.5px;
    width: 90%;
    margin: 0 auto;
    background: #EAEAEA;
}
</style>