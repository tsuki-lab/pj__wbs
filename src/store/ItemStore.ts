import store from '@/store'
import { Module, VuexModule, getModule, Action, Mutation } from 'vuex-module-decorators'

// Models
import { PrimaryItem } from '@/model/PrimaryItem'
import { SecondaryItem } from '@/model/SecondaryItem'
import { TertiaryItem } from '@/model/TertiaryItem'
import { QuaternaryItem } from '@/model/QuaternaryItem'

// useCases
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
  /** 大項目一覧 */
  public primaryItems: PrimaryItem[] = []
  /** 中項目一覧 */
  public secondaryItems: SecondaryItem[] = []
  /** 小項目一覧 */
  public tertiaryItems: TertiaryItem[] = []
  /** 詳細項目一覧 */
  public quaternaryItems: QuaternaryItem[] = []

  /** parentIdで絞り込んだ中項目一覧 */
  public get secondaryItemsByParentId() {
    return (parentId: string) => {
      return this.secondaryItems.filter(v => {
        return v.parentId === parentId
      })
    }
  }

  /** parentIdで絞り込んだ小項目一覧 */
  public get tertiaryItemsByParentId() {
    return (parentId: string) => {
      return this.tertiaryItems.filter(v => {
        return v.parentId === parentId
      })
    }
  }

  /** parentIdで絞り込んだ詳細項目一覧 */
  public get quaternaryItemsByParentId() {
    return (parentId: string) => {
      return this.quaternaryItems.filter(v => {
        return v.parentId === parentId
      })
    }
  }

  /** 大項目を追加 */
  @Action
  public async addPrimaryToState() {
    const result = addPrimaryItem(this.primaryItems)
    this.commitPrimaryItems(result)
  }

  /** 中項目を追加 */
  @Action
  public async addSecondaryToState(target: PrimaryItem) {
    const result = addSecondaryItem(this.secondaryItems, target.id)

    this.commitSecondaryItems(result)
  }

  /** 小項目を追加 */
  @Action
  public async addTertiaryToState(target: SecondaryItem) {
    const result = addTertiaryItem(this.tertiaryItems, target.id)

    this.commitTertiaryItems(result)
  }

  /** 詳細項目を追加 */
  @Action
  public async addQuaternaryToState(target: TertiaryItem) {
    const result = addQuaternaryItem(this.quaternaryItems, target.id)

    this.commitQuaternaryItems(result)
  }

  /** 大項目を削除 */
  @Action
  public async deletePrimaryFromState(targetId: string) {
    const result = deletePrimaryItem(this.primaryItems, targetId)

    this.commitPrimaryItems(result)
  }

  /** 中項目を削除 */
  @Action
  public async deleteSecondaryFromState(targetId: string) {
    const result = deleteSecondary(this.secondaryItems, targetId)

    this.commitSecondaryItems(result)
  }

  /** 小項目を削除 */
  @Action
  public async deleteTertiaryFromState(targetId: string) {
    const result = deleteTertiary(this.tertiaryItems, targetId)

    this.commitTertiaryItems(result)
  }

  /** 詳細項目を削除 */
  @Action
  public async deleteQuaternaryFromState(targetId: string) {
    const result = deleteQuaternary(this.quaternaryItems, targetId)

    this.commitQuaternaryItems(result)
  }

  /** stateの大項目一覧を更新 */
  @Mutation
  private commitPrimaryItems(items: PrimaryItem[]) {
    this.primaryItems = items
  }

  /** stateの中項目一覧を更新 */
  @Mutation
  private commitSecondaryItems(items: SecondaryItem[]) {
    this.secondaryItems = items
  }

  /** stateの小項目一覧を更新 */
  @Mutation
  private commitTertiaryItems(items: TertiaryItem[]) {
    this.tertiaryItems = items
  }

  /** stateの詳細項目一覧を更新 */
  @Mutation
  private commitQuaternaryItems(items: QuaternaryItem[]) {
    this.quaternaryItems = items
  }
}

export const itemStore = getModule(ItemStore)
