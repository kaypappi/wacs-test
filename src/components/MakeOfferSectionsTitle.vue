<template>
  <div class="sections-title-wrapper w-100">
    <!-- <span v-if="section<steps" class="past-section d-flex flex-column align-items-center">
      <b-icon-check-circle-fill />
      <p>{{title}}</p>
    </span>
    <span v-if="section===steps" class="current-section d-flex flex-column align-items-center">
      <b-icon-check-circle />
      <p>{{title}}</p>
    </span>
    <span v-if="section>steps" class="next-section d-flex flex-column align-items-center">
      <b-icon-circle />
      <p>{{title}}</p>
    </span>-->
    <div class="position-relative section-card my-2 mx-auto">
      <div class="progress position-absolute " >
        <div
          class="progress-bar"
          role="progressbar"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
        <!-- <b-progress :value="50" :max="100" class="mb-0" variant="success" height="2rem"></b-progress> -->
      </div>
      <div class="circle-holders d-flex justify-content-between">
        <template v-for="(item,index) in sectionTitles">
          <div :key="item" class="d-flex flex-column align-items-center justify-content-center">
            <b-button
              type="button"
              :class="['translate-middle', 'btn btn-sm', 'rounded-pill',{active:steps===index},steps>(index)?'active':'']"
              :style="{width: '2rem' ,height:'2rem'}"
            >{{index+1}}</b-button>
            <div class="titles">{{item}}</div>
          </div>
        </template>
      </div>
      <!-- <button
        type="button"
        class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill"
        style="width: 2rem; height:2rem;"
      >1</button>
      <button
        type="button"
        class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill"
        style="width: 2rem; height:2rem;"
      >2</button>
      <button
        type="button"
        class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill"
        style="width: 2rem; height:2rem;"
      >3</button>-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    section: {
      type: Number,
      default: 1
    },
    steps: {
      type: Number,
      default: 1
    },
    title: String,
    sectionTitles: Array
  },
  components: {},
  computed: {
    progress() {
      return Math.round(((this.steps + 1) / this.sectionTitles.length) * 100);
    }
  },
  mounted() {
  }
};
</script>

<style >
.sections-title-wrapper p {
  display: inline;
  margin-left: 10px;
  font-weight: 500;
}
.past-section {
  color: #27be58;
}
.past-section p {
  color: #535353;
}
.current-section {
  color: #27be58;
}
.next-section {
  color: #8f8f8f;
}
.section-card {
  width: min(300px, 75%);
}
.progress {
  top: 15px;
  left: 50px;
  right: 50px;
}
.sections-title-wrapper .active {
  border: 1px solid #27be27 !important;
  color: #27be27 !important;
  background-color: white !important;
}

.sections-title-wrapper .visited {
  background-color: #27be27;
  color: white;
}
</style>