import store from '@/store'
import { Module, VuexModule, getModule, Action, Mutation } from 'vuex-module-decorators'

// Models
import { SecondaryItem } from '@/model/SecondaryItem'
import { TertiaryItem } from '@/model/TertiaryItem'

// useCases
import { addTertiaryItem } from '@/useCase/tertiaryItem/addTertiaryItem'
import { deleteTertiaryItems } from '@/useCase/tertiaryItem/deleteTertiaryItems'
import { quaternaryStore } from './QuaternaryStore'

/**
 * 小項目ストア
 *
 * @class TertiaryStore
 * @extends {VuexModule}
 */
@Module({ dynamic: true, store, name: 'TertiaryStore' })
class TertiaryStore extends VuexModule {

  /** 小項目一覧 */
  public tertiaryItems: TertiaryItem[] = []

  /** parentIdで絞り込んだ小項目一覧 */
  public get tertiaryItemsByParentId() {
    return (parentId: string) => {
      return this.tertiaryItems.filter(v => {
        return v.parentId === parentId
      })
    }
  }

  /** 小項目を追加 */
  @Action
  public async addTertiaryToState(target: SecondaryItem) {
    const result = addTertiaryItem(this.tertiaryItems, target.id)

    this.commitTertiaryItems(result)
  }

  /** 小項目を複数削除 */
  @Action
  public async deleteTertiariesFromState({ targetIds }: { targetIds: string[] }) {

    const deletedResult = await new Promise<TertiaryItem[]>(resolve => {
      try {
        // clone
        const items = this.tertiaryItems.slice()

        // 小項目の複数削除
        const result = deleteTertiaryItems(items, ...targetIds)

        // 関連する詳細項目の複数削除
        const quaternaryIds = targetIds.flatMap(targetId => {
          return quaternaryStore.quaternaryItemsByParentId(targetId).map(v => v.id)
        })
        Promise.resolve(quaternaryStore.deleteQuaternariesFromState({ targetIds: quaternaryIds }))

        resolve(result)

      } catch (e) {
        console.error(e)
      }
    })

    // State更新処理
    this.commitTertiaryItems(deletedResult)
  }

  /** stateの小項目一覧を更新 */
  @Mutation
  private commitTertiaryItems(items: TertiaryItem[]) {
    this.tertiaryItems = items
  }

}

export const tertiaryStore = getModule(TertiaryStore)
