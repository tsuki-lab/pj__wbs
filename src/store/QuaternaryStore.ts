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

  /** 詳細項目を追加 */
  @Action
  public async addQuaternaryToState(target: TertiaryItem) {
    const result = addQuaternaryItem(this.quaternaryItems, target.id)

    this.commitQuaternaryItems(result)
  }

  /** 詳細項目を複数削除 */
  @Action
  public async deleteQuaternariesFromState({ targetIds }: { targetIds: string[] }) {
    const result = deleteQuaternaryItems(this.quaternaryItems, ...targetIds)

    this.commitQuaternaryItems(result)
  }

  /** stateの詳細項目一覧を更新 */
  @Mutation
  private commitQuaternaryItems(items: QuaternaryItem[]) {
    this.quaternaryItems = items
  }

}

export const quaternaryStore = getModule(QuaternaryStore)
