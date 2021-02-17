import store from '@/store'
import { Module, VuexModule, getModule, Action, Mutation } from 'vuex-module-decorators'
import { PrimaryItem } from '@/model/PrimaryItem'
import { SecondaryItem } from '@/model/SecondaryItem'
import { TertiaryItem } from '@/model/TertiaryItem'
import { addSecondaryToPrimary } from '@/useCase/primaryItem/addSecondaryToPrimary'
import { addTertiaryToSecondary } from '@/useCase/secondaryItem/addTertiaryToSecondary'
import { addQuaternaryToTertiary } from '@/useCase/tertiaryItem/addQuaternaryToTertiary'

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
  public async addPrimaryItem() {
    const items = this.primaryItems.slice()
    const item = new PrimaryItem()
    items.push(item)

    this.commitPrimaryItems(items)
  }

  /**
   * 大項目に中項目を追加する
   *
   * @param {PrimaryItem} target
   * @memberof ItemStore
   */
  @Action
  public async addSecondaryToPrimary(target: PrimaryItem) {
    addSecondaryToPrimary(target)

    this.commitPrimaryItems(this.primaryItems)
  }

  /**
   * 中項目に小項目を追加する
   *
   * @param {SecondaryItem} target
   * @memberof ItemStore
   */
  @Action
  public async addTertiaryToSecondary(target: SecondaryItem) {
    addTertiaryToSecondary(target)

    this.commitPrimaryItems(this.primaryItems)
  }

  /**
   * 小項目に詳細項目を追加する
   *
   * @param {TertiaryItem} target
   * @memberof ItemStore
   */
  @Action
  public async addQuaternaryToTertiary(target: TertiaryItem) {
    addQuaternaryToTertiary(target)

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
