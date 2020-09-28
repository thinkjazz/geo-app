const express = require('express');

const router = express.Router();

const locationStorage = {
  location: []
};

router.post('/add-location-point',
    (request,
     response, next)=> {
    const randomIdHandler = Math.random() * 10;
    locationStorage.location.push({
      id: randomIdHandler,
      address: request.body.address,
      coords: { lat: request.body.lat, lng: request.body.lng }
    });
    response.json({ message: 'Stored location', locId: randomIdHandler });

});

router.get('/location/:lid',
    (request,
     response,
     next)=> {
    const locationId = +request.params.lid;
    const location = locationStorage.location.find(loc => {
        return loc.id === locationId;
    });
    if (!location) {
        return response.status(404).json({message: 'Not found!'})
    }
    response.json({address: location.address, coordinates: location.coords})
});

module.exports = router;
