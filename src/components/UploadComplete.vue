<template>
  <div class="upload-complete-wrapper d-flex flex-column align-items-center pt-5 mx-auto">
    <b-icon style="width: 80px; height:80px; color:#27be58" icon="check-circle-fill"></b-icon>
    <p class="h5 mt-3">File upload successful!</p>
    <p
      class="sub mt-1 text-center"
    >You have succesfully uploaded your deduction schedule</p>
    <div  :style="{width:'200px'}" class="d-flex mx-auto ">
        <button @click="$router.push({name:'deductionPreview',params:{id:batch.data.batch_id}})" >view details</button>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        batch:Array||Object
    },
};
</script>

<style scoped>
.upload-complete-wrapper {
  max-width: 300px;

}

button {
  height: 50px;
  width: 100%;
  margin: 0 auto;
  background-color: #27be58;
  border: none;
  color: #ffffff;
  font-size: 20.6px;
  line-height: 24px;
}

.sub {
  color: #8f8f8f;
  font-size: 14px;
}
</style>