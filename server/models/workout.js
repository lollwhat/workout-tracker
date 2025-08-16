const mongoose = require('mongoose');

const workoutSchema = {
    title: String,
    date: String,
    time: String,
    status: {
        type: String,
        enum: ['Active', 'Pending']
    },
    exercises: [{
        type: {
            type: String,
            enum: ['Normal Set', 'Warmup Set', 'Drop Set', 'Failure Set']
        },
        name: String,
        notes: String,
        reps: Number,
        weight: Number,
    }],
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}

const Workout = mongoose.model('Workout', workoutSchema);