import { ArrayUtils } from '@/utils/ArrayUtils'
import { QuaternaryItem } from '@/model/QuaternaryItem'

/**
 * 詳細項目を対象のIDを元に配列から削除する
 *
 * @export
 * @param {QuaternaryItem[]} items
 * @param {...string[]} targetIds
 * @return {*}  {QuaternaryItem[]}
 */
export function deleteQuaternaryItems(items: QuaternaryItem[], ...targetIds: string[]): QuaternaryItem[] {
  targetIds.forEach(targetId => {
    ArrayUtils.removeByIdFromArray(items, targetId)
  })
  return items
}