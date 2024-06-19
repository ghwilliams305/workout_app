const generateWeek = require("./app");

const days = Math.floor(process.argv[2]);
let weights, maxLift = null;

if(!days) {
    throw new Error('Must have third arg');
}

process.stdin.on('data', (value) => {
    const stringValue = value.toString().trim();

    if(stringValue.toLowerCase() === 'q') {
        process.exit();
    }

    try {
        if(!maxLift) {
            const rawValue = Math.floor(stringValue);

            if(!rawValue) {
                throw new Error(`${stringValue} is not a number`);
            }

            maxLift = rawValue

            process.stdout.write('Insert weight as a string array form desmos => ');
        } else if(!weights) {
            weights = stringValue;
        } 
        
        if(maxLift && weights) {
            const weekPlan = generateWeek(maxLift, weights, days);

            console.log('\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n <==================================> \n \n');

            for(let x in weekPlan) {
                console.log(`${x.toUpperCase()}: \n \n`);
                    
                if(weekPlan[x].length > 0) {
                    for(let y of weekPlan[x]) {
                        console.log(`     ${y.name} ${y.number} | ${y.set} x ${y.weight} | ${y.rep} \n`);
                    }
                } else {
                    console.log('BREAK \n');
                }
            }

            process.stdout.write('Is this good press? (no = any key, yes = q) => ');
        }
    } catch(e) {
        maxLift = null;
        weights = null

        console.log(e);
        console.log('Try again \n');
        process.stdout.write('Insert maxLift number => ');
    }
});

process.stdout.write('Insert maxLift number => ');