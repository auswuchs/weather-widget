<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'

import TheHeader from '@/components/TheHeader.vue'


const store = useWeatherStore()

</script>



<template>
  <div class="container mx-auto">
    <The-Header />
    
    <h1>Settings</h1>
  </div>
</template>