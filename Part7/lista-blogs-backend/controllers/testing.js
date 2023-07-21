const { readdirSync } = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const router = express.Router();

router.post('/reset', async (_request, response) => {
  const modelsPath = path.join(__dirname, '../models/');

  for (fileName of readdirSync(modelsPath)) {
    const model = require(modelsPath + fileName);
    if (model.prototype instanceof mongoose.Model) await model.deleteMany({});
  }

  response.status(204).end();
});

module.exports = router;