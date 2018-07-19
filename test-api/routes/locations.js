var express = require('express');
var router = express.Router();

//mastercard credential
var credentials = require('../config/credentials');
var consumerKey = credentials.mastercard.consumerKey;
var keyStorePath = credentials.mastercard.keyStorePath;
var keyAlias = credentials.mastercard.keyAlias;
var keyPassword = credentials.mastercard.keyPassword;

//location api
var locations = require('mastercard-locations');
var initialized = false;
function init(){
    // You only need to do initialize MasterCardAPI once
    if (initialized) return;

    var MasterCardAPI = locations.MasterCardAPI;
  
    // For production, set sandbox: false
    var authentication = new MasterCardAPI.OAuth(consumerKey, keyStorePath, keyAlias, keyPassword);
    MasterCardAPI.init({
        sandbox: process.env.NODE_ENV != "production" ,
        authentication: authentication
    });

    initialized = true;
}

/* ATM Location . */
router.get('/atmlocation', getAtmLocation);

function getAtmLocation(req, res, next) {
    init();
  
    var requestData = {
      "PageLength": "5",
      "PostalCode": "11101",
      "PageOffset": "0"
    };
  
    locations.ATMLocations.query(requestData
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
