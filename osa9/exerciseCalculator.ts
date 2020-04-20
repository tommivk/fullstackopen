
interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number;
};

const calculateExercises = (hours: Array<number>, targetValue: number) => {
    let days = hours.length;
    let trainingDays = hours.filter((x) => x !== 0).length;
    let avgTime = hours.reduce((a, b) => a + b, 0) / days;
    let success = avgTime >= targetValue ? true : false;
    let targetHit = hours.filter((x) => x >= targetValue).length;
    let rating;
    let ratingDescription;

    if (targetHit / days > 0.5) {
        rating = 2;
    };
    if (targetHit / days > 0.8) {
        rating = 3;
    };
    if (targetHit / days <= 0.5) {
        rating = 1;
    };

    switch (rating) {
        case 1:
            ratingDescription = 'bad';
            break;
        case 2:
            ratingDescription = 'ok';
            break;
        case 3:
            ratingDescription = 'excellent';
            break;
    }

    let result: Result = {
        periodLength: days,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetValue,
        average: avgTime
    };
    return result;
};

interface Hours {
    hours: Array<number>;
    target: number;
}

const parseArguments = (args: Array<string>): Hours => {

    if (args.length < 4) throw new Error('Not enough arguments');
    const arguments = args.slice(3);
    const target = Number(args[2]);
    let hours: Array<number> = [];
    arguments.map((x) => {
        if (isNaN(Number(x)) || isNaN(Number(target))) {
            throw new Error('Provided values must be numbers');
        }
        hours.push(Number(x));
    });

    return {
        hours,
        target
    };
};

try {
    const { hours, target } = parseArguments(process.argv);
    console.log(calculateExercises(hours, target));
} catch (e) {
    console.log('Error happened! message: ', e.message);
}
