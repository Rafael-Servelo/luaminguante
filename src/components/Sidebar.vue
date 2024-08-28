<template>
    <login v-if="!isLogged" :drawer="drawer" />
    <user-logged v-else :drawer="drawer" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Login from "@/components/Login.vue"
import UserLogged from "@/components/UserLogged.vue"
import store from '@/store';

export default defineComponent({
    name: "Sidebar",
    components:{
        Login,
        UserLogged,
    },
    props:{
        drawer: Object as any
    },
    data(){
        return{
            isLogged: computed(()=> store.state.auth.isLogged),
        }
    }
})
</script>

<style scoped>
/** */
</style>