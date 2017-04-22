/**
 * Created by Rohit Kamal Saxena on 3/3/17.
 */

import express from 'express';
let router = express.Router();

router.get('/', (req, res)=>{
    res.send("Running Ok!!!");
})

module.exports = router;