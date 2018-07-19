var express = require('express');
var router = express.Router();

//mastercard credential
var credentials = require('../config/credentials');
var consumerKey = credentials.mastercard.consumerKey;
var keyStorePath = credentials.mastercard.keyStorePath;
var keyAlias = credentials.mastercard.keyAlias;
var keyPassword = credentials.mastercard.keyPassword;

//places api
var places = require('mastercard-places');
var initialized = false;

function init(){
    // You only need to do initialize MasterCardAPI once
    if (initialized) return;

    var MasterCardAPI = places.MasterCardAPI;

    // For production, set sandbox: false
    var authentication = new MasterCardAPI.OAuth(consumerKey, keyStorePath, keyAlias, keyPassword);
    MasterCardAPI.init({
        sandbox: process.env.NODE_ENV != "production" ,
        authentication: authentication
    });

    initialized = true;
}
module.exports = router;

//routing
router.get('/merchantPOI', getMerchantPOI);

function getMerchantPOI(req, res, next){
    init();
    
    var requestData = {
        "pageOffset": "0",
        "pageLength": "10",
        "radiusSearch": "false",
        "unit": "km",
        "distance": "14",
        "place": {
            "locationId": "300945305",
            "countryCode": "USA"
        }
    };

    places.MerchantPointOfInterest.create(requestData
    , function (error, data) {
        if (error) {
            res.status = 500;
            res.send(error);
        }
        else {
            res.send(data);
        }
    });
}

module.exports = router;