const express = require('express');
const app = express();
const connectDB = require('./config/db');
const mockData = require('./config/mockdata');

// Cennect Database
connectDB();

//mockData();

//Init middleware
app.use(express.json({ extended: false }));

//Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/communities', require('./routes/api/communities'));
app.use('/api/profiles', require('./routes/api/profiles'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
