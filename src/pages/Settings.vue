<template>
  <h1 class="ml-4 text-4xl font-bold">
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
        <InputLabel
          v-model:value="category.name"
          type="text"
          placeholder="（例）設計全般"
          label="種別名"
        />
        <button
          class="w-6 h-6 mr-4 button-close"
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
import InputLabel from '@/components/atoms/InputLabel.vue'

const {
  addCreateCategory,
  deleteCategories
} = categoryStore

export default defineComponent({
  name: 'Settings',
  components: {
    InputLabel
  },
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
