const planDay = require("../modules/day-plan");

describe('planDay function', () => {
    const fiveDay = ['upper legs', 'arms'];
    const fourDay = ['arms', 'chest', 'back'];
    const threeDay = ['shoulders', 'upper legs', 'lower legs', 'chest'];

    test('returns an array', () => {
        const result = planDay(fourDay);

        expect(Array.isArray(result)).toBe(true);
    });

    test('return an array with length of 6', () => {
        const result = planDay(fourDay);

        expect(result).toHaveLength(6);
    });

    test('array only contains object', () => {
        const result = planDay(fourDay);

        for(let x of result) {
            expect(typeof x).toEqual('object');
        }
    });

    test('Each object has property muscles', () => {
        const result = planDay(fourDay);

        for(let x of result) {
            expect(x).toHaveProperty('muscles');
        }
    });

    test('Muscles has length and only contains muscles given', () => {
        const result = planDay(fourDay);

        for(let x of result) {
            expect(x.muscles.length).toBeGreaterThan(0);
            expect(
                x.muscles.every(muscleOne => fourDay.some(muscleTwo => muscleOne == muscleTwo))
            ).toBe(true);
        }
    });

    test('Muscles do not border each other', () => {
        const resultOne = planDay(fourDay);
        const resultTwo = planDay(fiveDay);
        const resultThree = planDay(threeDay);

        const checkFunction = (excercise, index, whole) => {
            if(index > 0) {
                expect(
                    excercise.muscles.every(muscleOne => whole[index - 1].muscles.some(muscleTwo => muscleOne == muscleTwo))
                ).toBe(false);
            }
        }

        resultOne.forEach(checkFunction);
        resultTwo.forEach(checkFunction);
        resultThree.forEach(checkFunction);
    });

    test('All muscles are worked at least twice', () => {
        const arrays = [
            threeDay,
            fourDay,
            fiveDay
        ];

        for(let x of arrays) {
            const result = planDay(x);
            const musclesTimes = x.map(muscle => ({
                name: muscle,
                times: 0
            }));

            for(let y of musclesTimes) {
                for(let z of result) {
                    if(z.muscles.some(muscle => muscle == y.name)) {
                        y.times ++;
                    }
                }

                expect(y.times).toBeGreaterThanOrEqual(2);
            }
        }
    });

    test('throws error if there is not an array', () => {
        for(let x of ['x', 6, true, undefined, null]) {
            expect(() => {
                planDay(x);
            }).toThrow('Must be an array for parameter');
        }
    });

    test('return an empty array if given no args', () => {
        const result = planDay([]);

        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(0);
    });
});