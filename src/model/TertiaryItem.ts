import shortid from 'shortid'

/**
 * constructorに渡す引数
 *
 * @interface InitializeArgs
 */
interface InitializeArgs {
  parentId: string;
}

/**
 * 小項目チケット
 *
 * @export
 * @class TertiaryItem
 */
export class TertiaryItem {
  public readonly id: string
  public readonly parentId: string
  public name = ''
  public manDay = ''
  public description = ''
  public categoryId = ''

  constructor(params: InitializeArgs) {
    this.id = shortid()
    this.parentId = params.parentId
  }
}
