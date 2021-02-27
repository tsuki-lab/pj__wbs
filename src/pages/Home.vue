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
          <InputLabel
            v-model:value="primaryItem.name"
            label="大項目（モジュール単位）"
            placeholder="（例）Cloud"
            type="text"
          />
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
              <InputLabel
                v-model:value="secondaryItem.name"
                label="中項目（グルーピングした機能単位）"
                placeholder="（例）ユーザー管理機能"
                type="text"
              />
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
                    <InputLabel
                      v-model:value="tertiaryItem.name"
                      label="項目名（詳細機能・画面単位）"
                      placeholder="（例）モーダル画面"
                      type="text"
                    />
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
                    <InputLabel
                      v-model:value.number="tertiaryItem.manDay"
                      label="概算工数/人日"
                      type="number"
                      :step="0.2"
                      :min="0"
                    />
                    <InputLabel
                      :value="quaternaryManDayAggregateByParent(tertiaryItem)"
                      label="詳細工数/人日"
                      type="number"
                      readonly
                    />
                    <InputLabel
                      v-model:value="tertiaryItem.description"
                      label="説明"
                      type="text"
                    />
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
                        <InputLabel
                          :value="quaternaryItem.id"
                          label="ID"
                          type="text"
                          readonly
                        />
                        <InputLabel
                          v-model:value="quaternaryItem.name"
                          label="タスク"
                          type="text"
                        />
                        <InputLabel
                          v-model:value.number="quaternaryItem.manDay"
                          label="工数"
                          type="number"
                          :step="0.2"
                          :min="0"
                        />
                        <InputLabel
                          v-model:value="quaternaryItem.criticalPathId"
                          list="quaternary-item-ids"
                          type="text"
                          placeholder="クリティカルパスID"
                          label="クリティカルパスID"
                        />
                        <datalist id="quaternary-item-ids">
                          <option
                            v-for="q in quaternaryItems"
                            :key="q.id"
                            :value="q.id"
                          >
                            {{ q.name }}
                          </option>
                        </datalist>
                        <InputLabel
                          v-model:value="quaternaryItem.description"
                          label="備考"
                          type="text"
                        />
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
import InputLabel from '@/components/atoms/InputLabel.vue'

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
  components: {
    InputLabel
  },
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
