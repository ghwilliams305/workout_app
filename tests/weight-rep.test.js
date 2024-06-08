const repsAndWeight = require("../modules/weight-rep");

const sampleWorkout = [
    {
        name: 'DB Narrow Squat',
        muscleGroup: [ 'upper legs', 'lower legs', 'back' ],
        weight: 65,
        muscles: [ 'back', 'upper legs', 'lower legs' ],
        repRange: 2,
        number: 68
    },
    {
        name: 'Lying Leg Curls',
        muscleGroup: [ 'upper legs' ],
        weight: 170,
        muscles: [ 'back', 'upper legs', 'lower legs' ],
        repRange: 2,
        number: 26
    },
    {
        name: 'DB Bulgarian Split Squat',
        muscleGroup: [ 'upper legs', 'lower legs', 'back' ],
        weight: 65,
        muscles: [ 'back', 'upper legs', 'lower legs' ],
        repRange: 2,
        number: 59
    },
    {
        name: 'DB Narrow Squat',
        muscleGroup: [ 'upper legs', 'lower legs', 'back' ],
        weight: 65,
        muscles: [ 'back', 'upper legs', 'lower legs' ],
        repRange: 2,
        number: 68
    },
    {
        name: 'Lying Leg Curls',
        muscleGroup: [ 'upper legs' ],
        weight: 170,
        muscles: [ 'back', 'upper legs', 'lower legs' ],
        repRange: 2,
        number: 26
    },
    {
        name: 'DB Bulgarian Split Squat',
        muscleGroup: [ 'upper legs', 'lower legs', 'back' ],
        weight: 65,
        muscles: [ 'back', 'upper legs', 'lower legs' ],
        repRange: 2,
        number: 59
    }
];

const repRanges = [
    {
        min: 20,
        max: 25
    },
    {
        min: 15,
        max: 20
    },
    {
        min: 10,
        max: 15,
    },
    {
        min: 5,
        max: 10
    },
    {
        min: 2,
        max: 5
    }
];

const sampleTotal = JSON.stringify({
    total: 16325,
})

describe('repAndWeight function return array', () => {
    test('returns a array', () => {
        const results = repsAndWeight(sampleWorkout, sampleTotal);

        expect(Array.isArray(results)).toBe(true);
    });

    test('returns an array with length equal to given array', () => {
        const results = repsAndWeight(sampleWorkout, sampleTotal);

        expect(results).toHaveLength(sampleWorkout.length);
    });

    test('returns an array of objects', () => {
        const results = repsAndWeight(sampleWorkout, sampleTotal);

        for(let x of results) {
            expect(typeof x).toEqual('object');
        }
    });
});

describe('repAndWeight function return objects', () => {
    test('objects contain name, number, set, weight, rep property', () => {
        const results = repsAndWeight(sampleWorkout, sampleTotal);

        for(let x of results) {
            for(let y of ['name', 'number', 'set', 'weight', 'rep']) {
                expect(x).toHaveProperty(y);
            }
        }
    });
});

describe('returned objects name and number property', () => {
    test('name is equal to given names', () => {
        const results = repsAndWeight(sampleWorkout, sampleTotal);

        results.forEach((excer, index) => {
            expect(excer.name).toEqual(sampleWorkout[index].name);
        });
    });

    test('number is equal to given numbers', () => {
        const results = repsAndWeight(sampleWorkout, sampleTotal);

        results.forEach((excer, index) => {
            expect(excer.number).toEqual(sampleWorkout[index].number);
        });
    });
});

describe('returned objects weight property', () => {
    test('weight is a number whole number and factor of five', () => {
        const results = repsAndWeight(sampleWorkout, sampleTotal);

        for(let x of results) {
            expect(typeof x.weight).toEqual('number');

            const expectedWeight = Math.floor(x.weight / 5) * 5;
            
            expect(x.weight).toEqual(expectedWeight);
        }
    });

    test('weight is decreased from given value', () => {
        const results = repsAndWeight(sampleWorkout, sampleTotal);

        results.forEach((excer, index) => {
            expect(excer.weight).toBeLessThan(sampleWorkout[index].weight);
        });
    });
});

