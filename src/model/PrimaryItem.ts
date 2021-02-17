import shortid from 'shortid'
import { SecondaryItem } from './SecondaryItem'

/**
 * 大項目チケット
 *
 * @export
 * @class PrimaryItem
 */
export class PrimaryItem {
  readonly id: string
  public name = ''
  public secondaryItems: SecondaryItem[]

  constructor() {
    this.id = shortid()
    this.secondaryItems = []
  }
}
