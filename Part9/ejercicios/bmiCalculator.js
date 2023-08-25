"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBmi = void 0;
const args = process.argv.slice(2);
const calculateBmi = (height, weight) => {
    const bmi = weight / (Math.pow((height / 100), 2));
    if (bmi < 18.5)
        return "Underweight";
    if (bmi >= 18.5 && bmi < 24.9)
        return "Normal (healthy weight)";
    if (bmi >= 25 && bmi < 29.9)
        return "Overweight";
    return "Obese";
};
exports.calculateBmi = calculateBmi;
if (args.length < 2) {
    console.log('Please provide both height and weight!');
}
else {
    const height = Number(args[0]);
    const weight = Number(args[1]);
    if (!isNaN(height) && !isNaN(weight)) {
        console.log((0, exports.calculateBmi)(height, weight));
    }
    else {
        console.log('Both arguments should be numbers!');
    }
}
