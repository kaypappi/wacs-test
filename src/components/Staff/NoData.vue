<template>
  <div class="no-data-wrapper">
    <img src="/assets/images/nodata.png" alt class="nodata" />
    <p class="message"><slot name="message"></slot></p>
    <div class="btn-holder">
        <button @click="onclick" class="request"><slot name="button"></slot></button>
     
    </div>
  </div>
</template>

<script>
export default {
    props:{
        onclick:Function
    }
};
</script>

<style scoped>
.no-data-wrapper {
    width: 100%;
    display: grid;
    margin-top: 130px;
}
img.nodata {
  width: 300px;
  margin: 0 auto;
}
.btn-holder {
  width: 300px;
  margin: 0 auto;
}
button.request {
  width: inherit;
  border: none;
  background: #27be58;
  color: white;
  padding: 10px;
  font-weight: 500;
  position: absolute;
}
.message {
  color: #a6a6a6;
  font-size: 18px;
  letter-spacing: 0;
  line-height: 30px;
  text-align: center;
  margin-bottom: 30px;
}
</style>