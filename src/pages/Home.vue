<template>
  <h1 class="ml-4 text-4xl font-bold">
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
          <label class="relative inline-block pt-4">
            <span class="absolute top-0 text-xs whitespace-nowrap">
              大項目（モジュール単位）
            </span>
            <input
              v-model="primaryItem.name"
              type="text"
              placeholder="（例）Cloud"
            >
          </label>
          <button
            class="w-6 h-6 mr-4 button-close"
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
              <label class="relative inline-block pt-4">
                <span class="absolute top-0 text-xs whitespace-nowrap">
                  中項目（グルーピングした機能単位）
                </span>
                <input
                  v-model="secondaryItem.name"
                  type="text"
                  placeholder="（例）ユーザー管理機能"
                >
              </label>
              <button
                class="w-6 h-6 mr-4 button-close"
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
                    <label class="relative inline-block pt-4">
                      <span class="absolute top-0 text-xs whitespace-nowrap">
                        項目名（詳細機能・画面単位）
                      </span>
                      <input
                        v-model="tertiaryItem.name"
                        type="text"
                        placeholder="（例）モーダル画面"
                      >
                    </label>
                    <label class="relative inline-block pt-4">
                      <span class="absolute top-0 text-xs whitespace-nowrap">
                        種別
                      </span>
                      <select v-model="tertiaryItem.categoryId">
                        <option
                          v-for="category in categories"
                          :key="category.id"
                          :value="category.id"
                        >
                          {{ category.name }}
                        </option>
                      </select>
                    </label>
                    <label class="relative inline-block pt-4">
                      <span class="absolute top-0 text-xs whitespace-nowrap">
                        概算工数/人日
                      </span>
                      <input
                        v-model.number="tertiaryItem.manDay"
                        type="number"
                        :step="0.2"
                        :min="0"
                      >
                    </label>
                    <label class="relative inline-block pt-4">
                      <span class="absolute top-0 text-xs whitespace-nowrap">
                        詳細工数/人日
                      </span>
                      <input
                        :value="quaternaryManDayAggregateByParent(tertiaryItem)"
                        type="number"
                        readonly
                      >
                    </label>
                    <label class="relative inline-block pt-4">
                      <span class="absolute top-0 text-xs whitespace-nowrap">
                        説明
                      </span>
                      <input
                        v-model="tertiaryItem.description"
                        type="text"
                      >
                    </label>
                  </div>
                  <button
                    class="w-6 h-6 mr-4 button-close"
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
                        <label class="relative inline-block pt-4">
                          <span class="absolute top-0 text-xs whitespace-nowrap">
                            ID
                          </span>
                          <input
                            :value="quaternaryItem.id"
                            type="text"
                            readonly
                          >
                        </label>
                        <label class="relative inline-block pt-4">
                          <span class="absolute top-0 text-xs whitespace-nowrap">
                            タスク
                          </span>
                          <input
                            v-model="quaternaryItem.name"
                            type="text"
                          >
                        </label>
                        <label class="relative inline-block pt-4">
                          <span class="absolute top-0 text-xs whitespace-nowrap">
                            工数
                          </span>
                          <input
                            v-model.number="quaternaryItem.manDay"
                            type="number"
                            :step="0.2"
                            :min="0"
                          >
                        </label>
                        <label class="relative inline-block pt-4">
                          <span class="absolute top-0 text-xs whitespace-nowrap">
                            クリティカルパスID
                          </span>
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
                        </label>
                        <label class="relative inline-block pt-4">
                          <span class="absolute top-0 text-xs whitespace-nowrap">
                            備考
                          </span>
                          <input
                            v-model="quaternaryItem.description"
                            type="text"
                          >
                        </label>
                      </div>
                      <button
                        class="w-6 h-6 mr-4 button-close"
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
import { categoryStore } from '@/store/CategoryStore'
import { PrimaryItem } from '@/model/PrimaryItem'
import { SecondaryItem } from '@/model/SecondaryItem'
import { TertiaryItem } from '@/model/TertiaryItem'
import { QuaternaryItem } from '@/model/QuaternaryItem'

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
      categories: computed(() => categoryStore.displayableCategories),
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
