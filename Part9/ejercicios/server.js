"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bmiCalculator_1 = require("./bmiCalculator");
const app = (0, express_1.default)();
const PORT = 3002;
app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (!height || !weight || isNaN(height) || isNaN(weight)) {
        res.status(400).json({ error: "malformatted parameters" });
        return;
    }
    const bmi = (0, bmiCalculator_1.calculateBmi)(height, weight);
    res.json({
        weight: weight,
        height: height,
        bmi: bmi
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
