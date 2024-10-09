const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var userEmail = "";
var userName = "";


const app = express();
// Enable CORS for all routes
app.use(cors());
const port = process.env.PORT || 3000; // assigns the value of the environment variable PORT to the constant port


// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Paolo2002-",
    database: 'unibookmi'
});

con.connect(err => {
    if (err) {
        return;
    }
});


app.listen(port, () => {
});


app.get('/getInfo', (req, res) => {

    res.json({ name: userName, email: userEmail });
});

// POST add user service
app.post('/addUser', (req, res) => {

    const { email, nome, password } = req.body;
    var sql = "INSERT INTO utentii (email, nome, password) VALUES (?, ?, ?)";
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return;
        }
        con.query(sql, [email, nome, hash], (err, result) => {
            if (err) {
                res.status(500).send('Error executing INSERT query:');
                return;
            } else {
                userName = nome;
                userEmail = email;
                res.status(200).json({ message: 'Insert successful' });
            }
        });
    });
});


// GET user service
app.get('/getUser', (req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    const sql = `SELECT * FROM utentii WHERE email = ?`;
    con.query(sql, [email], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Email non valida o non registrata' });
            throw err;
        } else {
            if (result.length === 0) {
                return;
            }
            const passwordUser = result[0].password;
            bcrypt.compare(password, passwordUser)
                .then(isMatch => {
                    if (isMatch) {
                        userName = result[0].nome;
                        userEmail = email;
                        return res.status(200).json({ message: 'Login successful' });
                    } else {
                        return res.status(401).json({ message: 'Invalid password' });
                    }
                })
                .catch(error => {
                    return res.status(500).json({ message: 'Internal Server Error' });
                });
        };
    });
});


// POST modify user service
app.post('/modifyPassword', (req, res) => {

    const { password, email } = req.body;
    const sql = 'UPDATE utentii SET password = ? WHERE email = ?';

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return;
        }
        con.query(sql, [hash, email], (err, result) => {
            if (err) {
                res.status(500).send('Error executing INSERT query:');
                return;
            } else {
                res.status(200).json({ message: 'Insert successful' });
            }
        });
    });
});



// Reservations --------------------------------------------------------------------


// GET all reservations
app.get('/getReservations', (req, res) => {

    const sql = `SELECT * FROM reservations WHERE email = ?`;
    con.query(sql, [userEmail], (err, result) => {
        if (err) {
            res.status(500).json({ message: `Nessuna prenotazione con email ${email}` });
            throw err;
        } else {
            res.json(result);
        };
    });
});

// POST add reservation service
app.post('/addReservation', (req, res) => {

    const { selectedDate, classroom, address } = req.body;
    var sql = "INSERT INTO reservations (email, date, roomType, address) VALUES ( ?, ?, ?, ?)";
    con.query(sql, [userEmail, selectedDate, classroom, address], (err, result) => {
        if (err) {
            res.status(500).send('Error executing INSERT query:');
            return;
        } else {
            res.status(200).json({ message: 'Insert successful' });
        }
    });
});

// DELETE reservation
app.delete('/deleteReservation', (req, res) => {

    const date = req.query.date;
    const sql = 'DELETE FROM reservations WHERE date = ?';
    con.query(sql, [date], (err, result) => {
        if (err) {
            res.status(500).send('Error executing DELETE query:');
            return;
        } else {
            res.status(200).json({ message: 'DELETE successful' });
        }
    });
});