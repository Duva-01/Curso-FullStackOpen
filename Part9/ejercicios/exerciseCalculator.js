"use strict";
const argss = process.argv.slice(2);
function calculateExercises(dailyHours, target) {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(h => h > 0).length;
    const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
    let rating;
    let ratingDescription;
    if (average < target / 2) {
        rating = 1;
        ratingDescription = 'you need to work much harder';
    }
    else if (average < target) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }
    else {
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
if (argss.length < 2) {
    console.log('Please provide target and at least one training day value!');
}
else {
    const target = Number(argss[0]);
    const dailyHours = argss.slice(1).map(Number);
    if (!isNaN(target) && dailyHours.every(value => !isNaN(value))) {
        console.log(calculateExercises(dailyHours, target));
    }
    else {
        console.log('All arguments should be numbers!');
    }
}
