declare const argss: string[];
interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
declare function calculateExercises(dailyHours: number[], target: number): Result;
