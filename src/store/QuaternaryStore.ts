import store from '@/store'
import { Module, VuexModule, getModule, Action, Mutation } from 'vuex-module-decorators'

// Models
import { TertiaryItem } from '@/model/TertiaryItem'
import { QuaternaryItem } from '@/model/QuaternaryItem'

// useCases
import { addQuaternaryItem } from '@/useCase/quaternaryItem/addQuaternaryItem'
import { deleteQuaternaryItems } from '@/useCase/quaternaryItem/deleteQuaternaryItems'

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
  public get quaternaryItemsByParentId() {
    return (parentId: string) => {
      return this.quaternaryItems.filter(v => {
        return v.parentId === parentId
      })
    }
  }

  // FIXME:
  // この計算の為に Store に処理を追加するのはよくない気がする。
  // 計算する為の処理を Utils もしくは Math を拡張したほうが良い。
  // 早めに対応する。
  /** parentIdで絞り込んだ詳細項目の詳細工数集計 */
  public get quaternaryManDayAggregateByParentId() {
    return (parentId: string) => {
      return this.quaternaryItemsByParentId(parentId).reduce((a, c) => {
        // jsの小数点バグ対策計算
        return ((a * 10) + (c.manDay * 10)) / 10
      }, 0)
    }
  }

  /** 詳細項目を追加 */
  @Action
  public async addQuaternaryToState(target: TertiaryItem) {
    const result = addQuaternaryItem(this.quaternaryItems, target.id)

    this.commitQuaternaryItems(result)
  }

  /** 詳細項目を複数削除 */
  @Action
  public async deleteQuaternariesFromState({ targetIds }: { targetIds: string[] }) {

    const deletedResult = await new Promise<QuaternaryItem[]>(resolve => {
      try {
        // 詳細項目の複数削除
        const _result = deleteQuaternaryItems(this.quaternaryItems, ...targetIds)

        resolve(_result)

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
