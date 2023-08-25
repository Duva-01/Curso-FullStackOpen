// exerciseCalculator.ts

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h > 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
  let rating;
  let ratingDescription;

  if (average < target / 2) {
    rating = 1;
    ratingDescription = 'you need to work much harder';
  } else if (average < target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'you did great!';
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
}

export const parseExerciseArguments = (args: (string | number)[]): [number, number[]] => {
  if (args.length < 2) throw new Error('Please provide target and at least one training day value!');
  const target = Number(args[0]);
  const dailyHours = args.slice(1).map(value => Number(value));

  if (!isNaN(target) && dailyHours.every(value => !isNaN(value))) {
      return [target, dailyHours];
  } else {
      throw new Error('All arguments should be numbers!');
  }
}
