/**
 * Created by 8321 on 4/22/17.
 */

import {exec} from 'child_process';
import logger from 'nodejslogger'
let child;

module.exports = {
    execute: (extension) => {

        let output_file = `ingredients_${extension}.json`;
        let cmd = `sh crawl.sh ${output_file} ${extension}`;
        logger.debug(cmd);
        child = exec(cmd, (error, stdout, stderr) => {
            logger.debug(`stdout: ${stdout}`);
            logger.debug(error);
        })
    }
}
