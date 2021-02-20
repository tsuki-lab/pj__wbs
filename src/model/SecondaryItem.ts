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
 * 中項目チケット
 *
 * @export
 * @class SecondaryItem
 */
export class SecondaryItem {
  public readonly id: string
  public readonly parentId: string
  public name = ''

  constructor(params: InitializeArgs) {
    this.id = shortid()
    this.parentId = params.parentId
  }
}
