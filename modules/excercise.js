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

function findExcercise(excercise) {
    const matchingExcercises = exercises.filter(excer => excer.muscleGroup.some(muscleOne => excercise.muscles.some(muscleTwo => muscleOne == muscleTwo)));
    const excerciseName = matchingExcercises[Math.floor(Math.random() * matchingExcercises.length)].name

    return {
        name: excerciseName,
        number: exercises.findIndex(excer => excer.name == excerciseName) + 3,
        weight: 120,
        repRange: 2
    }
}

module.exports = {
    findExcercise,
    addWeights
};