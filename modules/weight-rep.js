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

const weightForRep = (rep, weight) => weight * ((-0.02 * rep) + 0.99);

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
    } else if(set < 3) {
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

const generateSection = (excer, whole, maxLift) => {
    const localMax = (maxLift * 0.3) * (excer.weight / (whole[0].weight + whole[1].weight));
        
    const singleExcerise = generateExcerise(excer, localMax);
        
    return {
        ...excer,
        ...singleExcerise
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
                result.push(generateSection(excer, whole, maxLift));
            } else if(index < 4) {
                result.push(generateSection(excer, whole, maxLift));
            } else {
                result.push(generateSection(excer, whole, maxLift));
            }
        });

        return result;
    } catch(e) {
        throw new Error('Bad properties or no objects');
    }
}

module.exports = repsAndWeight;