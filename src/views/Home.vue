<template>
  <div class="home">
    <ul>
      <li v-for="primaryItem in primaryItems" :key="primaryItem.id">
        <button @click="deletePrimaryFromState(primaryItem.id)">削除</button>
        {{ primaryItem.id }}
        <input type="text" v-model="primaryItem.name" placeholder="大項目名" />
        <ul v-show="0 < primaryItem.children.length">
          <li v-for="secondaryItem in primaryItem.children" :key="secondaryItem.id">
            <button @click="deleteSecondaryFromPrimaryChild(primaryItem, secondaryItem.id)">削除</button>
            {{ secondaryItem.id }}
            <input type="text" v-model="secondaryItem.name" placeholder="中項目名" />
            <ul v-show="0 < secondaryItem.children.length">
              <li v-for="tertiaryItem in secondaryItem.children" :key="tertiaryItem.id">
                <button @click="deleteTertiaryFromSecondaryChild(secondaryItem, tertiaryItem.id)">削除</button>
                {{ tertiaryItem.id }}
                <input type="text" v-model="tertiaryItem.name" placeholder="小項目名" />
                <ul v-show="0 < tertiaryItem.children.length">
                  <li v-for="quaternaryItem in tertiaryItem.children" :key="quaternaryItem.id">
                    <button @click="deleteQuaternaryFromTertiaryChild(tertiaryItem, quaternaryItem.id)">削除</button>
                    {{ quaternaryItem.id }}
                    <input type="text" v-model="quaternaryItem.name" placeholder="詳細タスク名" />
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
import { PrimaryItem } from '@/model/PrimaryItem';
import { SecondaryItem } from '@/model/SecondaryItem';
import { TertiaryItem } from '@/model/TertiaryItem';

const {
  addPrimaryToState,
  addSecondaryToPrimaryChild,
  addTertiaryToSecondaryChild,
  addQuaternaryToTertiaryChild,
  deletePrimaryFromState,
  deleteSecondaryFromPrimaryChild,
  deleteTertiaryFromSecondaryChild,
  deleteQuaternaryFromTertiaryChild
} = itemStore

export default defineComponent({
  name: 'Home',
  setup() {
    return {
      primaryItems: computed(() => itemStore.primaryItems),
      addPrimaryToState,
      addSecondaryToPrimaryChild,
      addTertiaryToSecondaryChild,
      addQuaternaryToTertiaryChild,
      deletePrimaryFromState:(deleteId: string) => deletePrimaryFromState({ deleteId }),
      deleteSecondaryFromPrimaryChild:(target: PrimaryItem, deleteId: string) => deleteSecondaryFromPrimaryChild({ target, deleteId }),
      deleteTertiaryFromSecondaryChild:(target: SecondaryItem, deleteId: string) => deleteTertiaryFromSecondaryChild({ target, deleteId }),
      deleteQuaternaryFromTertiaryChild:(target: TertiaryItem, deleteId: string) => deleteQuaternaryFromTertiaryChild({ target, deleteId })
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
  input[type=text] {
    border: solid 1px #666;
    padding: .1rem .2rem;
    border-radius: .2rem;
  }
</style>