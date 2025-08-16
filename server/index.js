const express = require('express');
const cors = require('cors');
require('./loadEnvironment'); // Load environment variables
const auth = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');

const app = express();
//Load routes
app.use('/posts', posts);
app.use('/auth', auth);
app.use('/protected', protectedRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});