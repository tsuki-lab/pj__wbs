import { ArrayUtils } from '@/utils/ArrayUtils'
import { QuaternaryItem } from '@/model/QuaternaryItem'

/**
 * 詳細項目を対象のIDを元に配列から削除する
 *
 * @export
 * @param {QuaternaryItem[]} _items
 * @param {...string[]} targetIds
 * @return {*}  {QuaternaryItem[]}
 */
export function deleteQuaternaryItems(_items: QuaternaryItem[], ...targetIds: string[]): QuaternaryItem[] {
  const items = _items.slice()
  targetIds.forEach(targetId => {
    ArrayUtils.removeByIdFromArray(items, targetId)
  })
  return items
}