<template>
  <div class="home">
    <p>
      <button @click="addPrimaryToState">
        大項目追加
      </button>
    </p>
    <ul>
      <li v-for="primaryItem in primaryItems" :key="primaryItem.id">
        {{ primaryItem.id }}
        <p>
          <button @click="addSecondaryToPrimaryChild(primaryItem)">
            中項目追加
          </button>
        </p>
        <ul v-show="0 < primaryItem.children.length">
          <li v-for="secondaryItem in primaryItem.children" :key="secondaryItem.id">
            {{ secondaryItem.id }}
            <p>
              <button @click="addTertiaryToSecondaryChild(secondaryItem)">
                小項目追加
              </button>
            </p>
            <ul v-show="0 < secondaryItem.children.length">
              <li v-for="tertiaryItem in secondaryItem.children" :key="tertiaryItem.id">
                {{ tertiaryItem.id }}
                <p>
                  <button @click="addQuaternaryToTertiaryChild(tertiaryItem)">
                    詳細項目追加
                  </button>
                </p>
                <ul v-show="0 < tertiaryItem.children.length">
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
  .home {
    font-size: .9rem;
  }
  ul {
    border: 1px solid #666;
    margin: .5rem;
  }
  li {
    margin-left: .4rem;
  }
  button {
    padding: .2rem .5rem;
    margin-top: .2rem;
    margin-left: .4rem;
    background-color: #59646b;
    border-radius: .3rem;
    color: #fff;
  }
</style>