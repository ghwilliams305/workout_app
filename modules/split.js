const rawMuscles = require("../stores/muscle-group");
const muscles = rawMuscles.map(muscle => ({...muscle}));

const getMinMuscleFresh = (musclesPeyDay) => (Math.floor(6 / musclesPeyDay) > 2) ? 2 : Math.floor(6 / musclesPeyDay);

const isMuscleFresh = (number, musclesPerDay) => number >= getMinMuscleFresh(musclesPerDay);

const isEnoughAvailableMuscle = (musclesPerDay) => {
    let musclesAvailable = 0;
    for(let y of muscles) {
        if(isMuscleFresh(y.number, musclesPerDay)) {
            musclesAvailable ++;
        }
    }

    return (musclesAvailable >= musclesPerDay);
}

function createSplit(days) {
    if(!days) {
        throw new Error('No number of workout days given. Please insert number of days desired to workout');
    }

    const musclesPerDay = Math.floor(muscles.length * 2 / days);
    muscles.sort((a, b) => (Math.floor(Math.random() * 2)) - 1);
    const result = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    }
    
    for(let x in result) {
        muscles.sort((a, b) => b.number - a.number);

        if(days > 0 && isEnoughAvailableMuscle(musclesPerDay)) {
            for(let y of muscles) {
                if(isMuscleFresh(y.number, musclesPerDay)) {
                    if(result[x].length < musclesPerDay) {
                        result[x].push(y.name);
                        y.number = 0;
                    }
                } else {
                    y.number ++;
                }
            }

            if(result[x].length > 0) {
                days --;
            }
        } else {
            for(let y of muscles) {
                if(y.number < 2) {
                    y.number ++;
                }
            }
        }
    }
    
    return result;
}

module.exports = createSplit;