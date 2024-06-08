const repRanges = [
    {
        min: 20,
        max: 25
    },
    {
        min: 15,
        max: 20
    },
    {
        min: 10,
        max: 15,
    },
    {
        min: 5,
        max: 10
    },
    {
        min: 2,
        max: 5
    }
];

const weightForRep = (rep, weight) => {
    const percentOfMax = (-0.02 * rep) + 0.99;
    return weight * percentOfMax;
}

const repForWeight = (weight, weightTwo) => {
    const precentOfMax = weightTwo / weight;
    return Math.floor((precentOfMax - 0.99) / -0.02);
}

const roundExcerise = weight => Math.floor(weight / 5) * 5

const generateExcerise = ({muscleGroup, weight, repRange}, maxLift) => {
    const {min, max} = repRanges[muscleGroup.length - repRange + 3];
    let set, rep = 0;

    for(let x = min; x <= max; x++) {
        set = Math.floor(maxLift / (weightForRep(x, weight) * x));
        
        if(set >= 3 && set <= 5) {
            rep = x;
            break;
        }
    }

    if(set > 5) {
        set = 5;
        rep = min
    }

    if(set < 3) {
        set = 3;
        rep = max;
    }

    const actualWeight = roundExcerise(weightForRep(rep, weight));

    return {
        rep: rep,
        set: set,
        weight: actualWeight
    }
}


function repsAndWeight(excerciseList, rawMaxLift) {
    if(!Array.isArray(excerciseList)) {
        if(typeof excerciseList === 'object' && excerciseList !== null) {
            throw new Error('Object is not an array');
        }
        throw new Error(`${excerciseList} is not an array`);
    } else if(typeof rawMaxLift !== 'string') {
        throw new Error(`${rawMaxLift} is not a string`);
    }

    let maxLift;

    try {
        maxLift = JSON.parse(rawMaxLift).total;

        if(typeof maxLift !== 'number') {
            throw new Error();
        }
    } catch(e) {
        throw new Error(`"${rawMaxLift}" is a bad string`);
    }
    const result = [];

    try {
        excerciseList.forEach((excer, index, whole) => {
            if(index < 2) {
                const localMax = (maxLift * 0.3) * (excer.weight / (whole[0].weight + whole[1].weight));
        
                const singleExcerise = generateExcerise(excer, localMax);
        
                result.push({
                    ...excer,
                    ...singleExcerise
                });
            } else if(index < 4) {
                const localMax = (maxLift * 0.35) * (excer.weight / (whole[2].weight + whole[3].weight));
        
                const singleExcerise = generateExcerise(excer, localMax);
        
                result.push({
                    ...excer,
                    ...singleExcerise
                });
            } else {
                const localMax = (maxLift * 0.35) * (excer.weight / (whole[4].weight + whole[5].weight));
        
                const singleExcerise = generateExcerise(excer, localMax);
        
                result.push({
                    ...excer,
                    ...singleExcerise
                });
            }
        });

        return result;
    } catch(e) {
        throw new Error('Bad properties or no objects');
    }
}

module.exports = repsAndWeight;