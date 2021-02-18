<template>
  <div class="home">
    <ul>
      <li v-for="primaryItem in primaryItems" :key="primaryItem.id">
        {{ primaryItem.id }}
        <ul>
          <li v-for="secondaryItem in primaryItem.children" :key="secondaryItem.id">
            {{ secondaryItem.id }}
            <ul>
              <li v-for="tertiaryItem in secondaryItem.children" :key="tertiaryItem.id">
                {{ tertiaryItem.id }}
                <ul>
                  <li v-for="quaternaryItem in tertiaryItem.children" :key="quaternaryItem.id">
                    {{ quaternaryItem.id }}
                  </li>
                </ul>
                <p>
                  <button @click="addQuaternaryToTertiaryChild(tertiaryItem)">
                    詳細項目追加
                  </button>
                </p>
              </li>
            </ul>
            <p>
              <button @click="addTertiaryToSecondaryChild(secondaryItem)">
                小項目追加
              </button>
            </p>
          </li>
        </ul>
        <p>
          <button @click="addSecondaryToPrimaryChild(primaryItem)">
            中項目追加
          </button>
        </p>
      </li>
    </ul>
    <p>
      <button @click="addPrimaryToState">
        大項目追加
      </button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { itemStore } from '@/store/ItemStore';

const {
  addPrimaryToState,
  addSecondaryToPrimaryChild,
  addTertiaryToSecondaryChild,
  addQuaternaryToTertiaryChild
} = itemStore

export default defineComponent({
  name: 'Home',
  setup() {
    return {
      primaryItems: computed(() => itemStore.primaryItems),
      addPrimaryToState,
      addSecondaryToPrimaryChild,
      addTertiaryToSecondaryChild,
      addQuaternaryToTertiaryChild
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