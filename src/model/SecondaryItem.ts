import shortid from 'shortid'
import { TertiaryItem } from './TertiaryItem'

/**
 * 中項目チケット
 *
 * @export
 * @class SecondaryItem
 */
export class SecondaryItem {
  readonly id: string
  public name = ''
  public children: TertiaryItem[] = []

  constructor() {
    this.id = shortid()
  }
}
