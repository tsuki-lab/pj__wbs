import { ArrayUtils } from '@/utils/ArrayUtils'
import { TertiaryItem } from '@/model/TertiaryItem'

/**
 * 小項目を対象のIDを元に配列から削除する
 *
 * @export
 * @param {TertiaryItem[]} _items
 * @param {string[]} targetIds
 * @return {*}  {TertiaryItem[]}
 */
export function deleteTertiaryItems(_items: TertiaryItem[], ...targetIds: string[]): TertiaryItem[] {
  const items = _items.slice()
  targetIds.forEach(targetId => {
    ArrayUtils.removeByIdFromArray(items, targetId)
  })
  return items
}