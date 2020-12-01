<template>
  <div class="account-help-wrapper">
     <template v-for="(social,index) in socials">
         <div :key="index" class="social">
             <img :src="social.src" alt="" class="social-img">
             <p class="social-name mb-0">{{social.name}}</p>
             <span class="arrow-right ml-auto"><b-icon icon="arrow-right-circle"></b-icon></span>
         </div>
     </template>
  </div>
</template>

<script>
export default {
data(){
    return{
        socials:[
            {name:"Facebook" , src:"/assets/images/facebook.svg"},
            {name:"Twitter" , src:"/assets/images/twitter.svg"},
            {name:"Instagram" , src:"/assets/images/instagram.svg"},
            {name:"Email" , src:"/assets/images/email.svg"},
            {name:"LiveChat" , src:"/assets/images/live-chat.svg"},

        ]
    }
}
}
</script>

<style scoped>
.social{
    display:flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #DBDBDB;

}
.social-img{
    width: 50px;
    margin-right: 20px;
}




</style>