<template>
    <div class="loading-container">
        <v-progress-circular indeterminate :size="$vuetify.display.height * 40 / 100" :width="$vuetify.display.width / 100 * .6" color="var(--color-secondary)">
            <span class="loading-desc">Carregando</span>
        </v-progress-circular>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "Loading"
})
</script>

<style scoped>

.loading-container{
    z-index: 5000;
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color: #000000bb;
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-header)
}

.loading-desc{
    font-size: 5vh;
}

.loading-desc::after{
    content: '';
    animation: continuacao 4s linear infinite;
}

@keyframes continuacao {
    0% {
        content: '.';
    }
    40% {
        content: '..';
    }
    50% {
        content: '...';
    }
}


</style>