import { QuaternaryItem } from '@/model/QuaternaryItem'

/**
 * 詳細項目を配列の最後尾に追加
 *
 * @export
 * @param {QuaternaryItem[]} _items
 * @return {*}  {QuaternaryItem[]}
 */
export function addQuaternaryItem(_items: QuaternaryItem[]): QuaternaryItem[] {
  const items = _items.slice()
  const item = new QuaternaryItem()
  items.push(item)
  return items
}