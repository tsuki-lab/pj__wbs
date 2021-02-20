<template>
  <h1 class="text-4xl ml-4 font-bold">
    WBS Generator
  </h1>
  <div class="pt-4 text-sm">
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
            @click="deletePrimaryItem(primaryItem.id)"
          />
        </div>
        <ul v-show="0 < secondaryItemsByParentId(primaryItem.id).length">
          <li
            v-for="(secondaryItem, ii) in secondaryItemsByParentId(primaryItem.id)"
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
                @click="deleteSecondaryItem(secondaryItem.id)"
              />
            </div>
            <ul v-show="0 < tertiaryItemsByParentId(secondaryItem.id).length">
              <li
                v-for="(tertiaryItem, iii) in tertiaryItemsByParentId(secondaryItem.id)"
                :key="tertiaryItem.id"
                class="ml-8"
              >
                <div class="flex justify-between mb-2">
                  <div>
                    <input
                      v-model="tertiaryItem.name"
                      type="text"
                      placeholder="小項目名"
                    >
                    <input
                      v-model="tertiaryItem.manDay"
                      type="number"
                      :step="0.2"
                      placeholder="概算工数"
                      :min="0"
                    >
                    <input
                      v-model="tertiaryItem.description"
                      type="text"
                      placeholder="備考"
                    >
                  </div>
                  <button
                    class="button-close w-6 h-6 mr-4"
                    @click="deleteTertiaryItem(tertiaryItem.id)"
                  />
                </div>
                <ul v-show="0 < quaternaryItemsByParentId(tertiaryItem.id).length">
                  <li
                    v-for="quaternaryItem in quaternaryItemsByParentId(tertiaryItem.id)"
                    :key="quaternaryItem.id"
                    class="ml-8"
                  >
                    <div class="flex justify-between mb-2">
                      <div>
                        <input
                          :value="quaternaryItem.id"
                          type="text"
                          readonly
                        >
                        <input
                          v-model="quaternaryItem.name"
                          type="text"
                          placeholder="詳細タスク名"
                        >
                        <input
                          v-model="quaternaryItem.manDay"
                          type="number"
                          :step="0.2"
                          placeholder="詳細工数"
                          :min="0"
                        >
                        <input
                          v-model="quaternaryItem.criticalPathId"
                          list="quaternary-item-ids"
                          type="text"
                          placeholder="クリティカルパスID"
                        >
                        <datalist id="quaternary-item-ids">
                          <option
                            v-for="q in quaternaryItems"
                            :key="q.id"
                            :value="q.id"
                          >
                            {{ q.name }}
                          </option>
                        </datalist>
                        <input
                          v-model="quaternaryItem.description"
                          type="text"
                          placeholder="備考"
                        >
                      </div>
                      <button
                        class="button-close w-6 h-6 mr-4"
                        @click="deleteQuaternaryItem(quaternaryItem.id)"
                      />
                    </div>
                  </li>
                </ul>
                <div class="flex justify-end mx-2">
                  <template v-if="iii === tertiaryItemsByParentId(secondaryItem.id).length - 1">
                    <template v-if="ii === secondaryItemsByParentId(primaryItem.id).length - 1">
                      <template v-if="i === primaryItems.length - 1">
                        <button @click="addPrimaryItem">
                          大項目追加
                        </button>
                      </template>
                      <button @click="addSecondaryItem(primaryItem)">
                        中項目追加
                      </button>
                    </template>
                    <button @click="addTertiaryItem(secondaryItem)">
                      小項目追加
                    </button>
                  </template>
                  <button @click="addQuaternaryItem(tertiaryItem)">
                    詳細項目追加
                  </button>
                </div>
              </li>
            </ul>
            <div class="flex justify-end mx-2">
              <template v-if="tertiaryItemsByParentId(secondaryItem.id).length < 1">
                <template v-if="ii === secondaryItemsByParentId(primaryItem.id).length - 1">
                  <template v-if="i === primaryItems.length - 1">
                    <button @click="addPrimaryItem">
                      大項目追加
                    </button>
                  </template>
                  <button @click="addSecondaryItem(primaryItem)">
                    中項目追加
                  </button>
                </template>
                <button @click="addTertiaryItem(secondaryItem)">
                  小項目追加
                </button>
              </template>
            </div>
          </li>
        </ul>
        <div class="flex justify-end mx-2">
          <template v-if="secondaryItemsByParentId(primaryItem.id).length < 1">
            <template v-if="i === primaryItems.length - 1">
              <button @click="addPrimaryItem">
                大項目追加
              </button>
            </template>
            <button @click="addSecondaryItem(primaryItem)">
              中項目追加
            </button>
          </template>
        </div>
      </li>
    </ul>
    <div class="flex justify-end mx-2">
      <template v-if="primaryItems.length < 1">
        <button @click="addPrimaryItem">
          大項目追加
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { primaryStore } from '@/store/PrimaryStore'
import { secondaryStore } from '@/store/SecondaryStore'
import { tertiaryStore } from '@/store/TertiaryStore'
import { quaternaryStore } from '@/store/QuaternaryStore'

const {
  addPrimaryToState,
  deletePrimariesFromState,
} = primaryStore

const {
  addSecondaryToState,
  secondaryItemsByParentId,
  deleteSecondariesFromState
} = secondaryStore

const {
  addTertiaryToState,
  tertiaryItemsByParentId,
  deleteTertiariesFromState
} = tertiaryStore

const {
  addQuaternaryToState,
  quaternaryItemsByParentId,
  deleteQuaternariesFromState
} = quaternaryStore

export default defineComponent({
  name: 'Home',
  setup() {
    return {
      primaryItems: computed(() => primaryStore.primaryItems),
      quaternaryItems: computed(() => quaternaryStore.quaternaryItems),
      addPrimaryItem: addPrimaryToState,
      addSecondaryItem: addSecondaryToState,
      addTertiaryItem: addTertiaryToState,
      addQuaternaryItem: addQuaternaryToState,
      secondaryItemsByParentId,
      tertiaryItemsByParentId,
      quaternaryItemsByParentId,
      deletePrimaryItem: (targetId: string) => {
        deletePrimariesFromState({ targetIds: [ targetId ]})
      },
      deleteSecondaryItem: (targetId: string) => {
        deleteSecondariesFromState({ targetIds: [ targetId ]})
      },
      deleteTertiaryItem: (targetId: string) => {
        deleteTertiariesFromState({ targetIds: [ targetId ]})
      },
      deleteQuaternaryItem: (targetId: string) => {
        deleteQuaternariesFromState({ targetIds: [ targetId ] })
      }
    }
  }
});
</script>

<style scoped>
  button:not(.button-close) {
    padding: .2rem .5rem;
    margin-top: .2rem;
    margin-left: .4rem;
    background-color: #59646b;
    border-radius: .3rem;
    color: #fff;
  }
  input[type=text],
  input[type=number] {
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