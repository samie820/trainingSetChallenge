const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trainingSetSchema = new Schema({
    label: {
        type: String,
        required: true,
        max: 50
    },
    url: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true,
        unique: true,
    }
})

module.exports = mongoose.model('TrainingSet', trainingSetSchema);
