/*
Reorders an array by removing item with startIndex index
and incerting it after the item with endIndex index
Example: list = [1, 2, 3, 4, 5], startIndex = 1, endIndex = 3 => Output: [1, 3, 4, 2, 5] */
export function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
