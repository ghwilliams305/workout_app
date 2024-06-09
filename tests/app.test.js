const generateWeek = require("../app");
const exercises = require("../stores/excercise-bank");

const days = 4;
const maxLift = 14335;
const weights = '\left[115,145,135,130,115,70,30,35,250,140,65,235,125,180,135,55,75,75,75,90,295,285,210,170,150,75,115,95,75,95,235,115,40,25,60,30,190,135,120,120,150,25,80,90,35,85,55,240,195,80,30,35,65,140,155,145,65,65,120,70,85,65,65,100,50,65,25\right]';


describe('generateWeek return object', () => {
    const result = generateWeek(maxLift, weights, days);

    test('returns an object', () => {
        expect(typeof result).toEqual('object');
    });

    test('object has weekdays as properties', () => {
        for(let x of ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']) {
            expect(result).toHaveProperty(x);
        }
    });

    test('if day is not a rest day, it has a array of objects', () => {
        for(let x in result) {
            expect(Array.isArray(result[x])).toBe(true);

            for(let y of result[x]) {
                expect(typeof y).toEqual('object');
            }
        }
    });

    describe('generateWeek return object[weekday][index].properties', () => {
        test('has a name and number property', () => {
            for(let x in result) {
                for(let y of result[x]) {
                    expect(y).toHaveProperty('name');
                    expect(y).toHaveProperty('number');
                }
            }
        });

        test('has a set, rep, and weight property', () => {
            for(let x in result) {
                for(let y of result[x]) {
                    expect(y).toHaveProperty('rep');
                    expect(y).toHaveProperty('set');
                    expect(y).toHaveProperty('weight');
                }
            }
        });
    });
});

describe('generateWeek sets exercises weights', () => {
    test('adds weight to excercises', () => {
        generateWeek(maxLift, weights, days)

        for(let x of exercises) {
            expect(x).toHaveProperty('weight');
        }
    });
});

describe('generateWeek bad parameters', () => {
    describe('bad first parameter', () => {
        test('throws not a number error', () => {
            for(let x of ['string', true, null, undefined, [7, 6, 3], {name: 60, age: 'john'}]) {
                expect(() => {
                    generateWeek(x, weights, days);
                }).toThrow(`${x} is not a number`);
            }
        });
    });

    describe('bad second parameter', () => {
        test('throws not a string error', () => {
            for(let x of [90, true, null, undefined, [7, 6, 3], {name: 60, age: 'john'}]) {
                expect(() => {
                    generateWeek(maxLift, x, days);
                }).toThrow();
            }
        });
    });

    describe('bad thrid parameter', () => {
        test('throws not a number error', () => {
            for(let x of ['string', true, null, undefined, [7, 6, 3], {name: 60, age: 'john'}]) {
                expect(() => {
                    generateWeek(maxLift, weights, x);
                }).toThrow(`${x} is not a number`);
            }
        });
    });
});