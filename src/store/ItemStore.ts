import store from '@/store'
import { Module, VuexModule, getModule, Action, Mutation } from 'vuex-module-decorators'
import { PrimaryItem } from '@/model/PrimaryItem'
import { SecondaryItem } from '@/model/SecondaryItem'
import { TertiaryItem } from '@/model/TertiaryItem'
import { addPrimaryItem } from '@/useCase/primaryItem/addPrimaryItem'
import { addSecondaryItem } from '@/useCase/secondaryItem/addSecondary'
import { addTertiaryItem } from '@/useCase/tertiaryItem/addTertiary'
import { addQuaternaryItem } from '@/useCase/quaternaryItem/addQuaternary'
import { deletePrimaryItem } from '@/useCase/primaryItem/deletePrimaryItem'
import { deleteSecondary } from '@/useCase/secondaryItem/deleteSecondary'
import { deleteTertiary } from '@/useCase/tertiaryItem/deleteTertiary'
import { deleteQuaternary } from '@/useCase/quaternaryItem/deleteQuaternary'

/**
 * 項目管理ストア
 *
 * @class ItemStore
 * @extends {VuexModule}
 */
@Module({ dynamic: true, store, name: 'ItemStore' })
class ItemStore extends VuexModule {
  /**
   * 大項目一覧
   *
   * @type {PrimaryItem[]}
   * @memberof ItemStore
   */
  public primaryItems: PrimaryItem[] = []

  /**
   * 大項目を追加する
   *
   * @memberof ItemStore
   */
  @Action
  public async addPrimaryToState() {
    const result = addPrimaryItem(this.primaryItems)

    this.commitPrimaryItems(result)
  }

  /**
   * 大項目に中項目を追加する
   *
   * @param {PrimaryItem} target
   * @memberof ItemStore
   */
  @Action
  public async addSecondaryToPrimaryChild(target: PrimaryItem) {
    target.children = addSecondaryItem(target.children)

    this.commitPrimaryItems(this.primaryItems)
  }

  /**
   * 中項目に小項目を追加する
   *
   * @param {SecondaryItem} target
   * @memberof ItemStore
   */
  @Action
  public async addTertiaryToSecondaryChild(target: SecondaryItem) {
    target.children = addTertiaryItem(target.children)

    this.commitPrimaryItems(this.primaryItems)
  }

  /**
   * 小項目に詳細項目を追加する
   *
   * @param {TertiaryItem} target
   * @memberof ItemStore
   */
  @Action
  public async addQuaternaryToTertiaryChild(target: TertiaryItem) {
    target.children = addQuaternaryItem(target.children)

    this.commitPrimaryItems(this.primaryItems)
  }

  /**
   * stateから大項目を削除する
   *
   * @param {string} deleteId
   * @memberof ItemStore
   */
  @Action
  public async deletePrimaryFromState({ deleteId }: { deleteId: string }) {
    const result = deletePrimaryItem(this.primaryItems, deleteId)

    this.commitPrimaryItems(result)
  }

  /**
   * 大項目から中項目から削除する
   *
   * @param {PrimaryItem} target
   * @param {string} deleteId
   * @memberof ItemStore
   */
  @Action
  public async deleteSecondaryFromPrimaryChild({ target, deleteId }: { target: PrimaryItem; deleteId: string }) {
    target.children = deleteSecondary(target.children, deleteId)

    this.commitPrimaryItems(this.primaryItems)
  }

  /**
   * 中項目から小項目から削除する
   *
   * @param {SecondaryItem} target
   * @param {string} deleteId
   * @memberof ItemStore
   */
  @Action
  public async deleteTertiaryFromSecondaryChild({ target, deleteId }: { target: SecondaryItem; deleteId: string }) {
    target.children = deleteTertiary(target.children, deleteId)

    this.commitPrimaryItems(this.primaryItems)
  }

  /**
   * 小項目から詳細項目を削除する
   *
   * @param {TertiaryItem} target
   * @param {string} deleteId
   * @memberof ItemStore
   */
  @Action
  public async deleteQuaternaryFromTertiaryChild({ target, deleteId }: { target: TertiaryItem; deleteId: string }) {
    target.children = deleteQuaternary(target.children, deleteId)

    this.commitPrimaryItems(this.primaryItems)
  }

  /**
   * stateの大項目を更新する。
   *
   * @param {PrimaryItem[]} items
   * @memberof ItemStore
   */
  @Mutation
  private commitPrimaryItems(items: PrimaryItem[]) {
    this.primaryItems = items
  }
}

export const itemStore = getModule(ItemStore)
