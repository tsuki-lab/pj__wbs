import store from '@/store'
import { Module, VuexModule, getModule, Action, Mutation } from "vuex-module-decorators";

// Models
import { Category } from '@/model/Category';

// useCase
import { addCategory } from '@/useCase/category/addCategory';
import { deleteCategories } from '@/useCase/category/deleteCategories';

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
    const items = this.categories.slice()
    const item = new Category()
    const result = addCategory(items, item)

    this.commitCategories(result)
  }

  /** 大項目を複数削除 */
  @Action
  public async deleteCategories({ targetIds }: { targetIds: string[] }) {

    const deletedResult = await new Promise<Category[]>(resolve => {
      try {
        // clone
        const items = this.categories.slice()

        // 大項目の複数削除
        const result = deleteCategories(items, ...targetIds)

        resolve(result)

      } catch (e) {
        console.error(e)
      }
    })

    // State更新処理
    this.commitCategories(deletedResult)
  }

  /** stateのカテゴリー一覧を更新 */
  @Mutation
  private commitCategories(payload: Category[]) {
    this.categories = payload
  }

}

export const categoryStore = getModule(CategoryStore)