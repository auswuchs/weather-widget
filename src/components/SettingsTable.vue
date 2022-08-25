<script lang="ts" setup >
import type { Weather } from '@/lib/types'
import SettingsWeather from '@/components/SettingsWeather.vue'


const props = defineProps<{
  weather: Weather[]
}>() 

const emit = defineEmits<{
  (e: 'removeLocation', id: number): void,
  (e: 'onDrop', idx: object): void
}>()


const onRemoveLocation = (id: number) => {
  emit('removeLocation', id)
}


</script>

<template>
  <main class="settings-main">
    <Settings-Weather v-for="(item, idx) in weather" :key="item.id" 
        :item="item"
        :idx="idx"
        :draggable="true"
        @removeLocation="onRemoveLocation"
        @onDrop="emit('onDrop', $event)" 
        />

  </main>

</template>

<style scoped>
.settings-main {
  @apply flex flex-col items-center justify-center mx-auto
}
</style>