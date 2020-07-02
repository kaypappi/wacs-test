<template>
   <div class="noifications-wrapper">
       <NotificationsCard/>
       <NotificationsCard/>
       <NotificationsCard/>
       <NotificationsCard/>
       <NotificationsCard/>
       <NotificationsCard/>
       <NotificationsCard/>
   </div>
</template>

<script>
import NotificationsCard from "../components/NotificationsCard"
export default {
components:{
   NotificationsCard
}
}
</script>

<style>
.noifications-wrapper{
   padding: 20px;
}
</style>