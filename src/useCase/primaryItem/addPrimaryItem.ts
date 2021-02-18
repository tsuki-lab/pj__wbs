import { PrimaryItem } from '@/model/PrimaryItem';

/**
 * 大項目を配列の最後尾に追加
 *
 * @export
 * @param {PrimaryItem[]} _items
 * @return {*}  {PrimaryItem[]}
 */
export function addPrimaryItem(_items: PrimaryItem[]): PrimaryItem[] {
  const items = _items.slice()
  const item = new PrimaryItem()
  items.push(item)
  return items
}