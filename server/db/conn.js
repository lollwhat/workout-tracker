const mongoose = require('mongoose');

const connectionString = process.env.ATLAS_URI || "";
mongoose.connect(connectionString)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Error connecting to MongoDB:', err);
    })
