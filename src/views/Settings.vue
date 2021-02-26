<template>
  <h1 class="text-4xl ml-4 font-bold">
    Settings
  </h1>
  <div class="w-3/6 px-4">
    <h2 class="text-2xl font-bold">
      Categories
    </h2>
    <ul>
      <li
        v-for="category in categories"
        :key="category.id"
        class="flex justify-between mb-2"
      >
        <input
          v-model="category.name"
          type="text"
          placeholder="種別名"
        >
        <button
          class="button-close w-6 h-6 mr-4"
          @click="deleteCategory(category)"
        />
      </li>
    </ul>
    <div class="flex justify-end mx-2">
      <button @click="addCreateCategory">
        種別を追加
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { categoryStore } from '@/store/CategoryStore'
import { Category } from '@/model/Category';

const {
  addCreateCategory,
  deleteCategories
} = categoryStore

export default defineComponent({
  name: 'Settings',
  setup(){
    return {
      categories: computed(() => categoryStore.categories),
      addCreateCategory,
      deleteCategory: (target: Category) => {
        deleteCategories({ categoriesToDel: [ target ] })
      }
    }
  }
});
</script>
