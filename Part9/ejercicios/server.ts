import express, { Request } from 'express';
import { calculateBmi, parseBmiArguments } from './bmiCalculator';
import {
  calculateExercises,
  parseExerciseArguments,
} from './exerciseCalculator';

const PROTOCOL = 'http',
  HOST = 'localhost',
  PORT = 3003;

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;

    if (typeof height !== 'string' || typeof weight !== 'string')
      throw new Error('Missing parameters.');

    const args = parseBmiArguments([height, weight]);

    res.send({
      weight: args[1],
      height: args[0],
      bmi: calculateBmi(...args),
    });
  } catch (error: unknown) {
    res.status(400).send({
      error: error instanceof Error ? error.message : 'Unknown error.',
    });
  }
});

type ExercisesReqBody = {
  daily_exercises: unknown;
  target: unknown;
};

app.post(
  '/exercises',
  (req: Request<unknown, unknown, ExercisesReqBody>, res) => {
    try {
      const { daily_exercises, target } = req.body;

      if (daily_exercises === undefined || target === undefined)
        throw new Error('Missing parameters.');

      if (
        !(
          Array.isArray(daily_exercises) &&
          daily_exercises.length > 0 &&
          daily_exercises.every(
            (h): h is string | number =>
              typeof h === 'number' || typeof h === 'string'
          )
        ) ||
        (typeof target !== 'number' && typeof target !== 'string')
      )
        throw new Error('Malformatted parameters.');

      res.send(
        calculateExercises(
          ...parseExerciseArguments([target, ...daily_exercises])
        )
      );
    } catch (error: unknown) {
      res.status(400).send({
        error: error instanceof Error ? error.message : 'Unknown error.',
      });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server listening at ${PROTOCOL}://${HOST}:${PORT}`);
});