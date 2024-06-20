const planDay = require("./modules/day-plan");
const findExercises = require("./modules/excercise");
const createSplit = require("./modules/split");
const repsAndWeight = require("./modules/weight-rep");

function generateWeek(maxLift, weights, days) {
    const weekDays = createSplit(days);

    for(let x in weekDays) {
        weekDays[x] = planDay(weekDays[x]);
        weekDays[x] = findExercises(weekDays[x], weights);
        
        if(weekDays[x].length > 0) {
            weekDays[x] = repsAndWeight(weekDays[x], maxLift)
        }
    }

    return weekDays;
}

module.exports = generateWeek;