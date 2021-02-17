<template>
  <div class="home">
    {{message}}
    <div v-for="(item, i) in items" :key="i">
      <hr>
      <h2>{{ item.id }}</h2>
      <p>
        <button @click="addSecondaryToPrimary(item)">>></button>
      </p>
      <ul>
        <li v-for="(secondaryItem, ii) in item.secondaryItems" :key="ii">
          {{ secondaryItem.id }}
        </li>
      </ul>
    </div>
    <p>
      <button @click="addPrimaryItem">></button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { itemStore } from '../store/ItemStore';

export default defineComponent({
  name: 'Home',
  setup() {
    const {
      addPrimaryItem,
      addSecondaryToPrimary,
      addTertiaryToSecondary,
      addQuaternaryToTertiary
    } = itemStore
    const items = ref(itemStore.items)

    return {
      items,
      addPrimaryItem,
      addSecondaryToPrimary,
      addTertiaryToSecondary,
      addQuaternaryToTertiary,
      message: 'Hello'
    }
  }
});
</script>
