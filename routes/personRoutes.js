const express = require('express');
const router = express.Router();
const Person = require('../models/Person');


router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched ');
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json(error);
    }
})


router.get('/:workType', async (req, res) => {
    try {
        let wkType = req.params.workType;
        console.log(wkType);
        if (wkType == 'chef' || wkType == 'manager' || wkType == 'waiter') {
            const data = await Person.find({ work: wkType });
            console.log('data fetched ');
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ error: 'Invalid work type' });
        }


    } catch (error) {
        res.status(500).json(error);
    }
})


router.post('/', async (req, res) => {
    try {
        console.log('in post ');
        const data = req.body;
        console.log(data);
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved ');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the person's ID from the URL parameter

        // Assuming you have a Person model
        const response = await Person.findByIdAndRemove(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({ message: 'person Deleted Successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})



module.exports = router;