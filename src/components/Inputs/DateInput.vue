<template>
  <div class="date-input-wrapper">
    <div id="popover-3" class="date-input-box d-flex justify-content-between align-items-center">
      <b-input-group class="input-left">
        <b-input-group-prepend is-text>
          <b-icon icon="calendar2-date"></b-icon>
        </b-input-group-prepend>
        <b-form-input size="sm" v-model="calendarData.dateRange.start" type="text" placeholder="Start Date"></b-form-input>
      </b-input-group>
      <span class="separator">|</span>
      <b-input-group class="input-right">
        <b-form-input size="sm" v-model="calendarData.dateRange.end" type="text" placeholder="End Date"></b-form-input>
        <b-input-group-prepend @click.stop="clearInput" is-text>
          <b-icon icon="x"></b-icon>
        </b-input-group-prepend>
      </b-input-group>
    </div>
    <b-popover
      target="popover-3"
      triggers="focus"
      placement="bottomleft"
      custom-class="date-popover p-0"
      boundary-padding="1px"
      boundary="#popover-3"
    >
      <FunctionalCalendar v-model="calendarData" :configs="calendarConfigs">
        <template slot="footer">
          <div>
            <b-button @click="clearInput" class="clear-button  px-4 mr-4">Clear</b-button>
            <b-button class="a-button  px-4">Apply</b-button>
          </div>
        </template>
      </FunctionalCalendar>
    </b-popover>
  </div>
</template>

<script>
import { FunctionalCalendar } from "vue-functional-calendar";
export default {
  components: {
    FunctionalCalendar
  },
  data() {
    return {
      calendarData: {
        dateRange: {
          start: "",
          end: ""
        }
      },
      calendarConfigs: {
        sundayStart: false,
        dateFormat: "dd/mm/yyyy",
        isDateRange: true,
        isModal: false,
        isTypeable: true,
        isSeparately: true,
        isMultiple: true,
        calendarsCount: "2",
        dayNames:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    };
  },
  methods: {
    clearInput() {
      this.calendarData.dateRange = {
        start: "",
        end: ""
      };
    }
  },
};
</script>

<style scoped>
.popover {
  max-width: 100%;
  border: none;
}
.popover >>> .popover-body {
  width: 100%;
  padding: 0px !important;
  box-shadow: 0 2px 15px 0 rgba(214, 214, 214, 0.5);
  border: none;
  position: relative;
}
span {
  color: #c2c2c2;
}
.input-left,
.input-right {
  border: none;
  outline: none;
  width: 49%;
}

.date-input-box {
  border: 1px solid #D8DED9;
  border-radius: 4px;
  background-color: #ffffff;
  max-width: 250px;
}
.date-input-box:target {
  border: 1px solid #47b19e;
}

.date-input-wrapper >>> .input-group-text {
  background-color: transparent;
  border: none;
  padding: 5px;
  font-size: 14px;
  color: #30c7ad;
  cursor: pointer;
}

.date-input-box >>> .form-control {
  border: none;
  padding: 0rem 0.15rem;
  outline: none;
}

.date-input-box >>> .form-control:focus {
  box-shadow: none;
}

.date-input-box >>> .form-control::placeholder {
  color: #bfc3c2;
}

.date-input-box >>> .input-right .form-control::placeholder {
  text-align: end;
}

.popover >>> .vfc-main-container {
  font-family: "Work Sans";
}

.popover >>>  .vfc-top-date.vfc-center{
  font-size: 1rem;
}

.popover >>> .vfc-arrow-left,.popover>>> .vfc-arrow-right{
width: 8px;
height: 8px;
border-color: #515653;
}

.popover >>> .vfc-dayNames span{
  font-size: 0.8rem;
}
.clear-button {
  border: 1px solid #baded8;
  border-radius: 2px;
  background-color: #ffffff;
  color: #baded8;
  font-size: 0.8rem;
}
.a-button {
  border-radius: 2px;
  background-color: #1c9e87;
  border: 1px solid #1c9e87;
  font-size: 0.8rem;
}
</style>