import { ArrayUtils } from '@/utils/ArrayUtils'
import { TertiaryItem } from '@/model/TertiaryItem'

/**
 * 小項目を対象のIDを元に配列から削除する
 *
 * @export
 * @param {TertiaryItem[]} items
 * @param {string[]} targetIds
 * @return {*}  {TertiaryItem[]}
 */
export function deleteTertiaryItems(items: TertiaryItem[], ...targetIds: string[]): TertiaryItem[] {
  targetIds.forEach(targetId => {
    ArrayUtils.removeByIdFromArray(items, targetId)
  })
  return items
}