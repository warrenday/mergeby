const chai = require('chai')
const expect = chai.expect

const mergeBy = require('../dist/index').default

describe('mergeBy with key comparison', function() {
    
    it('should merge the object properties of the first array into the second', function() {
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

        const expectedResult = [{
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

        expect(mergeBy(arr1, arr2, 'name')).to.deep.equal(expectedResult)
    })

    it('should prepend any new items to the array', function() {
        const arr1 = [{
            make: 'ford',
            model: 'mustang'
        }, {
            make: 'porche',
            model: '911'
        }]

        const arr2 = [{
            make: 'ford',
            model: 'focus'
        }, {
            make: 'ferrari',
            model: 'z9'
        }]

        const expectedResult = [{
            make: 'ferrari',
            model: 'z9'
        }, {
            make: 'ford',
            model: 'focus'
        }, {
            make: 'porche',
            model: '911'
        }]

        expect(mergeBy(arr1, arr2, 'make')).to.deep.equal(expectedResult)
    })

})

describe('mergeBy with callback', function() {
    
    it('should merge the object properties of the first array into the second', function() {
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

        const expectedResult = [{
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

        expect(mergeBy(arr1, arr2, (item1, item2) => {
            return item1.name === item2.name
        })).to.deep.equal(expectedResult)
    })

    it('should prepend any new items to the array', function() {
        const arr1 = [{
            make: 'ford',
            model: 'mustang'
        }, {
            make: 'porche',
            model: '911'
        }]

        const arr2 = [{
            make: 'ford',
            model: 'focus'
        }, {
            make: 'ferrari',
            model: 'z9'
        }]

        const expectedResult = [{
            make: 'ferrari',
            model: 'z9'
        }, {
            make: 'ford',
            model: 'focus'
        }, {
            make: 'porche',
            model: '911'
        }]

        expect(mergeBy(arr1, arr2, (item1, item2) => {
            return item1.make === item2.make
        })).to.deep.equal(expectedResult)
    })
    
})

describe('Merging nested objects', function() {
    
    it('should perform a shallow merge of nested objects', function() {
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

        const expectedResult = [{
            name: 'john',
            age: 18,
            address: {
                line2: 'Camden'
            }
        }, {
            name: 'sam',
            age: 24
        }]

        expect(mergeBy(arr1, arr2, 'name')).to.deep.equal(expectedResult)
    })

    it('should perform a deep merge of nested objects', function() {
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

        const expectedResult = [{
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

        expect(mergeBy(arr1, arr2, 'name', true)).to.deep.equal(expectedResult)
    })

})