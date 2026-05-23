require("dotenv").config();

const express = require('express')
const path = require('path');
const app = express()
const port = process.env.PORT;  // Added fallback port

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Custom middleware to log requests (BONUS)
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);
    next();
});

// GET / - Serve static HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /api - Alternative JSON response
app.get('/api', (req, res) => {
    res.json({ message: "My Week 2 API!🎉🎉" });
});

// POST /user - Accepts {name, email}
app.post('/user', (req, res) => {
    const { name, email } = req.body;
    
    // Error handling for missing data (400)
    if (!name || !email) {
        return res.status(400).json({ 
            error: "Missing required fields",
            message: "Both 'name' and 'email' are required"
        });
    }
    
    // Send success response (UNCOMMENTED)
    console.log(`New user: ${name} <${email}>`);
    res.json({ 
        message: `Hello, ${name}!`,
        user: { name, email }
    });
});

// GET /user/:id - User profile
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    
    // Send response (UNCOMMENTED)
    res.json({ 
        message: `User ${id} profile`,
        userId: id
    });
});

// 404 Error handling
app.use((req, res) => {
    res.status(404).json({ 
        error: "Route not found",
        message: "Please check your URL"
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: "Something went wrong!",
        message: err.message 
    });
});

// Start server
app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
    console.log(`📝 Test the API at:`);
    console.log(`   - GET  http://localhost:${port}/api`);
    console.log(`   - POST http://localhost:${port}/user`);
    console.log(`   - GET  http://localhost:${port}/user/123`);
});