<template>
    <div class="pagination" v-if="currentPage <= lastPage">
        <span class="pagination-button" v-if="currentPage > 1" @click.prevent="navigateTo(currentPage-1)">Previous</span>
        <span class="pagination-text">{{from}}-{{to}} of {{total}}</span>
        <span class="pagination-button" v-if="currentPage !== lastPage" @click.prevent="navigateTo(currentPage+1)">Next</span>
    </div>
</template>
<script>
    export default {
        props: {
            'total': Number,
            'currentPage': Number,
            'lastPage': Number,
            'from': Number,
            'to': Number
        },
        methods:{
            navigateTo(page){
                if(page <= 0 || page > this.lastPage){
                    return
                }
                this.$router.replace({
                    query:Object.assign({}, this.$route.query, {page})
                });
                //this.$emit('pagination:to', page);

            }
        }
    }
</script>
