import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello fullstack');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height ? Number(req.query.height) : null;
    const weight = req.query.weight ? Number(req.query.weight) : null;

    if (height && weight && !isNaN(height) && !isNaN(weight)) {
        const response = {
            'height': height,
            'weight': weight,
            'bmi': calculateBmi(height, weight)
        };
        res.send(response);
    } else {
        res.status(400).send({
            'error': 'malformatted parameters'
        });
    }
});


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});


app.post('/exercises', (req, res) => {
    const data = req.body;



    if (!data.target || !data.daily_exercises) {
        res.status(400).send({
            error: "parameters missing"
        });
    }

    if (isNaN(data.target)) {
        res.status(400).send({
            error: "malformatted parameters"
        });
    }
    const target: number = data.target;

    const hours: Array<number> = [];

    data.daily_exercises.map((x: number) => {
        if (isNaN(Number(x))) {
            res.status(400).send({
                error: "malformatted parameters"
            });
        }
        hours.push(Number(x));
    });


    res.status(200).send(
        calculateExercises(hours, target)
    );

});
