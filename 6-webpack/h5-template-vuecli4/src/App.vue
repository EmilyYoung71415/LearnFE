<template>
    <div class="demo">
        <h1>hello world</h1>
    </div>
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