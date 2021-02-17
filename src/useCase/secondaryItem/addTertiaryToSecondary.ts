import { SecondaryItem } from '@/model/SecondaryItem'
import { TertiaryItem } from '@/model/TertiaryItem'

/**
 * 中項目に小項目を追加する
 *
 * @export
 * @param {SecondaryItem} target 追加対象の中項目
 */
export function addTertiaryToSecondary(target: SecondaryItem) {
  const item = new TertiaryItem()
  target.children.push(item)
}