import { ArrayUtils } from '@/utils/ArrayUtils'
import { TertiaryItem } from '@/model/TertiaryItem'

/**
 * 小項目を対象のIDを元に配列から削除する
 *
 * @export
 * @param {TertiaryItem[]} _items
 * @param {string} targetId
 * @return {*}  {TertiaryItem[]}
 */
export function deleteTertiary(_items: TertiaryItem[], targetId: string): TertiaryItem[] {
  const items = _items.slice()
  ArrayUtils.removeByIdFromArray(items, targetId)
  return items
}