import { SecondaryItem } from '@/model/SecondaryItem'

/**
 * 中項目を配列の最後尾に追加
 *
 * @export
 * @param {SecondaryItem[]} _items
 * @param {string} primaryItemId 大項目ID
 * @return {*}  {SecondaryItem[]}
 */
export function addSecondaryItem(_items: SecondaryItem[], primaryItemId: string): SecondaryItem[] {
  const items = _items.slice()
  const item = new SecondaryItem({ parentId: primaryItemId })
  items.push(item)
  return items
}
