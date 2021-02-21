import { Category } from '@/model/Category';
import { ArrayUtils } from '@/utils/ArrayUtils';

/**
 * カテゴリーを対象のIDを元に配列から削除する
 *
 * @export
 * @param {Category[]} items
 * @param {...string[]} targetIds
 * @return {*}  {Category[]}
 */
export function deleteCategories(items: Category[], ...targetIds: string[]): Category[] {
  targetIds.forEach(targetId => {
    ArrayUtils.removeByIdFromArray(items, targetId)
  })
  return items
}