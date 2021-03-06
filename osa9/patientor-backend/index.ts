import express from 'express';
import cors from 'cors';
import diagnoseRouter from './src/routes/diagnoseRouter';
import patientRouter from './src/routes/patientRouter';

const app = express();


app.use(cors());
app.use(express.json());


const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});


app.use('/api/diagnosis', diagnoseRouter);
app.use('/api/patients', patientRouter);


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});