<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useWeatherStore } from '@/stores/weather'
const store = useWeatherStore()
const router = useRouter()

</script>

<template>
  <div class="container mx-auto">
    <v-icon class="main-icon" 
            name="io-close"
            scale="2"
            animation="spin"
            speed="slow"
            title="Settings"
            :hover="true"
            @click="router.push({ name: 'home' })"
            ></v-icon>
    <h1>Settings</h1>
  </div>
</template>