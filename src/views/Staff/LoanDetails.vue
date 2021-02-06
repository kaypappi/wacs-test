<template>
  <div class="loandetails-wrapper">
    <template v-if="acceptedOffer">
      <div class="success-box">
        <img src="/assets/images/Success-check-circle.svg" alt class="success-img" />
        <p class="well-done mt-4 text-center h3">Great!</p>
        <p class="info-message text-center">
          You have successfully accepted this loan,
          your loan is now running.
        </p>
        <p class="info-message text-center">
          You will be redirected back to the home page in
          <span class="green-text">{{counter}}</span> seconds
        </p>
      </div>
    </template>
    <template v-else>
      <Toast
        :show="Toast.show"
        :title="Toast.title"
        :message="Toast.message"
        :success="Toast.success"
      />
      <confirmModal :propObject="propObject" />
      <template v-if="loanDetails!==null">
        <template v-for="(item, key, index) in loanDataFormatted.loanData">
          <div :key="`loanData-${index}`" class="info-tile d-flex">
            <span class="info-title mr-auto">{{formatLabel(key)}}</span>
            <span :class="`info-content ml-auto ${item}`">{{item}}</span>
          </div>
        </template>
        <div class="top-text h4">Breakdown</div>
        <template v-for="(item, key, index) in loanDataFormatted.BreakDown">
          <div :key="`breakDown-${index}`" class="info-tile d-flex">
            <span class="info-title mr-auto">{{formatLabel(key)}}</span>
            <span class="info-content ml-auto">{{item}}</span>
          </div>
        </template>

        <div v-if="loanDetails.status==='Bank Approved'" class="buttons">
          <button @click="declineOffer" class="form-modal-button red">Reject</button>
          <button @click="acceptOffer" class="form-modal-button">Accept</button>
        </div>
      </template>
      <img
        src="/assets/images/page-ring-loader.svg"
        alt="loader"
        v-if="fetchingLoanDetails"
        class="page-loader"
      />
    </template>
  </div>
</template>

<script>
import confirmModal from "../../components/Modals/ConfirmModal";
import Toast from "../../components/Toast";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  components: {
    confirmModal,
    Toast
  },
  data() {
    return {
      propObject: {
        promptMessage: "Are you sure you want to reject this loan?",
        onSuccess: false
      },
      Toast: {
        show: false,
        title: "",
        message: "",
        success: true
      },
      counter: 0,
      acceptedOffer: false
    };
  },
  methods: {
    ...mapActions({
      fetchLoanDetails: "UserLoanOffers/fetchLoanDetails",
      acceptLoanOffer: "UserLoanOffers/acceptLoanOffer",
      declineLoanOffer: "UserLoanOffers/declineLoanOffer"
    }),
    acceptOffer() {
      this.acceptLoanOffer(this.$route.params.id)
        .then(() => {
          this.showToast("Success", "Accepted Loan Offer", true);
          this.acceptOffer = true;
          this.startCountdown(10);
        })
        .catch(e => {
          this.showToast("Error", e.response.data.message, false);
        });
    },
    declineOffer() {
      this.declineLoanOffer(this.$route.params.id).then(() => {
        this.showToast(
          "Success",
          "Declined Loan Offer",
          true,
          this.goToDashboard
        );
      });
    },
    formatLabel(sentence) {
      const newSentence = sentence
        .replace(/_/g, " ")
        .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

      return newSentence;
    },
    startCountdown(seconds) {
      this.counter = seconds;

      const interval = setInterval(() => {
        this.counter--;

        if (this.counter === 0) {
          clearInterval(interval);
          this.$router.push({ name: "staffDashboard" });
        }
      }, 1000);
    },
    showToast(title, message, success, goTo) {
      this.Toast = { show: true, title, message, success };
      setTimeout(() => {
        this.Toast.show = false;
        goTo();
      }, 5000);
    },
    goToDashboard() {
      this.$router.push({ name: "staffDashboard" });
    }
  },
  computed: {
    ...mapGetters({
      fetchingLoanDetails: "UserLoanOffers/fetchingLoanDetails",
      acceptingLoanOffer: "UserLoanOffers/acceptingLoanOffer",
      decliningLoanOffer: "UserLoanOffers/decliningLoanOffer",
      loanDetails: "UserLoanOffers/loanDetails"
    }),
    loanDataFormatted() {
      if (this.loanDetails === null) {
        return null;
      }

      const data = {
        loanData: {
          Loan_Status: this.loanDetails.status,
          Date_Requested: moment(this.loanDetails.date).format("Do MMM YYYY")
        },
        BreakDown: {
          Requested_Amount: this.loanDetails.amount,
          Payback_Period: `${this.loanDetails.offer.payback_period}months`,
          First_Payment_Date: `${this.loanDetails.offer.moratorium_period} months later`,
          Interest: `${this.loanDetails.offer.interest_rate}%`
        }
      };
      return data;
    }
  },
  mounted() {
    this.fetchLoanDetails(this.$route.params.id);
  }
};
</script>

<style scoped>
.loandetails-wrapper {
  max-width: 600px;
  margin: 50px auto 0 auto;
}
.info-tile {
  padding: 10px 0;
  border-bottom: #ededed 1px solid;
}
.top-text {
  color: #656a72;
  margin-top: 37px;
}
.info-title {
  color: #656a72;
  font-size: 14px;
}

.info-content {
  color: #656a72;
  font-size: 14px;
  font-weight: 500;
}

.info-content.Pending {
  color: #e47a00;
  background: rgba(228, 122, 0, 0.15);
  padding: 2px 10px;
  border-radius: 2px;
}
.info-content.Declined {
  color: #f50606;
  background: rgba(245, 6, 6, 0.15);
  padding: 2px 10px;
  border-radius: 2px;
}
.info-content.Running {
  color: #0e77e6;
  background: #0e77e626;
  padding: 2px 10px;
  border-radius: 2px;
}

.info-content.Awaiting.IPPIS.Approval {
  color: #e47a00;
  background: rgba(228, 122, 0, 0.15);
  padding: 2px 10px;
  border-radius: 2px;
}

.info-content.Bank.Approved {
  background-color: rgba(14, 119, 230, 0.15);
  color: #0e77e6;
  padding: 2px 10px;
  border-radius: 2px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.buttons button {
  max-width: 280px;
}

.red {
  background: none;
  border: red 1px solid;
  color: red;
}

.info-message {
  color: #606a7a;
  font-size: 14px;
}
.green-text {
  color: #27be58;
  font-size: 16px;
}
.success-box {
  display: grid;
  justify-items: center;
  justify-content: center;
  max-width: 300px;
  margin: 0 auto;
}
</style>