import { TertiaryItem } from '@/model/TertiaryItem'
import { QuaternaryItem } from '@/model/QuaternaryItem'

/**
 * 小項目に詳細項目を追加する
 *
 * @export
 * @param {TertiaryItem} target 追加対象の小項目
 */
export function addQuaternaryToTertiary(target: TertiaryItem) {
  const item = new QuaternaryItem()
  target.quaternaryItems.push(item)
}