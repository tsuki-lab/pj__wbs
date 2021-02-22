import { PrimaryItem } from '@/model/PrimaryItem';

/**
 * 大項目を配列の最後尾に追加
 *
 * @export
 * @param {PrimaryItem[]} items
 * @param {PrimaryItem} item
 * @return {*}  {PrimaryItem[]}
 */
export function addPrimaryItem(items: PrimaryItem[], item: PrimaryItem): PrimaryItem[] {
  items.push(item)
  return items
}