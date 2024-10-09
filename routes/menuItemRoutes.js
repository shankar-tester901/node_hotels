const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem.js');







router.post('/', (req, res) => {
    try {
        console.log('in post menu');
        const data = req.body;
        console.log(data);
        const newMenu = new MenuItem(data);
        const response = newMenu.save();
        console.log('menu saved');
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }

})


router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data fetched ');
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json(error);
    }

})
module.exports = router;