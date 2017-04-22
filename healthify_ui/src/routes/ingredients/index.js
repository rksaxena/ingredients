/**
 * Created by Rohit Kamal Saxena on 3/3/17.
 */

import express from 'express';
import redis from 'redis';
import logger from 'nodejslogger';
import {jsonResponse} from '../../utils/generic_utils';
import {execute} from '../../utils/child_process';
import requests from 'superagent';

import redis_config from '../../config/config';
import scraper_config from '../../config/config';
let redisClient = redis.createClient({ 'host' : redis_config['host'],
                                  'port' : redis_config['port']
                                });
let router = express.Router();


router.get('/webview', (req,res)=>{
    res.render('webview');
});

router.post('/url', (req, res) =>{
    let body = req.body;

    logger.debug(body["url_extension"]);
    let url_extension = body["url_extension"];
    execute(url_extension);
    res.send(jsonResponse({type: 'success', data: "Success!!!"}));
});

router.get('/recipe', (req, res)=>{
    res.send("Success!!!")
});
module.exports = router;