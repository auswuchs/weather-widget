<script lang="ts" setup >
import type { Weather } from '@/lib/types'
import SettingsLocation from '@/components/SettingsLocation.vue'


const props = defineProps<{
  weather: Weather[]
}>() 

const emit = defineEmits<{
  (e: 'removeLocation', id: number): void,
    (e: 'onDrop', idx: {oldIdx: number, toIdx: number} ): void
}>()


const onRemoveLocation = (id: number) => {
  emit('removeLocation', id)
}


</script>

<template>
  <main class="settings-main">
    <Settings-Location v-for="(item, idx) in weather" :key="item.id" 
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