import { PrimaryItem } from '@/model/PrimaryItem'
import { SecondaryItem } from '@/model/SecondaryItem'

/**
 * 大項目に中項目を追加
 *
 * @export
 * @param {PrimaryItem} target 追加対象の大項目
 */
export function addSecondaryToPrimary(target: PrimaryItem) {
  const item = new SecondaryItem()
  target.secondaryItems.push(item)
}