import shortid from 'shortid'
import { SecondaryItem } from "./SecondaryItem";

/**
 * 大項目チケット
 *
 * @export
 * @class PrimaryItem
 */
export class PrimaryItem {
  readonly id: string
  public name = ''
  public tertiaryItems: SecondaryItem[] = []

  constructor() {
    this.id = shortid()
  }
}
