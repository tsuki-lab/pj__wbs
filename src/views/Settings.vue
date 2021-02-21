<template>
  <h1 class="text-4xl ml-4 font-bold">
    Settings
  </h1>
  <h2 class="text-2xl ml-4 font-bold">
    Categories
  </h2>
  <ul>
    <li
      v-for="category in categories"
      :key="category.id"
    >
      <input
        v-model="category.name"
        type="text"
        placeholder="種別名"
      >
    </li>
  </ul>
  <div class="flex justify-end mx-2">
    <button @click="addCreateCategory">
      種別を追加
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { categoryStore } from '@/store/CategoryStore'

const {
  addCreateCategory
} = categoryStore

export default defineComponent({
  name: 'Settings',
  setup(){
    return {
      categories: computed(() => categoryStore.categories),
      addCreateCategory
    }
  }
});
</script>
