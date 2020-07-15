<template>
  <div class="faq-holder">
    <div class="faq-question">
      <p class="faq-text"><slot name="question"></slot></p>
      <span @click="toggleAnswer">
        <b-icon-plus v-if="!answerOpen" />
        <b-icon-x v-else/>
      </span>
    </div>
    <div v-if="answerOpen" class="faq-answer">
      <slot name="answer"></slot>
    </div>
  </div>
</template>

<script>
import { BIconPlus, BIconX } from "bootstrap-vue";
export default {
  components: {
    BIconPlus,
    BIconX
  },
  data() {
    return {
      answerOpen: false
    };
  },
  methods: {
    toggleAnswer() {
      this.answerOpen = !this.answerOpen;
    }
  }
};
</script>

<style >
.section-4 .faq-holder {
  width: 100%;
  border-top: 1px solid #d0d0d0;
  border-bottom: 1px solid #d0d0d0;
  font-size: 24px;
  color: #656a72;
  padding: 10px 10px 10px 40px;
}

.faq-holder .faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}

.faq-holder .faq-text {
  margin: 0;
  font-family: "Work Sans";
  color: #656A72;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 55px;
}

.faq-holder span {
  font-weight: 600;
  font-size: 50px;
}

.faq-holder .faq-answer {
  color: #656a72;
  font-family: "Work Sans";
  font-size: 18px;
  letter-spacing: 0;
}
</style>