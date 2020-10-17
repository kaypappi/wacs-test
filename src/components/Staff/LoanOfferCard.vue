<template>
  <div class="card-holder">
    <div class="card-left">
      <img :src="loanOffer.company.logo" alt class="company-logo" />
    </div>
    <div class="card-right">
      <p class="offer-title">{{loanOffer.title}}</p>
      <p class="offer-description">{{loanOffer.description}}</p>
      <p class="properties">
        <span class="label">Amount Range: </span>
        <span class="value">{{loanOffer.amount_from}} - {{loanOffer.amount_to}}</span>
      </p>
      <p class="properties">
        <span class="label">Moratorium Period: </span>
        <span
          class="value"
        >{{`${loanOffer.moratorium_period}months | Interest: ${loanOffer.interest_rate}%`}}</span>
      </p>
      <p class="properties d-flex">
        <span class="label">Payback Period: </span>
        <span
          class="value "
        >{{`${loanOffer.payback_period}months`}}</span>
        <span class="ml-auto apply">Apply <b-icon icon="arrow-right"></b-icon></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loanOffer: Object
  }
};
</script>

<style scoped>
.card-holder{
    display: grid;
    grid-template-columns: 1fr 3fr;
    border: 1px solid #DBDBDB;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 30px;
}

.card-left img{
    width: 100%;
}

.card-holder p{
    margin-bottom: 5px;
}

p.offer-title {
    color: #656A72;
    font-size: 20px;
}
.card-right {
    overflow: hidden;
}
.offer-description {
    font-size: 16px;
    color: #959AA2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}
.label {
    color: #656A72;
}
.value {
    color: #959AA2;
}
.apply {
    color: #009831;
}
</style>