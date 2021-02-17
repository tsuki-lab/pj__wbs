<template>
  <div class="home">
    <button @click="addPrimaryItem">
      大項目追加
    </button>
    <ul>
      <li v-for="primaryItem in primaryItems" :key="primaryItem.id">
        {{ primaryItem.id }}
        <button @click="addSecondaryToPrimary(primaryItem)">
          中項目追加
        </button>
        <ul>
          <li v-for="secondaryItem in primaryItem.children" :key="secondaryItem.id">
            {{ secondaryItem.id }}
            <button @click="addTertiaryToSecondary(secondaryItem)">
              小項目追加
            </button>
            <ul>
              <li v-for="tertiaryItem in secondaryItem.children" :key="tertiaryItem.id">
                {{ tertiaryItem.id }}
                <button @click="addQuaternaryToTertiary(tertiaryItem)">
                  詳細項目追加
                </button>
                <ul>
                  <li v-for="quaternaryItem in tertiaryItem.children" :key="quaternaryItem.id">
                    {{ quaternaryItem.id }}
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { itemStore } from '../store/ItemStore';

const {
  addPrimaryItem,
  addSecondaryToPrimary,
  addTertiaryToSecondary,
  addQuaternaryToTertiary
} = itemStore

export default defineComponent({
  name: 'Home',
  setup() {
    return {
      primaryItems: computed(() => itemStore.primaryItems),
      addPrimaryItem,
      addSecondaryToPrimary,
      addTertiaryToSecondary,
      addQuaternaryToTertiary
    }
  }
});
</script>

<style scoped>
  ul {
    border: 1px solid #666;
    margin: .5rem;
  }
</style>