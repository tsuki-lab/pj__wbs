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
            @click="deletePrimaryItem(primaryItem)"
          />
        </div>
        <ul v-show="0 < secondaryItemsByParent(primaryItem).length">
          <li
            v-for="(secondaryItem, ii) in secondaryItemsByParent(primaryItem)"
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
                @click="deleteSecondaryItem(secondaryItem)"
              />
            </div>
            <ul v-show="0 < tertiaryItemsByParent(secondaryItem).length">
              <li
                v-for="(tertiaryItem, iii) in tertiaryItemsByParent(secondaryItem)"
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
                      v-model.number="tertiaryItem.manDay"
                      type="number"
                      :step="0.2"
                      placeholder="概算工数"
                      :min="0"
                    >
                    <input
                      :value="quaternaryManDayAggregateByParent(tertiaryItem)"
                      type="number"
                      placeholder="詳細工数集計"
                      readonly
                    >
                    <input
                      v-model="tertiaryItem.description"
                      type="text"
                      placeholder="備考"
                    >
                  </div>
                  <button
                    class="button-close w-6 h-6 mr-4"
                    @click="deleteTertiaryItem(tertiaryItem)"
                  />
                </div>
                <ul v-show="0 < quaternaryItemsByParent(tertiaryItem).length">
                  <li
                    v-for="quaternaryItem in quaternaryItemsByParent(tertiaryItem)"
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
                          v-model.number="quaternaryItem.manDay"
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
                        @click="deleteQuaternaryItem(quaternaryItem)"
                      />
                    </div>
                  </li>
                </ul>
                <div class="flex justify-end mx-2">
                  <template v-if="iii === tertiaryItemsByParent(secondaryItem).length - 1">
                    <template v-if="ii === secondaryItemsByParent(primaryItem).length - 1">
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
              <template v-if="tertiaryItemsByParent(secondaryItem).length < 1">
                <template v-if="ii === secondaryItemsByParent(primaryItem).length - 1">
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
          <template v-if="secondaryItemsByParent(primaryItem).length < 1">
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
import { PrimaryItem } from '../model/PrimaryItem'
import { SecondaryItem } from '../model/SecondaryItem'
import { TertiaryItem } from '../model/TertiaryItem'
import { QuaternaryItem } from '../model/QuaternaryItem'

const {
  addPrimaryToState,
  deletePrimaries,
} = primaryStore

const {
  addSecondaryToState,
  secondaryItemsByParent,
  deleteSecondaries
} = secondaryStore

const {
  addTertiaryToState,
  tertiaryItemsByParent,
  deleteTertiaries
} = tertiaryStore

const {
  addQuaternaryToState,
  quaternaryManDayAggregateByParent,
  quaternaryItemsByParent,
  deleteQuaternaries
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
      secondaryItemsByParent,
      tertiaryItemsByParent,
      quaternaryItemsByParent,
      quaternaryManDayAggregateByParent,
      deletePrimaryItem: (target: PrimaryItem) => {
        deletePrimaries({ primariesToDel: [ target ]})
      },
      deleteSecondaryItem: (target: SecondaryItem) => {
        deleteSecondaries({ secondariesToDel: [ target ]})
      },
      deleteTertiaryItem: (target: TertiaryItem) => {
        deleteTertiaries({ tertiariesToDel: [ target ]})
      },
      deleteQuaternaryItem: (target: QuaternaryItem) => {
        deleteQuaternaries({ quaternariesToDel: [ target ] })
      }
    }
  }
});
</script>
