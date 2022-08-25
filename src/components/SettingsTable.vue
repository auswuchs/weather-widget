<script lang="ts" setup >
import type { Weather } from '@/lib/types'
import SettingsWeather from '@/components/SettingsWeather.vue'


const props = defineProps<{
  weather: Weather[]
}>() 

const emit = defineEmits<{
  (e: 'removeLocation', id: number): void
}>()

const onRemoveLocation = (id: number) => {
  emit('removeLocation', id)
}

</script>

<template>
  <main class="settings-main mx-auto">
    <Settings-Weather v-for="(item, idx) in weather" :key="item.id" 
        :item="item"
        :idx="idx"
        @removeLocation="onRemoveLocation"/>

  </main>

</template>

<style scoped>
.settings-main {
  @apply flex justify-center
}
</style>