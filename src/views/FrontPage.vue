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
          <div class="left-content">
            <p class="bold-text">
              Easy Loan!
              Easy Life!
            </p>
            <p class="description">
              Workers Aggregated Credit Scheme is an initiative of the
              Federal Government of Nigeria aimed at enabling Federal
              Government civil servants on the IPPIS platform enjoy
              quick and easy access to credit from their mobile phones.
            </p>
            <div class="hero-buttons">
              <img src="/assets/images/googleplay.png" alt="logo" />
              <button>Learn More</button>
            </div>
          </div>
        </div>
        <div class="hero-right">
          <img src="/assets/images/black-woman.png" alt />
        </div>
      </div>
    </div>
    <div class="drag-divider">
      <b-icon-arrow-down-circle />
    </div>
    <div class="section-2">
      <p class="title">
        Don't Let Financial Worries Get
        In The Way Of Your Plans!
      </p>
      <div class="content">
        <div class="content-left">
          <img src="/assets/images/phone.png" alt />
        </div>
        <div class="content-right">
          <div class="info-wrapper">
            <img src="/assets/images/time.PNG" alt class="info-img" />
            <div class="info-content">
              <p class="info-title">Apply in minutes</p>
              <p class="info-body">
                All it takes is a few minutes to apply for your loan.
                It is fast and easy, whether you apply online
                or directly from the mobile app.
              </p>
            </div>
          </div>
          <div class="info-wrapper">
            <img src="/assets/images/gear.PNG" alt class="info-img" />
            <div class="info-content">
              <p class="info-title">Clear, competitive interest rates</p>
              <p class="info-body">
                Take advantage of the competitive interest rates
                and flexible terms from various lenders.
              </p>
            </div>
          </div>
          <div class="info-wrapper">
            <img src="
            /assets/images/book.PNG" alt class="info-img" />
            <div class="info-content">
              <p class="info-title">Tailored terms</p>
              <p class="info-body">
                Choose the loan amount and term that fit your
                personal or business needs.
              </p>
            </div>
          </div>
          <div class="info-wrapper">
            <img src="/assets/images/wallet.PNG" alt class="info-img" />
            <div class="info-content">
              <p class="info-title">Hassle-free repayment</p>
              <p class="info-body">
                Loan repayments will be made automatically deducted
                from your after tax salary. This eliminates the need
                to worry about making payments on time.
              </p>
            </div>
          </div>
          <div class="info-wrapper">
            <img src="/assets/images/divide.PNG" alt class="info-img" />
            <div class="info-content">
              <p class="info-title">Processing Fee</p>
              <p class="info-body">
                There is a processing fee charge on the loan amount.
                All charges are stated as terms of the loan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section-3">
      <p class="title">Loan Application Is Easy And Fast</p>
      <div class="steps-holder">
        <div class="step1">
          <div class="background">01</div>
          <div class="content">
            <p class="title">Sign Up</p>
            <p class="body">
              Download the mobile app & sign
              up using your IPPIS Number
              and other personal details.
            </p>
          </div>
        </div>
        <div class="step2">
          <div class="background">02</div>
          <div class="content">
            <p class="title">Request Loan</p>
            <p class="body">
              Click on “Request Loan” and fill
              in loan details of your choice.
            </p>
          </div>
        </div>
        <div class="step3">
          <div class="background">03</div>
          <div class="content">
            <p class="title">Get Offer</p>
            <p class="body">
              Click on the “Get Offer” for
              loan of interest and an offer
              will be sent to you.
            </p>
          </div>
        </div>
        <div class="step4">
          <div class="background">04</div>
          <div class="content">
            <p class="title">Get Loan</p>
            <p class="body">
              Accept Offer and Terms of loan
              Get your funds if approved within 24hrs.
            </p>
          </div>
        </div>
      </div>
      
    </div>
    <div class="skewd-div">

      </div>
  </div>
</template>

<script>
//import Botton from "../components/Buttons/Botton";
import { BIconArrowDownCircle } from "bootstrap-vue";
export default {
  components: {
    //Botton,
    BIconArrowDownCircle
  }
};
</script>

