import store from '@/store'
import { Module, VuexModule, getModule, Action, Mutation } from 'vuex-module-decorators'

// Models
import { PrimaryItem } from '@/model/PrimaryItem'

// useCases
import { addPrimaryItem } from '@/useCase/primaryItem/addPrimaryItem'
import { deletePrimaryItem } from '@/useCase/primaryItem/deletePrimaryItem'

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
    const result = addPrimaryItem(this.primaryItems)
    this.commitPrimaryItems(result)
  }

  /** 大項目を複数削除 */
  @Action
  public async deletePrimariesFromState({ targetIds }: { targetIds: string[] }) {
    const result = deletePrimaryItem(this.primaryItems, ...targetIds)
    this.commitPrimaryItems(result)
  }

  /** stateの大項目一覧を更新 */
  @Mutation
  private commitPrimaryItems(items: PrimaryItem[]) {
    this.primaryItems = items
  }

}

export const primaryStore = getModule(PrimaryStore)
