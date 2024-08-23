

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 4000;

// Zoom SDK credentials
const sdkKey = 'WWGB7O8DQ0OiIHTc0M4b9w';
const sdkSecret = '8QQbwGuuTPKPnoMoYLZlCgFCYaBBldQ1';

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend URL
}));

app.post('/', (req, res) => {
    const { meetingNumber, role } = req.body;
    
    // Set the expiration time and issued at time
    const iat = Math.floor(Date.now() / 1000) - 30; // Issued at time (30 seconds ago)
    const exp = iat + (60 * 60 * 2); // Expiration time (2 hours)

    // Define the payload
    const payload = {
        appKey: sdkKey,
        sdkKey: sdkKey,
        mn: meetingNumber,
        role: role,
        exp: exp,
        iat: iat,
        tokenExp: exp
    };

    // Encode the payload to generate the JWT
    const token = jwt.sign(payload, sdkSecret, { algorithm: 'HS256' });

    res.json({ signature: token });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
