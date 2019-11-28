// Keep the Next 4 Lines Always at the Top of this File
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import { config } from './config';
const ENV = process.env['NODE_ENV'] === 'prod' ? 'prod' : 'dev';
process.env['CONF'] = JSON.stringify({ ...config, ...config[ENV] });
global['__basedir'] = __dirname;

import * as http from 'http';
import 'reflect-metadata';

import { app } from './app';

const port = config['port'] || process.env['PORT'] || 5000;

/**
 * Creating Server  
 * @type {'http'.Server}
 */
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  console.log('Process ' + process.pid + ' is listening to all incoming requests');
});

server.timeout = 240000;
