const express = require('express');

const router = express.Router();

const locationStorage = {
  location: []
};

router.post('/add-location-point',
    (request,
     response, next)=> {

    locationStorage.location.push({
      id: Math.random() * 10,
      address: request.body.address,
      coords: { lat: request.body.lat, lng: request.body.lng }
    });
    response.json({ message: 'Stored in db'});

});

router.get('/location',
    (request,
     response,
     next)=> {

});

module.exports = router;
