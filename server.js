const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const schoolRoutes = require('./routes/schools');
app.use('/api', schoolRoutes);

// ✅ Add this to handle base URL
app.get('/', (req, res) => {
    res.send('Welcome to the School Management API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
