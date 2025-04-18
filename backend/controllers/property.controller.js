const mongooose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Property = require('../models/property.model');
const User = require('../models/user.model');
require('dotenv').config();

exports.addProperty = async (req, res) => {
    try{
        const {name, price, location, bedRooms, hallRooms, typeOfProperty} = req.body;
        const user = req.user.id;
        if(!name || !price || !location || !bedRooms || !hallRooms || !typeOfProperty) {
            return res.status(400).json({
                success: false,
                message: "All fields are Required",
            })
        }
        const userDetails = await User.findById(req.user.id);
        if(!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User Not Found",
            })
        }
        const propertyExists = await Property.findOne({name});
        if(propertyExists) {
            return res.status(400).json({
                success: false,
                message: "Property Already Added",
            })
        } 
        const newProperty = await Property.create({
            name, price, location, bedRooms, hallRooms, typeOfProperty, owner: req.user.id,
        })
        await User.findByIdAndUpdate(
            {_id: userDetails._id},
            {
                $push: {
                    properties: newProperty._id,
                }
            },
            {new: true}
        )
        return res.status(200).json({
            success: true,
            message: "Property Added",
            data: newProperty,
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error, while Adding Property",
        })
    }
}

exports.updateProperty = async (req, res) => {
    try {
        const {propertyId} = req.params;
        const {name, price, location, bedRooms, hallRooms, typeOfProperty} = req.body;
        if(!propertyId) {
            return res.status(400).json({
                success: false,
                message: "Property Id is Required",
            })
        }
        const property = await Property.findById(propertyId);
        if(!property) {
            return res.status(400).json({
                success: false,
                message: "Property Do Not Exist",
            })
        }
        const updatedProperty = await Property.findByIdAndUpdate(propertyId, {
            name, price, location, bedRooms, hallRooms, typeOfProperty,
        }, {new: true})
        console.log('propertyId:', propertyId);
        console.log("Updated Property Data: ", updatedProperty);
        console.log('Update data:', { name, price, location, bedRooms, hallRooms, typeOfProperty });

        // await property.save();
        return res.status(200).json({
            success: true,
            message: "Property Details Updated",
            data: updatedProperty,
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error, while Updating Property",
        })
    }
}

exports.deleteProperty = async (req, res) => {
    try {
        const {propertyId} = req.params;
        if(!propertyId) {
            return res.status(400).json({
                success: false,
                message: "Property Id is Required",
            })
        }
        const property = await Property.findById(propertyId);
        if(!property) {
            return res.status(400).json({
                success: false,
                message: "Property Do Not Exist",
            })
        }
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {
                properties: propertyId,
            }
        })
        await Property.findByIdAndDelete(propertyId);
        return res.status(200).json({
            success: true,
            message: "Property Deleted",
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error, while Deleting Property",
        })
    }
}

exports.getAllProperties = async (req, res) => {
    try {
        const allProperties = await Property.find({});
        return res.status(200).json({
            success: true,
            message: "All Properties Fetched",
            data: allProperties,
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error, while Fetching All Properties",
        })
    }
}

exports.getUserProperties = async (req, res) => {
    try {
        const userId = req.user.id;
        const userProperties = await User.findById(userId).select("properties").populate("properties").exec();
        console.log("User Properties: ", userProperties);
        return res.status(200).json({
            success: true,
            message: "Fetched User Properties",
            data: userProperties,
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error, while fetching User Properties",
            errMessage: err.message,
        })
    }
}

exports.getProperty = async (req, res) => {
    try {
        const {propertyId} = req.params;
        const propertyData = await Property.findById(propertyId);
        if(!propertyId) {
            return res.status(400).json({
                success: false,
                message: "Property Id is Required"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Property Details Fetched Successfully",
            data: propertyData,
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error, while fetching Property Details"
        })
    }
}