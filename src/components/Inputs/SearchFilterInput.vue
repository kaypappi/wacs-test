<template>
    <div class="search-box filter-boxes">
        <form @submit.prevent="onSubmit">
            <input 
                type="text"
                :placeholder="placeholder" 
                :value="value" 
                @input="$emit('input', $event.target.value)" 
            >
            <img src="/assets/images/search-icon.svg" alt="lens" @click="onSearch()">
        </form>
    </div>
</template>

<script>
    export default {
       props: {
           'onSearch': Function,
           'placeholder': String,
           'value': String,
       },
       data() {
           return {
               
           }
       },
        methods: {
            onSubmit() {
                this.onSearch();
            }
        }
    }
</script>
