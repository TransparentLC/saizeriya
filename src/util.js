/**
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export const randomInt = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

/**
 * @template T
 * @param {T[]} arr
 * @returns {T}
 */
export const randomChoice = arr => arr[randomInt(0, arr.length - 1)];

/**
 * @template T
 * @param {T[]} arr
 * @param {(value: T, index: Number, obj: T[]) => Boolean} fn
 * @returns {T}
 */
export const pickItem = (arr, fn) => {
    const e = arr.find(fn);
    arr.splice(arr.indexOf(e), 1);
    return e;
};
