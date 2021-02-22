import store from '@/store'
import { Module, VuexModule, getModule, Action, Mutation } from 'vuex-module-decorators'

// Models
import { TertiaryItem } from '@/model/TertiaryItem'
import { QuaternaryItem } from '@/model/QuaternaryItem'

// useCases
import { addQuaternaryItem } from '@/useCase/quaternaryItem/addQuaternaryItem'
import { deleteQuaternaryItems } from '@/useCase/quaternaryItem/deleteQuaternaryItems'
import { MathUtils } from '@/utils/MathUtils'

/**
 * 詳細項目ストア
 *
 * @class QuaternaryStore
 * @extends {VuexModule}
 */
@Module({ dynamic: true, store, name: 'QuaternaryStore' })
class QuaternaryStore extends VuexModule {

  /** 詳細項目一覧 */
  public quaternaryItems: QuaternaryItem[] = []

  /** parentIdで絞り込んだ詳細項目一覧 */
  public get quaternaryItemsByParent() {
    return (parent: TertiaryItem) => {
      return this.quaternaryItems.filter(v => {
        return v.parentId === parent.id
      })
    }
  }

  /** parentIdで絞り込んだ詳細項目の詳細工数集計 */
  public get quaternaryManDayAggregateByParent() {
    return (parent: TertiaryItem) => {
      const numbers = this.quaternaryItemsByParent(parent).map(v => v.manDay)
      return MathUtils.sum(...numbers)
    }
  }

  /** 詳細項目を追加 */
  @Action
  public async addQuaternaryToState(target: TertiaryItem) {
    const items = this.quaternaryItems.slice()
    const item = new QuaternaryItem({ parentId: target.id })
    const result = addQuaternaryItem(items, item)

    this.commitQuaternaryItems(result)
  }

  /** 詳細項目を複数削除 */
  @Action
  public async deleteQuaternaries({ quaternariesToDel }: { quaternariesToDel: QuaternaryItem[] }) {

    const deletedResult = await new Promise<QuaternaryItem[]>(resolve => {
      try {
        // clone
        const items = this.quaternaryItems.slice()

        // 詳細項目の複数削除
        const ids = quaternariesToDel.map(v => v.id)
        const result = deleteQuaternaryItems(items, ...ids)

        resolve(result)

      } catch (e) {
        console.error(e)
      }
    })

    // State更新処理
    this.commitQuaternaryItems(deletedResult)
  }

  /** stateの詳細項目一覧を更新 */
  @Mutation
  private commitQuaternaryItems(items: QuaternaryItem[]) {
    this.quaternaryItems = items
  }

}

export const quaternaryStore = getModule(QuaternaryStore)
