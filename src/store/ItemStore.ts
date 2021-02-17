import store from '@/store'
import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import { PrimaryItem } from '@/model/PrimaryItem'
import { SecondaryItem } from '@/model/SecondaryItem'
import { TertiaryItem } from '@/model/TertiaryItem'
import { QuaternaryItem } from '@/model/QuaternaryItem'
import { addQuaternaryToTertiary } from '@/useCase/tertiaryItem/addQuaternaryToTertiary'
import { addTertiaryToSecondary } from '@/useCase/secondaryItem/addTertiaryToSecondary'
import { addSecondaryToPrimary } from '@/useCase/primaryItem/addSecondaryToPrimary'

@Module({ dynamic: true, store, name: 'ItemStore' })
class ItemStore extends VuexModule {
  items: PrimaryItem[] = []

  @Mutation
  public addPrimaryItem() {
    const item = new PrimaryItem()
    this.items.push(item)
  }

  @Mutation
  public addSecondaryToPrimary(target: PrimaryItem) {
    addSecondaryToPrimary(target)
  }

  @Mutation
  public addTertiaryToSecondary(target: SecondaryItem) {
    addTertiaryToSecondary(target)
  }

  @Mutation
  public addQuaternaryToTertiary(target: TertiaryItem) {
    addQuaternaryToTertiary(target)
  }
}

export const itemStore = getModule(ItemStore)
