const planDay = require("./modules/day-plan");
const findExercises = require("./modules/excercise");
const createSplit = require("./modules/split");
const repsAndWeight = require("./modules/weight-rep");

function generateWeek(maxLift, weights, days) {
    const weekDays = createSplit(days);

    for(let x in weekDays) {
        if(weekDays[x].length < 1) {
            continue;
        }

        weekDays[x] = planDay(weekDays[x]);
        weekDays[x] = findExercises(weekDays[x], weights);
        weekDays[x] = repsAndWeight(weekDays[x], maxLift);
    }

    return weekDays;
}

module.exports = generateWeek;