<template>
  <div class="no-data">
      <img src="/assets/images/Empty-State-Icon.svg" alt="" class="empty-file">
      <slot name="title"></slot>
      <slot name="subtitle"></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.no-data{
    display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  align-items: center;
}

.no-data img{
    margin-bottom: 20px;
}

</style>