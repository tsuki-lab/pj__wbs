import store from '@/store'
import { Module, VuexModule, getModule, Action, Mutation } from 'vuex-module-decorators'

// Models
import { PrimaryItem } from '@/model/PrimaryItem'

// useCases
import { addPrimaryItem } from '@/useCase/primaryItem/addPrimaryItem'
import { deletePrimaryItems } from '@/useCase/primaryItem/deletePrimaryItems'
import { secondaryStore } from './SecondaryStore'

/**
 * 大項目ストア
 *
 * @class PrimaryStore
 * @extends {VuexModule}
 */
@Module({ dynamic: true, store, name: 'PrimaryStore' })
class PrimaryStore extends VuexModule {

  /** 大項目一覧 */
  public primaryItems: PrimaryItem[] = []

  /** 大項目を追加 */
  @Action
  public async addPrimaryToState() {
    const items = this.primaryItems.slice()
    const item = new PrimaryItem()
    const result = addPrimaryItem(items, item)

    this.commitPrimaryItems(result)
  }

  /** 大項目を複数削除 */
  @Action
  public async deletePrimaries({ primariesToDel }: { primariesToDel: PrimaryItem[] }) {

    const deletedResult = await new Promise<PrimaryItem[]>(resolve => {
      try {
        // clone
        const items = this.primaryItems.slice()

        // 大項目の複数削除
        const ids = primariesToDel.map(v => v.id)
        const result = deletePrimaryItems(items, ...ids)

        // 関連する中項目の複数削除
        const secondariesToDel = primariesToDel.flatMap(v => {
          return secondaryStore.secondaryItemsByParent(v)
        })
        Promise.resolve(secondaryStore.deleteSecondaries({ secondariesToDel }))

        resolve(result)

      } catch (e) {
        console.error(e)
      }
    })

    // State更新処理
    this.commitPrimaryItems(deletedResult)
  }

  /** stateの大項目一覧を更新 */
  @Mutation
  private commitPrimaryItems(items: PrimaryItem[]) {
    this.primaryItems = items
  }

}

export const primaryStore = getModule(PrimaryStore)
