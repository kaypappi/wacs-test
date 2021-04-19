<template>
  <div>
    ippis employee details
    <div v-if="currentItem" class="details-wrapper">
      <template v-for="(value,name,index) in previewDetails">
        <div :key="currentItem.ippis_number + index" class="detail-holder mb-2">
          <p class="detail-title mb-0">{{formatLabel(name)}}</p>
          <p class="detail-body">{{value}}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>