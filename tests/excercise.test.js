const { findExcercise, addWeights } = require("../modules/excercise");
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
const sampleWeights = '\left[115,145,135,130,115,70,30,35,250,140,65,235,125,180,135,55,75,75,75,90,295,285,210,170,150,75,115,95,75,95,235,115,40,25,60,30,190,135,120,120,150,25,80,90,35,85,55,240,195,80,30,35,65,140,155,145,65,65,120,70,85,65,65,100,50,65,25\right]';
const sampleWeightsOne = '\left[115,145,135,130,115,70,30,35,250,140,65,235,125,180,135,55,75,75,75,90,295,285,210,170,150,75,115,95,75,95,235,110,40,25,60,30,190,135,120,120,150,25,85,90,35,85,55,240,195,80,30,35,65,140,150,145,65,65,120,70,85,65,65,100,50,65,25\right]'

describe('addWeights function', () => {
    test('adds weight property to excercise', () => {
        addWeights(sampleWeights);

        for(let x of exercises) {
            expect(x).toHaveProperty('weight');
        }
    });

    test('adds different values based on arg', () => {
        addWeights(sampleWeights);
        const firstResult = exercises.map(excer => ({...excer}));
        addWeights(sampleWeightsOne);

        expect(firstResult).not.toMatchObject(exercises);
    });

    test('throw error if a string is not given', () => {
        for(let x of [6, [6, 6], {name: 6, age: 26}, true, undefined, null]) {
            expect(() => {
                addWeights(x);
            }).toThrow('Must be a json string array')
        }
    });

    test('throw error if a string is not transformable into object', () => {
        expect(() => {
            addWeights('cats');
        }).toThrow('Must be a json string array');
    });

    test('throws error if a string transforms not into an array', () => {
        expect(() => {
            addWeights(JSON.stringify({
                name: 'adam',
                wife: 'Eve',
                age: 100000000
            }));
        }).toThrow('Must be a json string array');
    });
});

describe('findExcercise function return object', () => {
    test('returns an object', () => {
        const result = findExcercise(sampleExcercise[0]);

        expect(typeof result).toEqual('object');
    });

    test('object has properties', () => {
        const result = findExcercise(sampleExcercise[0]);

        for(let x of ['name', 'number', 'weight', 'repRange']) {
            expect(result).toHaveProperty(x);
        }
    });

    test('repRange is equal to give repRange', () => {
        for(let x of sampleExcercise) {
            const result = findExcercise(x);

            expect(result.repRange).toEqual(x.repRange);
        }
    });
});

describe('findExcercise return value of object.name', () => {
    test('returns a string', () => {
        const result = findExcercise(sampleExcercise[0]);

        expect(typeof result.name).toEqual('string');
    });

    test('the string is an excercise', () => {
        const result = findExcercise(sampleExcercise[0]);

        expect(
            exercises.some(excercise => excercise.name == result.name)
        ).toBe(true);
    });

    test('excercise name return works the muscles requested', () => {
        for(let x of sampleExcercise) {
            const result = findExcercise(x);

            expect(
                exercises.some(exercise => {
                    if(exercise.name == result.name) {
                        return exercise.muscleGroup.some(muscleOne => x.muscles.some(muscleTwo => muscleOne == muscleTwo))
                    } else {
                        return false;
                    }
                })
            ).toBe(true);
        }
    });
});

describe('findExcercise return value of object.number', () => {
    test('returns a number', () => {
        const result = findExcercise(sampleExcercise[1]);

        expect(typeof result.number).toEqual('number');
    });

    test('returns a number equal to the index of the excercise plus 3', () => {
        const result = findExcercise(sampleExcercise[0]);
        
        const expectedIndex = exercises.findIndex(excercise => excercise.name == result.name) + 3;

        expect(result.number).toBe(expectedIndex);
    });
});

describe('findExcercise return value of object.weight', () => {
    test('returns a number', () => {
        const result = findExcercise(sampleExcercise[2]);

        expect(typeof result.weight).toEqual('number');
    });

    test('weight goes along with excercise', () => {
        addWeights(sampleWeights);

        for(let x of sampleExcercise) {
            const result = findExcercise(x);
            
            expect(result.weight).toEqual(exercises[result.number - 3].weight);
        }
    });
});