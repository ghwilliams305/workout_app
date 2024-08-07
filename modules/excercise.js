const exercises = require("../stores/excercise-bank");

const types = [null, 'Barbell', 'Machine', 'Dumbbell']

function findExercises(workout, weights) {
    if(!Array.isArray(workout)) {
        throw new Error(`${workout} is not an array`);
    } else if(typeof weights !== 'string') {
        throw new Error(`${weights} is not a string`);
    }

    try {
        const weightArray = JSON.parse(weights);

        weightArray.forEach((weight, index) => {
            exercises[index].weight = weight;
        });
    } catch(e) {
        throw new Error(`${weights} is a bad string`);
    }

    try {
        const usedIndexes = [];

        return workout.map(excercise => {
            const filteredExcerises = exercises.filter(({muscleGroup}) => muscleGroup.some(muscleOne => excercise.muscles.some(muscleTwo => muscleOne == muscleTwo)));
            let ranIndex, number, repRange;

            do {
                ranIndex = Math.floor(Math.random() * filteredExcerises.length);

                const tempExcer = filteredExcerises[ranIndex]
                
                const name = tempExcer.name;
                repRange = types.indexOf(tempExcer.type);
                number = exercises.findIndex(excer => excer.name === name) + 3;
            } while(usedIndexes.some(i => i == number));

            const choosenExcer = filteredExcerises[ranIndex];
            usedIndexes.push(number);

            return {
                ...excercise,
                ...choosenExcer,
                number: number,
                repRange: repRange
            }
        });
    } catch(e) {
        throw new Error('Bad objects as elements');
    }
}

module.exports = findExercises;