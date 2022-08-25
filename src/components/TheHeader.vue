<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const router = useRouter()
const route = useRoute()

const isHomePage = computed(() => {
  return route.fullPath === '/'
})


const cityName = ref('')
const zeleboba = () => {
  console.warn('aboba')
}
</script>

<template>
    <header class="header">
      <div class="w-full"></div>      
      
      <div class="input-group">
        <input class="city-input"
            type="text" 
            placeholder="Weather in your city..."
            v-model="cityName"
            @keypress.enter.exact="zeleboba"
            v-if="!isHomePage">
        
        <v-icon name="bi-search"
                class="search-icon"
                :hover="true"
                animation="pulse"
                scale="2.5"
                @click="zeleboba"
        ></v-icon>
      </div>

      <button class="main-button">
        <v-icon :name="isHomePage ? 'la-cog-solid' : 'io-close'"
                class="main-icon"
                scale="2"
                animation="spin"
                speed="slow"
                :title="isHomePage ? 'Settings' : 'Close'"
                :hover="true"
                @click="router.push({ name: isHomePage ? 'settings' : 'home' })"
                ></v-icon>
      </button>
    </header>
</template>

<style scoped>
.header {
  @apply flex justify-between pb-8
}

.header > * {
  @apply flex-1
}

.input-group {
  @apply flex justify-center items-center
}

.search-icon {
  @apply cursor-pointer px-2
}
.city-input {
  @apply px-4 py-2 w-full
}

.main-button {
  @apply font-bold cursor-pointer z-50 transition-transform
}

.main-icon {
  @apply block float-right
}
</style>