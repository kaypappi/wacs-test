<template>
  <div class="line-break-titles d-flex align-items-center my-3">
          <span class="line"></span>
          <span class="title px-3">{{title}}</span>
          <span class="line"></span>
      </div>
</template>

<script>
export default {
    props:{
        title:String
    }

}
</script>

<style scoped>
.line-break-titles .line{
    flex-grow: 1;
    height: 1px;
    background: #e5e4e4;
}

.title{
    color: #8f8f8f;
    font-size: 16px;
}
</style>