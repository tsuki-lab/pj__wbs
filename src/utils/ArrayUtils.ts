/**
 * 配列を扱う汎用クラス
 *
 * @export
 * @class ArrayUtils
 */
export class ArrayUtils {

  /**
   * 配列からIDを元に対象のデータを取り除く
   *
   * @static
   * @template T
   * @template K
   * @param {T[]} arr
   * @param {K} targetId
   * @return {*}  {(T|undefined)}
   * @memberof ArrayUtils
   */
  public static removeByIdFromArray<T extends { id: K }, K>(arr: T[], targetId: K): T|undefined {
    const targetIndex = arr.findIndex(v => v.id === targetId)

    if (targetIndex < 0) return undefined

    return arr.splice(targetIndex, 1)[0]
  }

}