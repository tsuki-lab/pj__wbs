import shortid from 'shortid'

/**
 * 詳細項目チケット
 *
 * @export
 * @class QuaternaryItem
 */
export class QuaternaryItem {
  readonly id: string
  public name = ''
  public manDay = ''
  public description = ''
  public criticalPathId = ''
  public isResearch = false

  constructor() {
    this.id = shortid()
  }
}