<style>
.frontpage-wrapper {
  padding: 0 100px;
  background: white;
  position: relative;
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
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
  background: url("/assets/images/peach.png");
  background-size: 500px 100%;
  background-repeat: no-repeat;
}
.hero-content {
  max-width: 1133px;
  margin: 10px auto 0 auto;

  display: grid;
  grid-template-columns: 1fr 300px;
}
.hero-left {
  background: #feefe1;
}
.hero-left .bold-text {
  color: #656a72;
  font-size: 100px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 130px;
}
.hero-left .description {
  max-width: 670px;
  color: #656a72;
  font-family: "Work Sans";
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 35px;
}
.hero-left .left-content {
  max-width: 90%;
  padding-top: 200px;
  padding-bottom: 116px;
}
.hero-right {
  background: white;
  position: relative;
}
.hero-right img {
  width: calc(100% + 140px);
  height: 740px;
  margin-top: 200px;
  position: absolute;
  left: -140px;
  /* margin-left: -140px; */
}
.hero-buttons {
  display: flex;
  margin-top: 46px;
}
.hero-buttons img {
  width: 250px;
  height: 75px;
  border-radius: 5px;
}
.hero-buttons button {
  width: 250px;
  height: 75px;
  border: 1.5px solid #27be58;
  margin-left: 35px;
  background: transparent;
  color: #27be58;
  font-size: 20px;
  font-weight: 500;
}
.frontpage-wrapper .drag-divider {
  margin-top: 80px;
  margin-bottom: 178px;
  text-align: center;
  font-size: 50px;
  color: #979797;
}

.section-2 {
  max-width: 1133px;
  margin: 0 auto 280px;
}

.section-2 .title {
  color: #656a72;
  max-width: 630px;
  margin: 0 auto;
  margin-bottom: 150px;
  font-size: 40px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 55px;
  text-align: center;
}

.section-2 .content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 40px;
}

.section-2 .content-left {
  padding: 20px;
  border-radius: 4px;
  background-color: #303030;
}

.content .info-wrapper {
  display: grid;
  grid-template-columns: 80px 510px;
  grid-gap: 20px;
  margin-bottom: 20px;
}

.info-wrapper .info-title {
  color: #656a72;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 55px;
  margin-bottom: 5px;
}

.info-wrapper .info-body {
  color: #656a72;
  font-size: 20px;
  letter-spacing: 0;
  line-height: 35px;
  margin-bottom: 5px;
}

.info-wrapper img {
  width: 100%;
}

.section-3 {
  background-color: #0a554c;
  padding-top: 120px;
  padding-bottom: 200px;
}

.section-3 > .title {
  max-width: 720px;
  padding: 0 20px;
  text-align: center;
  margin: 0 auto;
  color: #ffffff;
  font-family: "Work Sans";
  font-size: 40px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 55px;
}

.section-3 .steps-holder {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1133px;
  margin: 100px auto 0;
}

.steps-holder .step1 {
  position: relative;
  height: 250px;
  border-right: 0.5px solid rgba(188, 188, 188, 0.5);
  border-bottom: 0.5px solid rgba(188, 188, 188, 0.5);
}
.steps-holder .step2 {
  position: relative;
  height: 250px;
  border-left: 0.5px solid rgba(188, 188, 188, 0.5);
  border-bottom: 0.5px solid rgba(188, 188, 188, 0.5);
}
.steps-holder .step3 {
  position: relative;
  height: 250px;
  border-right: 0.5px solid rgba(188, 188, 188, 0.5);
  border-top: 0.5px solid rgba(188, 188, 188, 0.5);
}
.steps-holder .step4 {
  position: relative;
  height: 250px;
  border-left: 0.5px solid rgba(188, 188, 188, 0.5);
  border-top: 0.5px solid rgba(188, 188, 188, 0.5);
}
.steps-holder .background {
  color: #278276;
  font-family: "Work Sans";
  font-size: 150px;
  font-weight: 800;
  letter-spacing: 0;
  line-height: 55px;
  position: absolute;
  top: 75px;
}

.step2 .background,
.step4 .background {
  left: 75px;
}

.steps-holder .content {
  position: relative;
  z-index: 1;
}
.steps-holder .content .title{
    margin-bottom: 0;
}
.step1 .content,
.step3 .content {
  margin-left: 120px;
  margin-top: 50px;
}
.step2 .content,
.step4 .content {
  margin-left: 200px;
  margin-top: 50px;
}
.steps-holder .title {
  color: #ffffff;
  font-family: "Work Sans";
  font-size: 30px;
  font-weight: 600;
  max-width: 400px;
  letter-spacing: 0;
  line-height: 55px;
}

.steps-holder .body {
  color: #ffffff;
  font-family: "Work Sans";
  font-size: 20px;
  max-width: 400px;
  letter-spacing: 0;
  line-height: 35px;
}
.skewd-div{
    width: 100%;
    height: 200px;
    margin-top: -100px;
    background:#0a554c;
    transform: skewY(5deg);
}
</style>