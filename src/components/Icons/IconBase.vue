<template>
  <div
    v-html="require(`../../../public/assets/images/${icon}.svg`)"
    class="inline-block"
    :style="{height, width}"
  />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    height:{
        type:String,
        default:'1em'
    },
    width:{
        type:String,
        default:'1em'
    }
  },
  mounted() {
      
    
    this.$el.firstElementChild.removeAttribute("height");
    this.$el.firstElementChild.removeAttribute("width");
    this.$el.firstElementChild.querySelectorAll("g , circle , line").forEach(item=>{
        item.removeAttribute("fill")
        //item.setAttribute("fill",this.fill)
    })
    this.$el.firstElementChild.classList.add(this.$style.svg);
  }
};
</script>
<style module>
.svg {
  fill: currentColor;
  margin-top: -4px;
  vertical-align: middle;
}
</style>


