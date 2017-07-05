/**
 * deepMergeObjects
 * Recursively merge nested objects
 * @param {Object} objectOld
 * @param {Object} objectNew
 * @returns {Object}
 */
const deepMergeObjects = (objectOld, objectNew) => {
    const recurseMerge = (oldKeys, newKeys) => {
        return Object.keys(newKeys).reduce((obj, key) => {
            const newItem = newKeys[key]
            const oldItem = oldKeys[key]
            if (typeof newItem === 'object' && typeof oldItem === 'object'
            && !Array.isArray(newItem) && !Array.isArray(oldItem)) {
                obj[key] = {
                    ...oldKeys[key],
                    ...recurseMerge(oldItem, newItem),
                };
            } else {
                obj[key] = newItem;
            }
            return obj;
        }, {});
    };

    return {
        ...objectOld,
        ...recurseMerge(objectOld, objectNew),
    };
};

/**
 * mergeBy
 * Merge two arrays of objects
 * @param {Array.<Object>} items
 * @param {Array.<Object>} newItems
 * @param {Function|String} keyOrCallback
 * @param {boolean} [mergeDeep=false]
 * @returns {Array.<Object>}
 */
const mergeBy = (items, newItems, keyOrCallback, mergeDeep = false) => {
    // Ensure newItems is array - object could also be passed
    if(!Array.isArray(newItems)) {
        newItems = [newItems].filter(e => e); // Filter undefined/null
    }

    const comparitor = typeof keyOrCallback === 'function' 
        ? keyOrCallback 
        : (item, newItem) => item[keyOrCallback] === newItem[keyOrCallback]

    const matchedIndexes = [];
    const combined = items.map((item) => {
        const matchedIndex = newItems.findIndex(newItem => comparitor(item, newItem));

        if (matchedIndex === -1) {
            return item;
        }
        matchedIndexes.push(matchedIndex);

        if (mergeDeep) {
            return deepMergeObjects(item, newItems[matchedIndex]);
        }

        return {
            ...item,
            ...newItems[matchedIndex],
        };
    });

    // Add unmerged items to the end of the array
    return combined.concat(
        newItems.filter((e, i) => matchedIndexes.indexOf(i) === -1)
    )
};

export default mergeBy;
