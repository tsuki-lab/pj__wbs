import { ArrayUtils } from '@/utils/ArrayUtils'
import { SecondaryItem } from '@/model/SecondaryItem'

/**
 * 中項目を対象のIDを元に配列から削除する
 *
 * @export
 * @param {SecondaryItem[]} _items
 * @param {string} targetId
 * @return {*}  {SecondaryItem[]}
 */
export function deleteSecondary(_items: SecondaryItem[], targetId: string): SecondaryItem[] {
  const items = _items.slice()
  ArrayUtils.removeByIdFromArray(items, targetId)
  return items
}