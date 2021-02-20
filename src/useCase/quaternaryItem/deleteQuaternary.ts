import { ArrayUtils } from '@/utils/ArrayUtils'
import { QuaternaryItem } from '@/model/QuaternaryItem'

/**
 * 詳細項目を対象のIDを元に配列から削除する
 *
 * @export
 * @param {QuaternaryItem[]} _items
 * @param {string} targetId
 * @return {*}  {QuaternaryItem[]}
 */
export function deleteQuaternary(_items: QuaternaryItem[], targetId: string): QuaternaryItem[] {
  const items = _items.slice()
  ArrayUtils.removeByIdFromArray(items, targetId)
  return items
}