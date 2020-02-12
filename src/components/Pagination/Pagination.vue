<template>
    <div class="pagination">
        <span class="pagination-button" v-if="currentPage > 1" @click="navigate(currentPage-1)">Previous</span>
        <span class="pagination-text">{{from}}-{{to}} of {{total}}</span>
        <span class="pagination-button" v-if="currentPage !== lastPage" @click="navigate(currentPage+1)">Next</span>
    </div>
</template>
<script>
    export default {
        props: {
            'total': Number,
            'currentPage': Number,
            'lastPage': Number,
            'from': Number,
            'to': Number,
            'navigate': Function,
        },
    }
</script>
C