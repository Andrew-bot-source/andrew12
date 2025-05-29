const express = require('express');
    const mysql = require('mysql2');
    const cors = require('cors');
    const path = require('path');
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../public')));

    // Log all incoming requests for debugging
    app.use((req, res, next) => {
        console.log(`Request: ${req.method} ${req.url}`);
        next();
    });

    // MySQL connection
    const db = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'must_lecturer_system'
    });

    db.connect(err => {
        if (err) {
            console.error('MySQL Connection Error:', err.message);
            process.exit(1);
        }
        console.log('MySQL Connected');
    });

    // Create database and table if not exists
    db.query(`
        CREATE DATABASE IF NOT EXISTS must_lecturer_system
    `, (err) => {
        if (err) {
            console.error('Database Creation Error:', err.message);
            process.exit(1);
        }
        db.query(`
            USE must_lecturer_system
        `, (err) => {
            if (err) {
                console.error('Database Selection Error:', err.message);
                process.exit(1);
            }
            db.query(`
                CREATE TABLE IF NOT EXISTS lecturers (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    fullName VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    phone VARCHAR(20) NOT NULL,
                    department VARCHAR(100) NOT NULL,
                    specialization VARCHAR(100) NOT NULL,
                    timeAvailable VARCHAR(100) NOT NULL
                )
            `, (err) => {
                if (err) {
                    console.error('Table Creation Error:', err.message);
                    process.exit(1);
                }
                console.log('Database and table ready');
            });
        });
    });

    // Get all lecturers
    app.get('/lecturers', (req, res) => {
        db.query('SELECT * FROM lecturers', (err, results) => {
            if (err) {
                console.error('Database Query Error:', err.message);
                return res.status(500).send('Server Error');
            }
            res.json(results);
        });
    });

    // Add new lecturer
    app.post('/lecturers', (req, res) => {
        const { fullName, email, phone, department, specialization, timeAvailable } = req.body;
        if (!fullName || !email || !phone || !department || !specialization || !timeAvailable) {
            return res.status(400).send('All fields are required');
        }
        db.query(
            'INSERT INTO lecturers (fullName, email, phone, department, specialization, timeAvailable) VALUES (?, ?, ?, ?, ?, ?)',
            [fullName, email, phone, department, specialization, timeAvailable],
            (err) => {
                if (err) {
                    console.error('Database Insert Error:', err.message);
                    return res.status(500).send('Server Error');
                }
                res.status(201).send('Lecturer added');
            }
        );
    });

    // Default route for root
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });