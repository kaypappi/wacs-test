<template>
  <div class="frontpage-wrapper">
    <div class="top-menu">
      <div class="top-menu-right">
        <img src="/assets/images/WACS.png" alt="logo" />
        <p>
          WORKERS AGGREGATED
          CREDIT SCHEME
        </p>
      </div>
      <button>Download App</button>
    </div>
    <div class="hero">
      <div class="hero-content">
        <div class="hero-left">
          <p>
            Easy Loan!
            Easy Life!
          </p>
          <p>
            Workers Aggregated Credit Scheme is an initiative of the
            Federal Government of Nigeria aimed at enabling Federal
            Government civil servants on the IPPIS platform enjoy
            quick and easy access to credit from their mobile phones.
          </p>
          <div class="hero-buttons">
            <button>Download App</button>
            <button>Download App</button>
          </div>
        </div>
        <div class="hero-right">
          <!-- <img src="/assets/images/black-woman.png" alt /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Botton from "../components/Buttons/Botton";
export default {
  components: {
    //Botton
  }
};
</script>

<style>
.frontpage-wrapper{
    padding: 0 100px;
    background: white;
}
.top-menu-right {
  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: center;
  grid-gap: 20px;
  max-width: 330px;
}

.top-menu-right img {
  width: 100%;
}

.top-menu-right p {
  margin-bottom: 0;
  color: #424242;
  font-family: "Work Sans";
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 21px;
}

.top-menu {
  max-width: 1133px;
  display: flex;
  margin: 10px auto 0 auto;
  justify-content: space-between;
  align-items: center;
}

.top-menu button {
  background-color: #27be58;
  color: white;
  padding: 10px 30px;
  height: fit-content;
  outline: none;
  border: none;
}
.hero {
  background: #feefe1;
  background-size: 70% auto;
}
.hero-content{
    /* max-width: 1133px;
    margin: 10px auto 0 auto; */
    display: grid;
    grid-template-columns: 2fr 1fr;
}
.hero-left{
    max-width: 820px;
    padding-right:200px;
    margin-left: auto;
}
.hero-right {
  background: white;
}
</style>