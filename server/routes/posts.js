const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

//Get all workouts
router.get("/", async (req, res) => {
    try {
        let results = await Workout.find();
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Save workout
router.post("/", async (req, res) => {
    const workout = new Workout({
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        status: req.body.status,
        exercises: req.body.exercises,
        user: req.body.user
    })

    try {
        const savedWorkout = await workout.save();
        res.status(201).json(savedWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Find specific workout
async function getWorkout(req, res, next){
    let workout;
    try {
        workout = await Workout.findById(req.params.id);
        if(workout == null){
            return res.status(404).json({message: "Cannot find workout!"});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.workout = workout;
    next();
}

//Get specific workout
router.get("/:id", getWorkout, (req, res) => {
    res.json(res.workout);
})

//Update workout (PATCH)
router.patch("/:id", getWorkout, async (req, res) => {
    if(req.body.title != null){
        res.workout.title = req.body.title;
    }
    if(req.body.date != null){
        res.workout.date = req.body.date;
    }
    if(req.body.time != null){
        res.workout.time = req.body.time;
    }
    if(req.body.status != null){
        res.workout.status = req.body.status;
    }
    if(req.body.exercises != null){
        res.workout.exercises = req.body.exercises;
    }
    if(req.body.user != null){
        res.workout.user = req.body.user;
    }
    try {
        const updatedWorkout = await res.workout.save();
        res.json(updatedWorkout);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

//Delete workout
router.delete("/:id", getWorkout, async (req, res) => {
    try{
        await res.workout.deleteOne();
        res.json({message: "Workout deleted!"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})