mergeby
===

> A utility function to immutably merge two object arrays based on a matching key or a callback returning true

Installation
-----------------

    npm install mergeby

Usage
-----------------

```js
mergeBy(array1, array2, 'name')
```

**Arguments**

* array1 (Array) the array to merge into
* array2 (Array|Object) the array to read from
* keyOrCallback (String|Function) key to check against or function to return true
* [mergeDeep=false] (Boolean) Should merge nested objects

**Returns**

* (Array) single array containing merged objects


Examples
-----------------

The properties of the second array are merged into the first, any items from the second array which do not match will be prepended to the resulting array

```js
const arr1 = [{
    name: 'john',
    age: 18,
    petsName: 'bruno'
}, {
    name: 'sam',
    age: 24
}, {
    name: 'daisy',
    age: 28
}];

const arr2 = [{
    name: 'john',
    age: 20,
    favouriteColour: 'red'
}, {
    name: 'sam',
    age: 26,
    favouriteColour: 'blue'
}, {
    name: 'daisy',
    age: 28
}];

const result = mergeBy(arr1, arr2, 'name')

/* Result
[{
    name: 'john',
    age: 20,
    petsName: 'bruno',
    favouriteColour: 'red'
}, {
    name: 'sam',
    age: 26,
    favouriteColour: 'blue'
}, {
    name: 'daisy',
    age: 28
}];
*/

```

Nested objects can also be merged by setting ```mergeDeep=true```

```js
const arr1 = [{
    name: 'john',
    age: 18,
    address: {
        line1: 'Stone Road',
        city: 'London',
        country: 'UK'
    }
}, {
    name: 'sam',
    age: 24
}];

const arr2 = [{
    name: 'john',
    age: 18,
    address: {
        line2: 'Camden'
    }
}, {
    name: 'sam',
    age: 24
}];

const result = mergeBy(arr1, arr2, 'name', true)

/* Result
[{
    name: 'john',
    age: 18,
    address: {
        line1: 'Stone Road',
        line2: 'Camden',
        city: 'London',
        country: 'UK'
    }
}, {
    name: 'sam',
    age: 24
}]
*/

```

A comparator function can be passed instead

```js
const arr1 = [{
    name: 'john',
    age: 18,
    address: {
        line1: 'Stone Road',
        city: 'London',
        country: 'UK'
    }
}, {
    name: 'sam',
    age: 24
}];

const arr2 = [{
    name: 'john',
    age: 18,
    address: {
        line2: 'Camden'
    }
}, {
    name: 'sam',
    age: 24
}];

const result = mergeBy(arr1, arr2, (item1, item2) => {
    return item1.name === item2.name
}))

/* Result
[{
    name: 'john',
    age: 18,
    address: {
        line1: 'Stone Road',
        line2: 'Camden',
        city: 'London',
        country: 'UK'
    }
}, {
    name: 'sam',
    age: 24
}]
*/

```