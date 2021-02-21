import { Category } from '@/model/Category';

/**
 * カテゴリーを配列の最後尾に追加
 *
 * @export
 * @param {Category[]} _items
 * @return {*}  {Category[]}
 */
export function addCreateCategory(_items: Category[]): Category[] {
  const items = _items.slice()
  const item = new Category()
  items.push(item)
  return items
}