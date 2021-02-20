import { ArrayUtils } from '@/utils/ArrayUtils'
import { SecondaryItem } from '@/model/SecondaryItem'

/**
 * 中項目を対象のIDを元に配列から削除する
 *
 * @export
 * @param {SecondaryItem[]} _items
 * @param {...string[]} targetIds
 * @return {*}  {SecondaryItem[]}
 */
export function deleteSecondary(_items: SecondaryItem[], ...targetIds: string[]): SecondaryItem[] {
  const items = _items.slice()
  targetIds.forEach(targetId => {
    ArrayUtils.removeByIdFromArray(items, targetId)
  })
  return items
}