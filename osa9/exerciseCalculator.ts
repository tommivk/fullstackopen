
interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (hours: Array<number>, targetValue: number) => {
    const days = hours.length;
    const trainingDays = hours.filter((x) => x !== 0).length;
    const avgTime = hours.reduce((a, b) => a + b, 0) / days;
    const success = avgTime >= targetValue ? true : false;
    const targetHit = hours.filter((x) => x >= targetValue).length;
    let rating = 0;
    let ratingDescription = '';

    if (targetHit / days > 0.5) {
        rating = 2;
    }
    if (targetHit / days > 0.8) {
        rating = 3;
    }
    if (targetHit / days <= 0.5) {
        rating = 1;
    }

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

    const result: Result = {
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
    const arg = args.slice(3);
    const target = Number(args[2]);
    const hours: Array<number> = [];
    arg.map((x) => {
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
