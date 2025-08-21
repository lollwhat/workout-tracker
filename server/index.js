const express = require('express');
const cors = require('cors');
require('./loadEnvironment'); // Load environment variables
require('./db/conn');
const posts = require('./routes/posts');
const auth = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//Load routes
app.use('/posts', posts);
app.use('/auth', auth);
app.use('/protected', protectedRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});