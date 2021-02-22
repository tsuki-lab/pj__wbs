import { SecondaryItem } from '@/model/SecondaryItem'

/**
 * 中項目を配列の最後尾に追加
 *
 * @export
 * @param {SecondaryItem[]} items
 * @param {SecondaryItem} item
 * @return {*}  {SecondaryItem[]}
 */
export function addSecondaryItem(items: SecondaryItem[], item: SecondaryItem): SecondaryItem[] {
  items.push(item)
  return items
}