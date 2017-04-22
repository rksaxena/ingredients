"use strict";

module.exports = function (app) {
    app.use('/ingredients', require('./ingredients'));
    app.use('/api', require('./api'));
    app.use('/admin', require('./admin'));
};