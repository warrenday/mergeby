import { LooseObject, ComparitorFunction, MergedObject } from './types';

const defaultComparitor = (compareKey: string): ComparitorFunction => (
  item,
  newItem
) => item[compareKey] === newItem[compareKey];

const deepMergeObjects = <T extends LooseObject, K extends LooseObject>(
  objectOld: T,
  objectNew: K
): T & K => {
  const recurseMerge = (oldObjectLayer: T, newObjectLayer: K) => {
    let mergedObject: LooseObject = {};

    for (const key in newObjectLayer) {
      const oldItem = oldObjectLayer[key];
      const newItem = newObjectLayer[key];
      const isMergable =
        typeof oldItem === 'object' &&
        typeof newItem === 'object' &&
        !Array.isArray(oldItem) &&
        !Array.isArray(newItem);

      if (isMergable) {
        mergedObject[key] = {
          ...oldObjectLayer[key],
          ...recurseMerge(oldItem, newItem),
        };
      } else {
        mergedObject[key] = newItem;
      }
    }

    return mergedObject as T & K;
  };

  return {
    ...objectOld,
    ...recurseMerge(objectOld, objectNew),
  };
};

/**
 * Merge two arrays of objects
 * @param items Object array to merge new data into
 * @param newItems Object or array of objects to merge into the first array
 * @param keyOrCallback String or callback to match objects
 * @param mergeDeep On match, merged all nested objects
 */
const mergeBy = <T extends LooseObject, K extends LooseObject>(
  items: T[],
  newItems: K | K[],
  keyOrCallback: string | ComparitorFunction,
  mergeDeep = false
): MergedObject<T, K>[] => {
  const newItemsArray = !Array.isArray(newItems)
    ? [newItems]
    : newItems.filter(e => e);
  const comparitor =
    typeof keyOrCallback === 'string'
      ? defaultComparitor(keyOrCallback)
      : keyOrCallback;

  const mergedItemIndexes: number[] = [];
  const mergedItems = items.map(
    (item): MergedObject<T, K> => {
      const matchedIndex = newItemsArray.findIndex(newItem =>
        comparitor(item, newItem)
      );
      if (matchedIndex === -1) {
        return item;
      }

      mergedItemIndexes.push(matchedIndex);

      if (mergeDeep) {
        return deepMergeObjects(item, newItemsArray[matchedIndex]);
      }
      return {
        ...item,
        ...newItemsArray[matchedIndex],
      };
    }
  );

  // Append unmerged items to the array
  const unmergedItems = newItemsArray.filter(
    (_, i) => mergedItemIndexes.indexOf(i) === -1
  );
  return mergedItems.concat(unmergedItems);
};

export default mergeBy;
export { LooseObject, ComparitorFunction, MergedObject };
