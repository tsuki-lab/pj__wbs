import { TertiaryItem } from '@/model/TertiaryItem'

/**
 * 小項目を配列の最後尾に追加
 *
 * @export
 * @param {TertiaryItem[]} _items
 * @param {string} secondaryItemId 中項目ID
 * @return {*}  {TertiaryItem[]}
 */
export function addTertiaryItem(_items: TertiaryItem[], secondaryItemId: string): TertiaryItem[] {
  const items = _items.slice()
  const item = new TertiaryItem({ parentId: secondaryItemId })
  items.push(item)
  return items
}