'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var settings = require('./settings');
var httpMsg = require('./core/httpMsg');
var user = require('./controller/user');
var product = require('./controller/product');
var company = require('./controller/company');
var order = require('./controller/order');

app.set('secert', settings.secert);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// basic route (http://localhost:<port>)
app.get('/', function (req, resp) {
    resp.send('The API is at the http://localhost:' + settings.webPort + '/api');
});

var apiRoute = express.Router();
apiRoute.post('/authenticate', function (req, resp) {
    user.authenticate(req, resp);
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoute.use(function (req, resp, next) {

    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('secert'), function (err, decoded) {
            if (err) {
                return resp.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return resp.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

// ---------------------------------------------------------
// route middleware to user api.
// ---------------------------------------------------------
apiRoute.get('/users', function (req, resp) {
    user.getList(req, resp);
});

apiRoute.get('/users/:id', function (req, resp) {
    user.get(req, resp, req.params.id);
});

apiRoute.post('/users', function (req, resp) {
    user.add(req, resp);
});

apiRoute.put('/users', function (req, resp) {
    user.update(req, resp);
});

apiRoute.delete('/users', function (req, resp) {
    user.delete(req, resp);
});

// ---------------------------------------------------------
// route middleware to product api.
// ---------------------------------------------------------
apiRoute.get('/products', function (req, resp) {
    product.getList(req, resp);
});

apiRoute.get('/products/:taxno', function (req, resp) {
    product.getProduct(req, resp, req.params.taxno);
});

apiRoute.get('/products/:taxno/:id', function (req, resp) {
    product.get(req, resp, req.params.taxno, req.params.id);
});

apiRoute.post('/products', function (req, resp) {
    product.add(req, resp);
});

apiRoute.put('/products', function (req, resp) {
    product.update(req, resp);
});

apiRoute.delete('/products', function (req, resp) {
    product.delete(req, resp);
});

// ---------------------------------------------------------
// route middleware to company api.
// ---------------------------------------------------------
apiRoute.get('/company', function (req, resp) {
    company.getList(req, resp);
});

apiRoute.get('/company/:id', function (req, resp) {
    company.get(req, resp, req.params.id);
});

apiRoute.post('/company', function (req, resp) {
    company.add(req, resp);
});

apiRoute.put('/company', function (req, resp) {
    company.update(req, resp);
});

apiRoute.delete('/company', function (req, resp) {
    company.delete(req, resp);
});

// ---------------------------------------------------------
// route middleware to order api.
// ---------------------------------------------------------
apiRoute.get('/orders', function (req, resp) {
    order.getList(req, resp);
});

apiRoute.get('/orders/:jobno', function (req, resp) {
    order.get(req, resp, req.params.jobno);
});

apiRoute.get('/', function (req, resp) {
    httpMsg.showHome(req, resp);
});

app.use('/api', apiRoute);
app.listen(settings.webPort);
console.log('Service started at http://localhost:' + settings.webPort);
//# sourceMappingURL=index.js.map