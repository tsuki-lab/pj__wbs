import { TertiaryItem } from '@/model/TertiaryItem'

/**
 * 小項目を配列の最後尾に追加
 *
 * @export
 * @param {TertiaryItem[]} _items
 * @return {*}  {TertiaryItem[]}
 */
export function addTertiaryItem(_items: TertiaryItem[]): TertiaryItem[] {
  const items = _items.slice()
  const item = new TertiaryItem()
  items.push(item)
  return items
}