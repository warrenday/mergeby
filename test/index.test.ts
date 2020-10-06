import mergeBy from '../src/index';

describe('mergeBy with key comparison', function() {
  it('merges the object properties of the first array into the second', function() {
    const arr1 = [
      {
        name: 'john',
        age: 18,
        petsName: 'bruno',
      },
      {
        name: 'sam',
        age: 24,
      },
      {
        name: 'daisy',
        age: 28,
      },
    ];

    const arr2 = [
      {
        name: 'john',
        age: 20,
        favouriteColour: 'red',
      },
      {
        name: 'sam',
        age: 26,
        favouriteColour: 'blue',
      },
      {
        name: 'daisy',
        age: 28,
      },
    ];

    const expectedResult = [
      {
        name: 'john',
        age: 20,
        petsName: 'bruno',
        favouriteColour: 'red',
      },
      {
        name: 'sam',
        age: 26,
        favouriteColour: 'blue',
      },
      {
        name: 'daisy',
        age: 28,
      },
    ];

    expect(mergeBy(arr1, arr2, 'name')).toEqual(expectedResult);
  });

  it('Appends any new items to the array', function() {
    const arr1 = [
      {
        make: 'ford',
        model: 'mustang',
      },
      {
        make: 'porche',
        model: '911',
      },
    ];

    const arr2 = [
      {
        make: 'ford',
        model: 'focus',
      },
      {
        make: 'ferrari',
        model: 'z9',
      },
    ];

    const expectedResult = [
      {
        make: 'ford',
        model: 'focus',
      },
      {
        make: 'porche',
        model: '911',
      },
      {
        make: 'ferrari',
        model: 'z9',
      },
    ];

    expect(mergeBy(arr1, arr2, 'make')).toEqual(expectedResult);
  });

  it('Handles null and undefined values', function() {
    const arr1 = [
      {
        make: 'ford',
        model: null,
      },
      {
        make: 'porche',
        model: '911',
      },
    ];

    const arr2 = [
      {
        make: 'ford',
        model: 'focus',
      },
      {
        make: 'porche',
        model: undefined,
      },
    ];

    const expectedResult = [
      {
        make: 'ford',
        model: 'focus',
      },
      {
        make: 'porche',
        model: undefined,
      },
    ];

    expect(mergeBy(arr1, arr2, 'make')).toEqual(expectedResult);
  });
});

describe('mergeBy with callback', function() {
  it('Merges the object properties of the first array into the second', function() {
    const arr1 = [
      {
        name: 'john',
        age: 18,
        petsName: 'bruno',
      },
      {
        name: 'sam',
        age: 24,
      },
      {
        name: 'daisy',
        age: 28,
      },
    ];

    const arr2 = [
      {
        name: 'john',
        age: 20,
        favouriteColour: 'red',
      },
      {
        name: 'sam',
        age: 26,
        favouriteColour: 'blue',
      },
      {
        name: 'daisy',
        age: 28,
      },
    ];

    const expectedResult = [
      {
        name: 'john',
        age: 20,
        petsName: 'bruno',
        favouriteColour: 'red',
      },
      {
        name: 'sam',
        age: 26,
        favouriteColour: 'blue',
      },
      {
        name: 'daisy',
        age: 28,
      },
    ];

    expect(
      mergeBy(arr1, arr2, function(item1, item2) {
        return item1.name === item2.name;
      })
    ).toEqual(expectedResult);
  });

  it('Appends any new items to the array', function() {
    const arr1 = [
      {
        make: 'ford',
        model: 'mustang',
      },
      {
        make: 'porche',
        model: '911',
      },
    ];

    const arr2 = [
      {
        make: 'ford',
        model: 'focus',
      },
      {
        make: 'ferrari',
        model: 'z9',
      },
    ];

    const expectedResult = [
      {
        make: 'ford',
        model: 'focus',
      },
      {
        make: 'porche',
        model: '911',
      },
      {
        make: 'ferrari',
        model: 'z9',
      },
    ];

    expect(
      mergeBy(arr1, arr2, function(item1, item2) {
        return item1.make === item2.make;
      })
    ).toEqual(expectedResult);
  });
});

describe('Merging nested objects', function() {
  it('Performs a shallow merge of nested objects', function() {
    const arr1 = [
      {
        name: 'john',
        age: 18,
        address: {
          line1: 'Stone Road',
          city: 'London',
          country: 'UK',
        },
      },
      {
        name: 'sam',
        age: 24,
      },
    ];

    const arr2 = [
      {
        name: 'john',
        age: 18,
        address: {
          line2: 'Camden',
        },
      },
      {
        name: 'sam',
        age: 24,
      },
    ];

    const expectedResult = [
      {
        name: 'john',
        age: 18,
        address: {
          line2: 'Camden',
        },
      },
      {
        name: 'sam',
        age: 24,
      },
    ];

    expect(mergeBy(arr1, arr2, 'name')).toEqual(expectedResult);
  });

  it('Perform a deep merge of nested objects', function() {
    const arr1 = [
      {
        name: 'john',
        age: 18,
        address: {
          line1: 'Stone Road',
          city: 'London',
          country: 'UK',
        },
      },
      {
        name: 'sam',
        age: 24,
      },
    ];

    const arr2 = [
      {
        name: 'john',
        age: 18,
        address: {
          line2: 'Camden',
        },
      },
      {
        name: 'sam',
        age: 24,
      },
    ];

    const expectedResult = [
      {
        name: 'john',
        age: 18,
        address: {
          line1: 'Stone Road',
          line2: 'Camden',
          city: 'London',
          country: 'UK',
        },
      },
      {
        name: 'sam',
        age: 24,
      },
    ];

    expect(mergeBy(arr1, arr2, 'name', true)).toEqual(expectedResult);
  });
});
