import store from '@/store'
import { Module, VuexModule, getModule, Action, Mutation } from 'vuex-module-decorators'

// Models
import { PrimaryItem } from '@/model/PrimaryItem'
import { SecondaryItem } from '@/model/SecondaryItem'

// useCases
import { addSecondaryItem } from '@/useCase/secondaryItem/addSecondaryItem'
import { deleteSecondaryItems } from '@/useCase/secondaryItem/deleteSecondaryItems'
import { tertiaryStore } from './TertiaryStore'

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

  /** 中項目を複数削除 */
  @Action
  public async deleteSecondariesFromState({ targetIds }: { targetIds: string[] }) {

    const deletedResult = await new Promise<SecondaryItem[]>(resolve => {
      try {
        // 中項目の複数削除
        const _result = deleteSecondaryItems(this.secondaryItems, ...targetIds)

        // 関連する小項目の複数削除
        const tertiaryIds = targetIds.flatMap(targetId => {
          return tertiaryStore.tertiaryItemsByParentId(targetId).map(v => v.id)
        })
        Promise.resolve(tertiaryStore.deleteTertiariesFromState({ targetIds: tertiaryIds }))

        resolve(_result)

      } catch (e) {
        console.error(e)
      }
    })

    // State更新処理
    this.commitSecondaryItems(deletedResult)
  }

  /** stateの中項目一覧を更新 */
  @Mutation
  private commitSecondaryItems(items: SecondaryItem[]) {
    this.secondaryItems = items
  }

}

export const secondaryStore = getModule(SecondaryStore)
