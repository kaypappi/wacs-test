<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <AppButton :to="{ name: 'about'}" />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import AppButton from "../components/Buttons/AppButton";

export default {
  name: 'home',
  components: {
    HelloWorld,
    AppButton
  }
}
</script>
