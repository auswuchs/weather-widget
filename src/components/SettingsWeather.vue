<script setup lang="ts">
import type { Weather } from '@/lib/types'

const emit = defineEmits<{
  (e: 'removeLocation', id: number): void
}>()

const props = defineProps<{
  item: Weather,
  idx: number
}>() 
</script>

MdDraghandle

<template>
  <div class="weather-line">
    <div class="weather-group">
      <button class="drag-button" :draggable="true">
        <v-icon name="md-draghandle"
                scale="2"
                ></v-icon>
      </button>

      <p class="weather-name">{{ props.item.name }}, {{ item.sys!.country }}</p>
    </div>

      <button class="remove-button"
              @click="emit('removeLocation', props.idx)">
        <v-icon name="bi-trash"
                scale="1.5"
                ></v-icon>
      </button>
  </div>
</template>

<style scoped>
.weather-line {
  @apply flex justify-between items-center w-full max-w-lg py-4 px-2 bg-slate-200
}

.weather-group {
  @apply flex items-center
}

.drag-button {

}

.weather-name {
  @apply flex-nowrap px-4 text-lg font-bold
}
</style>