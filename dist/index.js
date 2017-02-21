'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * deepMergeObjects
 * Recursively merge nested objects
 * @param {Object} objectOld
 * @param {Object} objectNew
 * @returns {Object}
 */
var deepMergeObjects = function deepMergeObjects(objectOld, objectNew) {
    var recurseMerge = function recurseMerge(oldKeys, newKeys) {
        return Object.keys(newKeys).reduce(function (obj, key) {
            var newItem = newKeys[key];
            var oldItem = oldKeys[key];
            if ((typeof newItem === 'undefined' ? 'undefined' : _typeof(newItem)) === 'object' && (typeof oldItem === 'undefined' ? 'undefined' : _typeof(oldItem)) === 'object' && !Array.isArray(newItem) && !Array.isArray(oldItem)) {
                obj[key] = _extends({}, oldKeys[key], recurseMerge(oldItem, newItem));
            } else {
                obj[key] = newItem;
            }
            return obj;
        }, {});
    };

    return _extends({}, objectOld, recurseMerge(objectOld, objectNew));
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
var mergeBy = function mergeBy(items, newItems, keyOrCallback) {
    var mergeDeep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    // Ensure newItems is array - object could also be passed
    if (!Array.isArray(newItems)) {
        newItems = [newItems].filter(function (e) {
            return e;
        }); // Filter undefined/null
    }

    var comparitor = typeof keyOrCallback === 'function' ? keyOrCallback : function (item, newItem) {
        return item[keyOrCallback] === newItem[keyOrCallback];
    };

    var matchedIndexes = [];
    var combined = items.map(function (item) {
        var matchedIndex = newItems.findIndex(function (newItem) {
            return comparitor(item, newItem);
        });

        if (matchedIndex === -1) {
            return item;
        }
        matchedIndexes.push(matchedIndex);

        if (mergeDeep) {
            return deepMergeObjects(item, newItems[matchedIndex]);
        }

        return _extends({}, item, newItems[matchedIndex]);
    });

    // Add unmerged items to the front of the array
    return newItems.filter(function (e, i) {
        return matchedIndexes.indexOf(i) === -1;
    }).concat(combined);
};

exports.default = mergeBy;
//# sourceMappingURL=index.js.map