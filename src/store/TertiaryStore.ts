import store from '@/store'
import { Module, VuexModule, getModule, Action, Mutation } from 'vuex-module-decorators'
import { SecondaryItem } from '@/model/SecondaryItem'
import { TertiaryItem } from '@/model/TertiaryItem'
import { addTertiaryItem } from '@/useCase/tertiaryItem/addTertiaryItem'
import { deleteTertiaryItems } from '@/useCase/tertiaryItem/deleteTertiaryItems'
import { quaternaryStore } from './QuaternaryStore'

/** 小項目に関連する詳細項目の抽出 */
function extractQuaternaries(tertiaryItems: TertiaryItem[]) {
  return tertiaryItems.flatMap(v => {
    return quaternaryStore.quaternaryItemsByParent(v)
  })
}

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
  public get tertiaryItemsByParent() {
    return (parent: SecondaryItem) => {
      return this.tertiaryItems.filter(v => {
        return v.parentId === parent.id
      })
    }
  }

  /** 小項目を追加 */
  @Action
  public async addTertiaryToState(target: SecondaryItem) {

    try {
      // clone
      const items = this.tertiaryItems.slice()

      const item = new TertiaryItem({ parentId: target.id })
      const result = addTertiaryItem(items, item)

      this.commitTertiaryItems(result)
    } catch (e) {
      console.error(e)
    }
  }

  /** 小項目を複数削除 */
  @Action
  public async deleteTertiaries({ tertiariesToDel }: { tertiariesToDel: TertiaryItem[] }) {

    try {
      // clone
      const items = this.tertiaryItems.slice()

      // 小項目の複数削除
      const ids = tertiariesToDel.map(v => v.id)
      const result = deleteTertiaryItems(items, ...ids)

      // 関連する詳細項目の複数削除処理呼び出し
      quaternaryStore.deleteQuaternaries({
        quaternariesToDel: extractQuaternaries(tertiariesToDel)
      })

      // State更新処理
      this.commitTertiaryItems(result)
    } catch (e) {
      console.error(e)
    }
  }

  /** stateの小項目一覧を更新 */
  @Mutation
  private commitTertiaryItems(items: TertiaryItem[]) {
    this.tertiaryItems = items
  }

}

export const tertiaryStore = getModule(TertiaryStore)
