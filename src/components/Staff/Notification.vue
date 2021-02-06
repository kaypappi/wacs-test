<template>
  <div class="notification-wrapper">
    <div class="overlay"></div>
    <div class="header d-flex align-items-center p-4">
      <h4>Notification</h4>
      <p class="clear-all ml-auto">Clear all</p>
    </div>
    <div class="notification-body px-4">
      <div class="time-separator d-flex py-4">
        <span>Today</span>
        <span class="ml-auto">
          <b-icon icon="x-circle-fill"></b-icon>
        </span>
      </div>
      <NotificationCard/>
      <NotificationCard/>
      <NotificationCard/>
      <div class="time-separator d-flex py-4">
        <span>Yesterday</span>
        <span class="ml-auto">
          <b-icon icon="x-circle-fill"></b-icon>
        </span>
      </div>
      <NotificationCard/>
      <NotificationCard/>
      <NotificationCard/>
    </div>
  </div>
</template>

<script>
import NotificationCard from "./NotificationCard";
export default {
  components: {
    NotificationCard
  }
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #e1e1e1;
}
.header h4{
    color: #656A72;
}
.clear-all{
    color: #27BE58;
}
.time-separator{
    color: #656A72;
}
</style>