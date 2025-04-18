const express = require('express');
const router = express.Router();

const {addProperty, updateProperty, deleteProperty, getAllProperties, getUserProperties, getProperty} = require('../controllers/property.controller');
const { auth } = require('../middlewares/auth.middleware');

router.post('/addProperty', auth, addProperty);
router.post('/updateProperty/:propertyId', auth, updateProperty);
router.delete('/deleteProperty/:propertyId', auth, deleteProperty);
router.get('/getAllProperties', getAllProperties);
router.get('/getUserProperties', auth, getUserProperties);
router.get('/getProperty/:propertyId', auth, getProperty)

module.exports = router;