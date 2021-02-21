/**
 * 計算を扱う汎用クラス
 *
 * @export
 * @class MathUtils
 */
export class MathUtils {

  /**
   * 小数点第一位までの数値を足し算する
   *
   * @static
   * @param {...number[]} numbers
   * @memberof MathUtils
   */
  public static sum(...numbers: number[]) {
    numbers.reduce((a, c) => {
      return ((a * 10) + (c * 10)) / 10
    })
  }

}