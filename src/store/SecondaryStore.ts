import store from '@/store'
import { Module, VuexModule, getModule, Action, Mutation } from 'vuex-module-decorators'

// Models
import { PrimaryItem } from '@/model/PrimaryItem'
import { SecondaryItem } from '@/model/SecondaryItem'

// useCases
import { addSecondaryItem } from '@/useCase/secondaryItem/addSecondary'
import { deleteSecondary } from '@/useCase/secondaryItem/deleteSecondary'

/**
 * 中項目ストア
 *
 * @class SecondaryStore
 * @extends {VuexModule}
 */
@Module({ dynamic: true, store, name: 'SecondaryStore' })
class SecondaryStore extends VuexModule {

  /** 中項目一覧 */
  public secondaryItems: SecondaryItem[] = []

  /** parentIdで絞り込んだ中項目一覧 */
  public get secondaryItemsByParentId() {
    return (parentId: string) => {
      return this.secondaryItems.filter(v => {
        return v.parentId === parentId
      })
    }
  }

  /** 中項目を追加 */
  @Action
  public async addSecondaryToState(target: PrimaryItem) {
    const result = addSecondaryItem(this.secondaryItems, target.id)

    this.commitSecondaryItems(result)
  }

  /** 中項目を削除 */
  @Action
  public async deleteSecondaryFromState(targetId: string) {
    const result = deleteSecondary(this.secondaryItems, targetId)

    this.commitSecondaryItems(result)
  }

  /** stateの中項目一覧を更新 */
  @Mutation
  private commitSecondaryItems(items: SecondaryItem[]) {
    this.secondaryItems = items
  }

}

export const secondaryStore = getModule(SecondaryStore)
