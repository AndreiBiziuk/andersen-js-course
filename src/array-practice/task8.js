/* eslint-disable import/prefer-default-export */
/**
 * Реализовать функцию without в этом файле, и экспортировать ее.
 *
 * Первый аргумент - массив, второй и последующие - значения
 *
 * Функция возвращает новый массив, который наполнен теми значениями,
 * которые не передавались как второй и последующие аргументы функции
 * ([2, 1, 2, 3], 1, 2)) -> 1ца и 2ка убрались, осталась только 3ка. Вернули [3]
 * ([2, 1, 10, 20], 1, 2)) -> 1ца и 2ка убрались, остались 10, 20. Вернули [10, 20]
 *
 * console.log(without([2, 1, 2, 3], 1, 2)) -> [3]
 * console.log(without([2, 1, 10, 20], 1, 2)) -> [10, 20]
 */

export function without(list, ...rest) {
  return list.filter(x => rest.find(y => y === x) === undefined);
}