const express = require('express');
const router = express.Router()

const User = require('../models/User');

// Get all users
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => console.log(err))
})


// Add user
router.post('/add', (req, res) => {
    const { name, email, mobile, message } = req.body;
    const newUser = new User({
        name, email, mobile, message,
    });

    newUser.save()
        .then(() => res.json({
            message: "User added successfully !"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error while adding user !"
        }))
});


// Update user
router.post('/update', (req, res) => {
    const { key: id, name, email, mobile, message } = req.body;

    User.findByIdAndUpdate(id, { name, email, mobile, message }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
});


// Delete user
router.post('/delete', (req, res) => {
    const { key: id } = req.body;

    User.findByIdAndDelete((id), (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
});

module.exports = router