const muscles = require("../stores/muscle-group");

const sortMuscles = (listOfMuscles) => {
    const order = {}
    muscles.forEach((object, index) => {
        order[object.name] = (index > 2) ? index - 2.5 : index;
    });

    listOfMuscles.sort((a, b) => order[a] - order[b]);
}

function planDay(listOfMuscles) {
    if(!Array.isArray(listOfMuscles)) {
        throw new Error('Must be an array for parameter')
    }

    const result = [];
    sortMuscles(listOfMuscles);

    let y = 0;
    for(let x = 0; x < 6; x++) {
        if(listOfMuscles[y]) {
            result.push({
                muscles: [listOfMuscles[y]],
            });

            y ++;
            if(y >= listOfMuscles.length) {
                y = 0;
            }
        }
    }

    y = 0
    for(let x = 6 % listOfMuscles.length; x > 0; x--) {
        result[y].muscles.push(listOfMuscles[listOfMuscles.length - x]);
        y++;
    }

    return result;
}

module.exports = planDay;