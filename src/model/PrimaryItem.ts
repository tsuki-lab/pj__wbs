import shortid from 'shortid'

/** Model: 大項目 */
export class PrimaryItem {
  readonly id: string
  public name = ''

  constructor() {
    this.id = shortid()
  }
}
