const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    category: {
        type: String,
        enum: ['Cardio', 'Strength', 'Flexibility']
    },
    muscleGroup: {
        type: String,
        enum: ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core']
    },

});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;