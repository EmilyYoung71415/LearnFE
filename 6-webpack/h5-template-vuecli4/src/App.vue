<template>
    <div class="demo"></div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {

        }
    },
    mounted() {
        this.$http.get('/api/notice/get/unreadcount')
                  .then(res => console.log(res));
    }
}
</script>