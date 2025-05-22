const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
}

// Add School API
router.post('/addSchool', async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Validation
        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
        }

        const [result] = await db.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );

        res.status(201).json({
            message: 'School added successfully',
            schoolId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// List Schools API
router.get('/listSchools', async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validation
        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({ error: 'Invalid latitude or longitude' });
        }

        const [schools] = await db.execute('SELECT * FROM schools');
        
        // Calculate distance for each school
        const schoolsWithDistance = schools.map(school => {
            const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
            return {
                ...school,
                distance: distance // distance in kilometers
            };
        });

        // Sort schools by distance
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;