describe('returned objects rep property', () => {
    test('reps is a whole number', () => {
        const results = repsAndWeight(sampleWorkout, sampleTotal);

        for(let x of results) {
            expect(typeof x.rep).toEqual('number');

            const expectedRep = Math.floor(x.rep);

            expect(x.rep).toEqual(expectedRep);
        }
    });

    test('reps is within repRange for each excercise', () => {
        const results = repsAndWeight(sampleWorkout, sampleTotal);

        for(let x of results) {
            const repRange = repRanges[x.muscleGroup.length - x.repRange + 3];

            expect(x.rep).toBeLessThanOrEqual(repRange.max);
            expect(x.rep).toBeGreaterThanOrEqual(repRange.min);
        }
    });

    test('reps matches with weight', () => {
        const results = repsAndWeight(sampleWorkout, sampleTotal);

        results.forEach((excer, index) => {
            const precentOfMax = excer.weight / sampleWorkout[index].weight;
            const expectedRep = Math.floor((precentOfMax - 0.99) / -0.02);

            expect(excer.rep).toBeLessThanOrEqual(expectedRep + 5);
            expect(excer.rep).toBeGreaterThanOrEqual(expectedRep - 5);
        });
    });
});

describe('returned objects set property', () => {
    test('set is a whole number', () => {
        const results = repsAndWeight(sampleWorkout, sampleTotal);

        for(let x of results) {
            expect(typeof x.set).toEqual('number');

            const expectedSet = Math.floor(x.set);

            expect(x.set).toEqual(expectedSet);
        }
    });

    test('set is between 3 and 5', () => {
        const results = repsAndWeight(sampleWorkout, sampleTotal);

        for(let x of results) {
            expect(x.set).toBeLessThanOrEqual(5);
            expect(x.set).toBeGreaterThanOrEqual(3);
        }
    });
});

describe('maxLift parameter output of repAndWeight', () => {
    test('actual maxLift of the workout is within 25% of the given', () => {
        const results = repsAndWeight(sampleWorkout, sampleTotal);

        const expectedMaxLift = JSON.parse(sampleTotal).total;
        const actualMaxLift = results.reduce((accumulator, currentValue) => accumulator + (currentValue.set * currentValue.weight * currentValue.rep), 0);

        expect(actualMaxLift).toBeLessThanOrEqual(expectedMaxLift * 1.25);
        expect(actualMaxLift).toBeGreaterThanOrEqual(expectedMaxLift * 0.75);
    });
});

describe('repAndWeight function with bad parameters', () => {
    test('bad primitive values for first parameter throws is not an array error', () => {
        for(let x of [90, 'str', true, null, undefined]) {
            expect(() => {
                repsAndWeight(x, sampleTotal);
            }).toThrow(`${x} is not an array`);
        }
    });

    test('bad objects values for first parameter throws is not an array error', () => {
        const sampleObject = JSON.parse(sampleTotal);

        expect(() => {
            repsAndWeight(sampleObject, sampleTotal);
        }).toThrow('Object is not an array')
    });

    test('bad arrays with no objects or bad properties for the first parameter throws bad properties or no objects', () => {
        const sampleObject = JSON.parse(sampleTotal);

        expect(() => {
            repsAndWeight([
                sampleObject,
                sampleObject,
                sampleObject,
                sampleObject,
                sampleObject,
                sampleObject
            ], sampleTotal);
        }).toThrow('Bad properties or no objects');
        expect(() => {
            repsAndWeight([90, 'str', true, null, undefined], sampleTotal);
        }).toThrow('Bad properties or no objects');
    });

    test('non string data types for the second parameter throws not a string', () => {
        const sampleObject = JSON.parse(sampleTotal);

        for(let x of [90, [6, 7, 8], true, null, undefined, sampleObject]) {
            expect(() => {
                repsAndWeight(sampleWorkout, x);
            }).toThrow(`${x} is not a string`);
        }
    });

    test('If the string cannot be transformed into number for second parameter throws bad string', () => {
        for(let x of ['cat', 'chicken', '{"number":7676}', '{"name": "john", "age": 26}', '[6, 6, 4, 3]']) {
            expect(() => {
                repsAndWeight(sampleWorkout, x);
            }).toThrow(`"${x}" is a bad string`);
        }
    });
});