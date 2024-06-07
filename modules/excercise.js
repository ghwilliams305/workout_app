const exercises = require("../stores/excercise-bank");

function addWeights(weights) {
    if(typeof weights !== 'string') {
        throw new Error('Must be a json string array');
    }

    let newWeights;
    try {
        newWeights = JSON.parse(weights.replace('\left[', '[').replace('\right]', ']'));

        if(!Array.isArray(newWeights)) {
            throw new Error('Must be a json string array');
        }
    } catch(e) {
        throw new Error('Must be a json string array');
    }

    exercises.forEach((excercise, index) => {
        excercise.weight = newWeights[index];
    });
}

const getExcercise = (excercise) => {
    const matchingExcercises = exercises.filter(excer => excer.muscleGroup.some(muscleOne => excercise.muscles.some(muscleTwo => muscleOne == muscleTwo)));
    return matchingExcercises[Math.floor(Math.random() * matchingExcercises.length)];
}

function findExcercise(excercise) {
    const excerciseObj = getExcercise(excercise);

    return {
        ...excerciseObj,
        ...excercise,
        number: exercises.findIndex(excer => excer.name == excerciseObj.name) + 3,
    }
}

module.exports = {
    findExcercise,
    addWeights
};