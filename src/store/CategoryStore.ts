import store from '@/store'
import { Module, VuexModule, getModule, Action, Mutation } from "vuex-module-decorators";

// Models
import { Category } from '@/model/Category';

// useCase
import { addCreateCategory } from '@/useCase/category/addCreateCategory';

/**
 * カテゴリーストア
 *
 * @class CategoryStore
 * @extends {VuexModule}
 */
@Module({ dynamic: true, store, name: 'CategoryStore' })
class CategoryStore extends VuexModule {
  /** カテゴリ一覧 */
  public categories: Category[] = []

  /** カテゴリーを追加 */
  @Action
  public addCreateCategory() {
    const result = addCreateCategory(this.categories)
    this.setCategoriesToState(result)
  }

  /** stateのカテゴリー一覧を更新 */
  @Mutation
  private setCategoriesToState(payload: Category[]) {
    this.categories = payload
  }

}

export const categoryStore = getModule(CategoryStore)