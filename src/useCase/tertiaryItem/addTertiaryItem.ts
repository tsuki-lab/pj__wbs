import { TertiaryItem } from '@/model/TertiaryItem'

/**
 * 小項目を配列の最後尾に追加
 *
 * @export
 * @param {TertiaryItem[]} items
 * @param {TertiaryItem} item
 * @return {*}  {TertiaryItem[]}
 */
export function addTertiaryItem(items: TertiaryItem[], item: TertiaryItem): TertiaryItem[] {
  items.push(item)
  return items
}