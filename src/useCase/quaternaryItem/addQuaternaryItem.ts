import { QuaternaryItem } from '@/model/QuaternaryItem'

/**
 * 詳細項目を配列の最後尾に追加
 *
 * @export
 * @param {QuaternaryItem[]} items
 * @param {QuaternaryItem} item
 * @return {*}  {QuaternaryItem[]}
 */
export function addQuaternaryItem(items: QuaternaryItem[], item: QuaternaryItem): QuaternaryItem[] {
  items.push(item)
  return items
}