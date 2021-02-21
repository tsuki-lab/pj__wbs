import { ArrayUtils } from '@/utils/ArrayUtils'
import { SecondaryItem } from '@/model/SecondaryItem'

/**
 * 中項目を対象のIDを元に配列から削除する
 *
 * @export
 * @param {SecondaryItem[]} items
 * @param {...string[]} targetIds
 * @return {*}  {SecondaryItem[]}
 */
export function deleteSecondaryItems(items: SecondaryItem[], ...targetIds: string[]): SecondaryItem[] {
  targetIds.forEach(targetId => {
    ArrayUtils.removeByIdFromArray(items, targetId)
  })
  return items
}