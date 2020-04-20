

export const calculateBmi = (height: number, weight: number): string => {

    const result = (weight) / (height / 100 * height / 100);

    if (result < 18.5) {
        return 'underweight';
    }
    if (result >= 18.5 && result <= 25) {
        return 'normal weight';
    }
    if (result >= 25 && result <= 30) {
        return 'overweight';
    }
    if (result > 30) {
        return 'obese';
    }

    return 'null';

};

interface BmiValues {
    height: number;
    weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {

    if (args.length < 3) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');


    if (!isNaN(Number(args[2])) || !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values must be numbers');
    }
};

try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    console.log('Error happened!, message: ', e.message);
}





