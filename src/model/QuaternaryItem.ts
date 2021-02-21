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
 * 詳細項目チケット
 *
 * @export
 * @class QuaternaryItem
 */
export class QuaternaryItem {
  public readonly id: string
  public readonly parentId: string
  public name = ''
  public manDay = 0
  public description = ''
  public criticalPathId = ''
  public isResearch = false

  constructor(params: InitializeArgs) {
    this.id = shortid()
    this.parentId = params.parentId
  }
}