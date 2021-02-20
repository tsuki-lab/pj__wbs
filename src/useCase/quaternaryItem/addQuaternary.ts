import { QuaternaryItem } from '@/model/QuaternaryItem'

/**
 * 詳細項目を配列の最後尾に追加
 *
 * @export
 * @param {QuaternaryItem[]} _items
 * @param {string} tertiaryItemId 小項目ID
 * @return {*}  {QuaternaryItem[]}
 */
export function addQuaternaryItem(_items: QuaternaryItem[], tertiaryItemId: string): QuaternaryItem[] {
  const items = _items.slice()
  const item = new QuaternaryItem({ parentId: tertiaryItemId})
  items.push(item)
  return items
}