import http from 'http';
import assert from 'assert';

import '../src/server.js';

describe('Trends Store Unit Tests', () => {
    it('should return 200', done => {
        http.get('http://127.0.0.1:8080/healthcheck', res => {
            assert.equal(200, res.statusCode);
            done();
        });
    });
});

