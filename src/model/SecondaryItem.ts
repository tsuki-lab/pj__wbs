import shortid from 'shortid'
import { TertiaryItem } from "./TertiaryItem";

/**
 * 中項目チケット
 *
 * @export
 * @class SecondaryItem
 */
export class SecondaryItem {
  readonly id: string
  public name = ''
  public tertiaryItems: TertiaryItem[] = []

  constructor() {
    this.id = shortid()
  }
}
