const findExercises = require("../modules/excercise");
const exercises = require("../stores/excercise-bank");

const sampleExcercise = [
    {
        muscles: ['arms'],
        repRange: 2,
    },
    {
        muscles: ['arms', 'chest'],
        repRange: 1,
    },
    {
        muscles: ['back', 'upper legs', 'lower legs'],
        repRange: 2,
    }
];
const sampleWeights = '[115,145,135,130,115,70,30,35,250,140,65,235,125,180,135,55,75,75,75,90,295,285,210,170,150,75,115,95,75,95,235,115,40,25,60,30,190,135,120,120,150,25,80,90,35,85,55,240,195,80,30,35,65,140,155,145,65,65,120,70,85,65,65,100,50,65,25]';
const sampleWeightsOne = '[115,145,135,130,115,70,30,35,250,140,65,235,125,180,135,55,75,75,75,90,295,285,210,170,150,75,115,95,75,95,235,110,40,25,60,30,190,135,120,120,150,25,85,90,35,85,55,240,195,80,30,35,65,140,150,145,65,65,120,70,85,65,65,100,50,65,25]';

describe('findExcercises', () => {
    describe('array', () => {
        const results = findExercises(sampleExcercise, sampleWeights);

        test('is an array', () => {
            expect(Array.isArray(results)).toEqual(true);
        });

        test('is an array within length equal to input', () => {
            expect(results).toHaveLength(sampleExcercise.length);
        });

        test('has objects as elements', () => {
            for(let x of results) {
                expect(typeof x).toEqual('object');
            }
        });

        test('object has name, number, weight, and repRange property', () => {
            for(let x of results) {
                for(let y of ['name', 'number', 'weight', 'repRange']) {
                    expect(x).toHaveProperty(y);
                }
            }
        });

        describe('number', () => {
            test('is a number', () => {
                for(let x of results) {
                    expect(typeof x.number).toEqual('number');
                }
            });

            test('is relative to an excercise', () => {
                for(let x of results) {
                    const name = exercises[x.number - 3].name;

                    expect(x.name).toBe(name);
                }
            });
        });

        describe('weight', () => {
            test('is a weight', () => {
                for(let x of results) {
                    expect(typeof x.weight).toEqual('number');
                }
            });

            test('is relative to an excercise weight', () => {
                for(let x of results) {
                    const weight = exercises[x.number - 3].weight;

                    expect(x.weight).toBe(weight);
                }
            });
        });

        describe('name', () => {
            test('is a string', () => {
                for(let x of results) {
                    expect(typeof x.name).toEqual('string');
                }
            });

            test('is relative to an excercise', () => {
                for(let x of results) {
                    const muscleGroup = exercises[x.number - 3].muscleGroup;

                    expect(muscleGroup.some(muscleOne => x.muscles.some(muscleTwo => muscleOne == muscleTwo))).toBe(true);
                }
            });
        });

        describe('repRange', () => {
            test('is a number', () => {
                for(let x of results) {
                    expect(typeof x.repRange).toEqual('number');
                }
            });

            test('Muscles is an array and repRange is a number between 1 and 3', () => {
                for(let x of results) {
                    expect(Array.isArray(x.muscles)).toBe(true);
                    expect(typeof x.repRange).toBe('number');
                    expect(x.repRange).toBeLessThanOrEqual(3);
                    expect(x.repRange).toBeGreaterThanOrEqual(1);
                }
            });

            test('is relative to an excercise', () => {
                for(let x of results) {
                    const {type, repRange} = x;

                    switch(repRange) {
                        case 1:
                            expect(type).toEqual('Barbell');
                            break;
                        case 2:
                            expect(type).toEqual('Machine');
                            break;
                        case 3:
                            expect(type).toEqual('Dumbbell');
                            break;
                    }
                }
            });
        });

        test('excercise do not repeat', () => {
            for(let x = 0; x < 1000; x++) {
                const resultTemp = findExercises(sampleExcercise, sampleWeights);

                for(let y = 0; y < resultTemp.length; y++) {
                    const name = resultTemp[y].name;

                    resultTemp[y].name = '';

                    expect(resultTemp.findIndex(excer => excer.name == name)).toBe(-1);
                }
            }
        });
    });

    describe('Errors', () => {
        describe('first parameter', () => {
            test('throws with non-array data types', () => {
                for(let x of [true, 'string', 69, null, undefined, {name: 'john', age: 69}]) {
                    expect(() => {
                        findExercises(x, sampleWeights);
                    }).toThrow(`${x} is not an array`);
                }
            });

            test('throws with bad objects as elements', () => {
                for(let x of [
                    [6, 6, 4],
                    ['s', 'string', 'str'],
                    [{}, {name: 'jim', age: 26}, true, 'pizza']
                ]) {
                    expect(() => {
                        findExercises(x, sampleWeights);
                    }).toThrow('Bad objects as elements');
                }
            });
        });

        describe('second parameter', () => {
            test('throws with non-string data types', () => {
                for(let x of [true, ['string', false, 68], 69, null, undefined, {name: 'john', age: 69}]) {
                    expect(() => {
                        findExercises(sampleExcercise, x);
                    }).toThrow(`${x} is not a string`);
                }
            });

            test('throws with non-parsable string or non-array string', () => {
                for(let x of ['string', 'cat', 'chicken', 'fish', "{'name': 'john', 'age': 69}"]) {
                    expect(() => {
                        findExercises(sampleExcercise, x);
                    }).toThrow(`${x} is a bad string`);
                }
            });

            test('throws with array string were thing are not numbers', () => {
                for(let x of ["['string', false, 68]", "[true, 'string', 69, null, undefined]", "['s', 'string', 'str']"]) {
                    expect(() => {
                        findExercises(sampleExcercise, x);
                    }).toThrow(`${x} is a bad string`);
                }
            });
        });
    });
});