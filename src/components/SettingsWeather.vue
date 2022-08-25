<script setup lang="ts">
import type { Weather } from '@/lib/types'

import { lib } from '@/lib/main'

const emit = defineEmits<{
  (e: 'removeLocation', id: number): void,
  (e: 'onDrop', idx: object): void
}>()

const props = defineProps<{
  item: Weather,
  idx: number
}>() 

// не работает из-за какого-то бага vue
// const oldIdx = ref<number | null>(null)


const onDragStart = () => {
  // oldIdx.value = props.idx
  // костыль из-за бага выше
  lib.setLSData('oldIdx', props.idx)

}
const onDrop = () => {
  emit('onDrop', { oldIdx: lib.getLSData('oldIdx'), toIdx: props.idx })
}


</script>

<template>
  <div class="weather-line"               
        :draggable="true" 
        @drop="onDrop" 
        @dragover.prevent
        @dragstart="onDragStart">
    <div class="weather-group">
      <button class="drag-button">
        <v-icon name="md-draghandle"
                scale="2"
                ></v-icon>
      </button>

      <p class="weather-name">{{ item.name }}, {{ item.sys!.country }}</p>
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
  @apply flex justify-between items-center w-full max-w-lg py-2 px-2 my-2 bg-slate-200 relative
}

.weather-group {
  @apply flex items-center
}

.drag-button {
  @apply z-50
}

.weather-name {
  @apply flex-nowrap px-4 text-lg font-bold
}
</style>