const express = require('express');
const router = express.Router();
const jwtVerify = require("../../middleware/jwtVerify");
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// Update user 
router.put('/update-user', [
    jwtVerify,
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error while updating User", errors: errors.array() });
    }

    try {
        // Update user by ID
        const {firstName,lastName,password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        const updatedUser = await User.updateOne(
            { _id: req.user },  // Filter by user ID from token
            { $set:  { 
                firstName,
                lastName,
                password : hashedPassword } }  // Update fields from req.body
        );

        res.json({ message: "Updated Successfully", user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;

