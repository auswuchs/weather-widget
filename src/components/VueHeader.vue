<script setup lang="ts">
import { computed } from 'vue'

type Page = 'Home' | 'Settings'

const props = defineProps<{
  city: string,
  page: Page,
  isAddAllowed: boolean,
}>() 

const emit = defineEmits<{
  (e: 'update:city', text: string): void,
  (e: 'addLocation'): void,
  (e: 'setPage', page: Page ): void,
}>()

const isHomePage = computed(() => {
  return props.page === 'Home'
})


</script>

<template>
  <div class="container mx-auto">
    
    <header class="header">
      <div class="w-full"></div>      
      
      <Transition name="fade" mode="out-in">
        <div class="input-group" v-if="!isHomePage">
          <input 
              class="city-input"
              type="text" 
              placeholder="Weather in your city..."
              :value="city"
              @input="emit('update:city', ($event.target as HTMLInputElement).value)">
          
          <button 
              class="absolute right-0 cursor-pointer" 
              :class="{ 'bg-red-200': !isAddAllowed, 'bg-green-300': isAddAllowed}"
              :disabled="!isAddAllowed">
            <v-icon 
                :animation="isAddAllowed ? 'pulse' : null"
                :class="{'cursor-pointer': isAddAllowed}"
                name="md-addchart-sharp"
                class="add-icon"
                title="Add location"
                scale="2.05"
                @click="emit('addLocation')" />
          </button>
        </div>
      </Transition>

      <div class="main-button">
        <button>
          <v-icon 
              :name="isHomePage ? 'la-cog-solid' : 'io-close'"
              :title="isHomePage ? 'Settings' : 'Close'"
              :hover="true"
              class="main-icon"
              scale="2.1"
              animation="spin"
              speed="slow"
              @click="emit('setPage', isHomePage ? 'Settings' : 'Home')"
          ></v-icon>
        </button>
      </div>
    </header>
  </div>
</template>

<style scoped>
.header {
  @apply flex justify-between pb-8
}

.header > * {
  @apply flex-1
}

.input-group {
  @apply flex justify-center items-center relative
}

.add-icon {
  @apply px-2 
}
.city-input {
  min-width: 100%;
  @apply px-4 py-2 max-w-full  outline-0
}

.main-button {
  @apply font-bold z-50 transition-transform  flex justify-end
}

.main-icon {
  @apply block float-right
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>