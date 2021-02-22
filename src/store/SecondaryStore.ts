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
  public get secondaryItemsByParent() {
    return (parent: PrimaryItem) => {
      return this.secondaryItems.filter(v => {
        return v.parentId === parent.id
      })
    }
  }

  /** 中項目を追加 */
  @Action
  public async addSecondaryToState(target: PrimaryItem) {
    const items = this.secondaryItems.slice()
    const item = new SecondaryItem({ parentId: target.id })
    const result = addSecondaryItem(items, item)

    this.commitSecondaryItems(result)
  }

  /** 中項目を複数削除 */
  @Action
  public async deleteSecondaries({ secondariesToDel }: { secondariesToDel: SecondaryItem[] }) {

    const deletedResult = await new Promise<SecondaryItem[]>(resolve => {
      try {
        // clone
        const items = this.secondaryItems.slice()

        // 中項目の複数削除
        const ids = secondariesToDel.map(v => v.id)
        const result = deleteSecondaryItems(items, ...ids)

        // 関連する小項目の複数削除
        const tertiariesToDel = secondariesToDel.flatMap(v => {
          return tertiaryStore.tertiaryItemsByParent(v)
        })
        Promise.resolve(tertiaryStore.deleteTertiaries({ tertiariesToDel }))

        resolve(result)

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
