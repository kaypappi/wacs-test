<template>
  <div class="complete-creation-wrapper">
    <template v-if="!created_account">
      <div class="top-text h3 text-center">Your Details</div>
      <template v-for="(item, key, index) in userFullData">
        <div :key="index" class="info-tile d-flex">
          <span class="info-title mr-auto">{{formatLabel(key)}}</span>
          <span class="info-content ml-auto">{{item}}</span>
        </div>
      </template>
      <div @click="submit">
        <SubmitButton
          :isLoading="completingAccountCreation"
          name="Create Account"
          buttonClass="submit-btn"
        />
      </div>
    </template>
    <template v-else>
      <div class="success-box">
        <img src="/assets/images/create-account-success.png" alt class="success-img" />
        <p class="well-done h3">Well Done!</p>
        <p class="info-content">You have successfully created a WACS account</p>
        <p class="info-content">
          You will be redirected in
          <span class="green-text">{{counter}}</span> seconds
        </p>
      </div>
      <!-- <div @click="goToDashboard" class="finish-btn-holder">
        <SubmitButton name="Create Account" buttonClass="finish-btn" />
      </div>-->
    </template>
  </div>
</template>

<script>
import SubmitButton from "../../../../components/Buttons/SubmitButton";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    SubmitButton
  },
  data() {
    return {
      user_info: {
        Full_name: "Okafor Mustapha Dotun",
        Ippis_number: "0124440",
        BVN: 3210450477,
        Mobile_number: "08145858300",
        Gender: "Male",
        Parastatal: "Ministry of Education",
        Email_id: "mustaphadotun@gmail.com",
        Marital_Status: "Married",
        Religion: "None",
        State_of_Origin: "Kogi",
        Nationality: "Nigerian",
        Address: "3, Ogunshipe Crescent,Obalende,Lagos"
      },
      created_account: false,
      counter: 0
    };
  },
  methods: {
    ...mapActions({
      completeAccountCreation: "UserAuth/CompleteAccountCreation"
    }),
    goToDashboard() {
      this.$router.push({ name: "staffDashboard" });
    },
    async submit() {
      const form = {
        ippis_number: this.userShortData.ippis_number,
        password: this.userShortData.password
      };
      await this.completeAccountCreation(form);
      this.created_account = true;
      this.startCountdown(10);
    },
    startCountdown(seconds) {
      this.counter = seconds;

      const interval = setInterval(() => {
        this.counter--;

        if (this.counter === 0) {
          clearInterval(interval);
          this.goToDashboard();
        }
      }, 1000);
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
      userFullData: "UserAuth/userFullData",
      userShortData: "UserAuth/userShortData",
      completingAccountCreation: "UserAuth/completingAccountCreation"
    })
  }
};
</script>

<style scoped>
.info-tile {
  padding: 10px 0;
  border-bottom: #ededed 1px solid;
}
.top-text {
  color: #8ea3b0;
  margin-bottom: 54px;
}
.info-title {
  color: #bfbfbf;
  font-size: 14px;
}

.info-content {
  color: #606a7a;
  font-size: 14px;
}

.submit-btn {
  border: none;
  background: #27be58;
  color: white;
  width: 100%;
  padding: 10px;
  height: 50px;
  margin-top: 20px;
}
.finish-btn-holder {
  max-width: 350px;
  margin: 0 auto;
}

.finish-btn {
  border: none;
  background: #27be58;
  color: white;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  padding: 10px;
  margin-top: 30px;
}

.success-box {
  display: grid;
  justify-items: center;
  justify-content: center;
}

.well-done {
  color: #606a7a;
  margin-top: 24px;
}

.green-text {
  color: #27be58;
  font-size: 16px;
}
</style>