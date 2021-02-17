import shortid from 'shortid'
import { QuaternaryItem } from './QuaternaryItem'

/**
 * 小項目チケット
 *
 * @export
 * @class TertiaryItem
 */
export class TertiaryItem {
  readonly id: string
  public name = ''
  public manDay = ''
  public description = ''
  public category = ''
  public children: QuaternaryItem[] = []

  constructor() {
    this.id = shortid()
  }
}
