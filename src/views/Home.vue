<template>
  <div class="home">
    <ul>
      <li
        v-for="(primaryItem, i) in primaryItems"
        :key="primaryItem.id"
        class="ml-8"
      >
        <div class="flex justify-between mb-2">
          <input
            v-model="primaryItem.name"
            type="text"
            placeholder="大項目名"
          >
          <button
            class="button-close w-6 h-6 mr-4"
            @click="deletePrimaryFromState(primaryItem.id)"
          />
        </div>
        <ul v-show="0 < primaryItem.children.length">
          <li
            v-for="(secondaryItem, ii) in primaryItem.children"
            :key="secondaryItem.id"
            class="ml-8"
          >
            <div class="flex justify-between mb-2">
              <input
                v-model="secondaryItem.name"
                type="text"
                placeholder="中項目名"
              >
              <button
                class="button-close w-6 h-6 mr-4"
                @click="deleteSecondaryFromPrimaryChild(primaryItem, secondaryItem.id)"
              />
            </div>
            <ul v-show="0 < secondaryItem.children.length">
              <li
                v-for="(tertiaryItem, iii) in secondaryItem.children"
                :key="tertiaryItem.id"
                class="ml-8"
              >
                <div class="flex justify-between mb-2">
                  <input
                    v-model="tertiaryItem.name"
                    type="text"
                    placeholder="小項目名"
                  >
                  <button
                    class="button-close w-6 h-6 mr-4"
                    @click="deleteTertiaryFromSecondaryChild(secondaryItem, tertiaryItem.id)"
                  />
                </div>
                <ul v-show="0 < tertiaryItem.children.length">
                  <li
                    v-for="quaternaryItem in tertiaryItem.children"
                    :key="quaternaryItem.id"
                    class="ml-8"
                  >
                    <div class="flex justify-between mb-2">
                      <div>
                        <input
                          v-model="quaternaryItem.name"
                          type="text"
                          placeholder="詳細タスク名"
                        >
                        {{ quaternaryItem.id }}
                      </div>
                      <button
                        class="button-close w-6 h-6 mr-4"
                        @click="deleteQuaternaryFromTertiaryChild(tertiaryItem, quaternaryItem.id)"
                      />
                    </div>
                  </li>
                </ul>
                <div class="flex justify-end mx-2">
                  <template v-if="iii === secondaryItem.children.length - 1">
                    <template v-if="ii === primaryItem.children.length - 1">
                      <template v-if="i === primaryItems.length - 1">
                        <button @click="addPrimaryToState">
                          大項目追加
                        </button>
                      </template>
                      <button @click="addSecondaryToPrimaryChild(primaryItem)">
                        中項目追加
                      </button>
                    </template>
                    <button @click="addTertiaryToSecondaryChild(secondaryItem)">
                      小項目追加
                    </button>
                  </template>
                  <button @click="addQuaternaryToTertiaryChild(tertiaryItem)">
                    詳細項目追加
                  </button>
                </div>
              </li>
            </ul>
            <div class="flex justify-end mx-2">
              <template v-if="secondaryItem.children.length < 1">
                <template v-if="ii === primaryItem.children.length - 1">
                  <template v-if="i === primaryItems.length - 1">
                    <button @click="addPrimaryToState">
                      大項目追加
                    </button>
                  </template>
                  <button @click="addSecondaryToPrimaryChild(primaryItem)">
                    中項目追加
                  </button>
                </template>
                <button @click="addTertiaryToSecondaryChild(secondaryItem)">
                  小項目追加
                </button>
              </template>
            </div>
          </li>
        </ul>
        <div class="flex justify-end mx-2">
          <template v-if="primaryItem.children.length < 1">
            <template v-if="i === primaryItems.length - 1">
              <button @click="addPrimaryToState">
                大項目追加
              </button>
            </template>
            <button @click="addSecondaryToPrimaryChild(primaryItem)">
              中項目追加
            </button>
          </template>
        </div>
      </li>
    </ul>
    <div class="flex justify-end mx-2">
      <template v-if="primaryItems.length < 1">
        <button @click="addPrimaryToState">
          大項目追加
        </button>
      </template>
    </div>
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
      deletePrimaryFromState:(deleteId: string) => {
        deletePrimaryFromState({ deleteId })
      },
      deleteSecondaryFromPrimaryChild:(target: PrimaryItem, deleteId: string) => {
        deleteSecondaryFromPrimaryChild({ target, deleteId })
      },
      deleteTertiaryFromSecondaryChild:(target: SecondaryItem, deleteId: string) => {
        deleteTertiaryFromSecondaryChild({ target, deleteId })
      },
      deleteQuaternaryFromTertiaryChild:(target: TertiaryItem, deleteId: string) => {
        deleteQuaternaryFromTertiaryChild({ target, deleteId })
      }
    }
  }
});
</script>

<style scoped>
  .home {
    font-size: .9rem;
  }
  button:not(.button-close) {
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

  .button-close {
    position: relative;
  }

  .button-close::before {
    content: '';
    color: #333;
    background: currentColor;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: .1em;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .button-close::after {
    content: '';
    color: #333;
    background: currentColor;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: .1em;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
</style>