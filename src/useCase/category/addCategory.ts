import { Category } from '@/model/Category';

/**
 * カテゴリーを配列の最後尾に追加
 *
 * @export
 * @param {Category[]} _items
 * @param {Category} item
 * @return {*}  {Category[]}
 */
export function addCategory(items: Category[], item: Category): Category[] {
  items.push(item)
  return items
}