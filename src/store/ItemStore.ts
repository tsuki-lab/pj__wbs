import store from '@/store'
import { Module, VuexModule, getModule, Action } from 'vuex-module-decorators'

import { PrimaryItem } from '@/model/PrimaryItem'
import { SecondaryItem } from '@/model/SecondaryItem'
import { TertiaryItem } from '@/model/TertiaryItem'

import { addSecondaryToPrimary } from '@/useCase/primaryItem/addSecondaryToPrimary'
import { addTertiaryToSecondary } from '@/useCase/secondaryItem/addTertiaryToSecondary'
import { addQuaternaryToTertiary } from '@/useCase/tertiaryItem/addQuaternaryToTertiary'

@Module({ dynamic: true, store, name: 'ItemStore' })
class ItemStore extends VuexModule {
  public primaryItems: PrimaryItem[] = []

  @Action
  public async addPrimaryItem() {
    const item = new PrimaryItem()
    this.primaryItems.push(item)
  }

  @Action
  public async addSecondaryToPrimary(target: PrimaryItem) {
    addSecondaryToPrimary(target)
  }

  @Action
  public async addTertiaryToSecondary(target: SecondaryItem) {
    addTertiaryToSecondary(target)
  }

  @Action
  public async addQuaternaryToTertiary(target: TertiaryItem) {
    addQuaternaryToTertiary(target)
  }
}

export const itemStore = getModule(ItemStore)
