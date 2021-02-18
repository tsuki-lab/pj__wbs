import { SecondaryItem } from '@/model/SecondaryItem'

/**
 * 中項目を配列の最後尾に追加
 *
 * @export
 * @param {SecondaryItem[]} _items
 * @return {*}  {SecondaryItem[]}
 */
export function addSecondaryItem(_items: SecondaryItem[]): SecondaryItem[] {
  const items = _items.slice()
  const item = new SecondaryItem()
  items.push(item)
  return items
}