

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2);
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal (healthy weight)";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    return "Obese";
}

export const parseBmiArguments = (args: string[]): [number, number] => {
    if (args.length < 2) throw new Error('Please provide both height and weight!');
    const height = Number(args[0]);
    const weight = Number(args[1]);

    if (!isNaN(height) && !isNaN(weight)) {
        return [height, weight];
    } else {
        throw new Error('Both arguments should be numbers!');
    }
}
