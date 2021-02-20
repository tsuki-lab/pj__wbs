import { ArrayUtils } from '@/utils/ArrayUtils'
import { PrimaryItem } from '@/model/PrimaryItem'

/**
 * 大項目を対象のIDを元に配列から削除する
 *
 * @export
 * @param {PrimaryItem[]} _items
 * @param {...string[]} targetIds
 * @return {*}  {PrimaryItem[]}
 */
export function deletePrimaryItem(_items: PrimaryItem[], ...targetIds: string[]): PrimaryItem[] {
  const items = _items.slice()
  targetIds.forEach(targetId => {
    ArrayUtils.removeByIdFromArray(items, targetId)
  })
  return items
}