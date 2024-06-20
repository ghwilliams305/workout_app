const planDay = require("./modules/day-plan");
const createSplit = require("./modules/split");
const repsAndWeight = require("./modules/weight-rep");

function generateWeek(maxLift, weights, days) {
    const weekDays = createSplit(days);

    addWeights(weights);

    for(let x in weekDays) {
        weekDays[x] = planDay(weekDays[x]);
        
        if(weekDays[x].length > 0) {
            weekDays[x] = repsAndWeight(weekDays[x], maxLift)
        }
    }

    return weekDays;
}

module.exports = generateWeek;