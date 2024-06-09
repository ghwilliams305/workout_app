const createSplit = require("../modules/split");
const muscles = require("../stores/muscle-group");

describe('createSplit function', () => {
    test('returns an object', () => {
        const results = createSplit(4);

        expect(typeof results).toBe('object');
    });

    test('returns an object with weekdays as properities', () => {
        const results = createSplit(4);
        const testingArray = [];

        for(let x in results) {
            testingArray.push(x);
        }

        expect(testingArray).toMatchObject(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])
    });

    test('Each properity has an array', () => {
        const results = createSplit(4);

        for(let x in results) {
            expect(Array.isArray(results[x])).toBe(true);
        }
    });

    test('There are as many non-empty arrays as days', () => {
        const resultsDays4 = createSplit(4);
        const resultsDay3 = createSplit(3);
        let actualDays1 = 0;
        let actualDays2 = 0;

        for(let x in resultsDay3) {
            if(resultsDay3[x].length > 0) {
                actualDays2 ++;
            }
        }
        for(let x in resultsDays4) {
            if(resultsDays4[x].length > 0) {
                actualDays1 ++;
            }
        }

        expect(actualDays1).toEqual(4);
        expect(actualDays2).toEqual(3);
    });

    test('Arrays only contain muscle groups', () => {
        const muscleGroups = muscles.map(muscle => muscle.name);
        const results = createSplit(4);

        for(let x in results) {
            for(let y of results[x]) {
                expect(muscleGroups.some(muscle => muscle === y)).toBe(true);
            }
        }
    });

    test('function match muscles worked per day to the days given', () => {
        const resultsDays4 = createSplit(4);
        const resultsDay3 = createSplit(3);
        const timesForThreeDays = Math.floor(muscles.length * 2 / 3);
        const timesForFourDays = Math.floor(muscles.length * 2 / 4);

        for(let x in resultsDay3) {
            if(resultsDay3[x].length > 0) {
                expect(resultsDay3[x]).toHaveLength(timesForThreeDays);
            }
        }
        for(let x in resultsDays4) {
            if(resultsDays4[x].length > 0) {
                expect(resultsDays4[x]).toHaveLength(timesForFourDays);
            }
        }
    });

    test('Each day works one of a muscle group', () => {
        const muscleGroups = muscles.map(muscle => muscle.name);
        const results = createSplit(4);

        for(let x of muscleGroups) {
            for(let y in results) {
                let numOfThatMuscle = 0;

                for(let z of results[y]) {
                    if(x == z) {
                        numOfThatMuscle ++;
                    }
                }

                expect(numOfThatMuscle).toBeLessThan(2)
            }
        }
    });

    test('Muscle have two days rest', () => {
        const {monday, tuesday, wednesday} = createSplit(4);
        const mondayMuscle = monday[0];

        expect(tuesday.some(muscle => muscle == mondayMuscle)).toBe(false);
        expect(wednesday.some(muscle => muscle == mondayMuscle)).toBe(false);
    });

    test('Throws custom error if no arguements', () => {
        expect(() => {
            createSplit();
        }).toThrow('No number of workout days given. Please insert number of days desired to workout');
    });
});