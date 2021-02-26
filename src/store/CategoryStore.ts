import store from '@/store'
import { Module, VuexModule, getModule, Action, Mutation } from "vuex-module-decorators";
import { Category } from '@/model/Category';
import { addCategory } from '@/useCase/category/addCategory';
import { deleteCategories } from '@/useCase/category/deleteCategories';

const initializeCategories = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const json: { name: string }[] = require('@/master_data/category_data.json')
  return json.map(v => {
    const category = new Category()
    category.name = v.name
    return category
  })
}


/**
 * カテゴリーストア
 *
 * @class CategoryStore
 * @extends {VuexModule}
 */
@Module({ dynamic: true, store, name: 'CategoryStore' })
class CategoryStore extends VuexModule {
  /** カテゴリ一覧 */
  public categories: Category[] = initializeCategories()

  /** カテゴリーを追加 */
  @Action
  public addCreateCategory() {

    try {
      // clone
      const items = this.categories.slice()

      const item = new Category()
      const result = addCategory(items, item)

      this.commitCategories(result)
    } catch (e) {
      console.error(e)
    }
  }

  /** カテゴリーを複数削除 */
  @Action
  public async deleteCategories({ categoriesToDel }: { categoriesToDel: Category[] }) {

    try {
      // clone
      const items = this.categories.slice()

      // カテゴリーの複数削除
      const ids = categoriesToDel.map(v => v.id)
      const result = deleteCategories(items, ...ids)

      // State更新処理
      this.commitCategories(result)
    } catch (e) {
      console.error(e)
    }
  }

  /** stateのカテゴリー一覧を更新 */
  @Mutation
  private commitCategories(payload: Category[]) {
    this.categories = payload
  }

}

export const categoryStore = getModule(CategoryStore)