import shortid from 'shortid'

/**
 * Model: カテゴリー
 *
 * @export
 * @class Category
 */
export class Category {
  public readonly id: string
  public name = ''

  constructor() {
    this.id = shortid()
  }
}
