import { ArrayUtils } from '@/utils/ArrayUtils'
import { PrimaryItem } from '@/model/PrimaryItem'

/**
 * 大項目を対象のIDを元に配列から削除する
 *
 * @export
 * @param {PrimaryItem[]} _items
 * @param {string} targetId
 * @return {*}  {PrimaryItem[]}
 */
export function deletePrimaryItem(_items: PrimaryItem[], targetId: string): PrimaryItem[] {
  const items = _items.slice()
  ArrayUtils.removeByIdFromArray(items, targetId)
  return items
}