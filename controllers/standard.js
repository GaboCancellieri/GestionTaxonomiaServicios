'use strict'
var Standard = require('../models/standard');
var Service = require('../models/service');

// FUNCIONES
function getStandards(req, res) {
    Standard.find({})
        .exec(function (err, standards) {
            if (err) {
                return res.status(400).json({
                    title: 'Error',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: standards
            });
        });
}

function getStandard(req, res) {
    Standard.find({ _id: req.params.idStandard})
    .exec(function (err, standards) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!standards) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: standards
        });
    });
}

function postStandard(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            title: 'Error',
            error: 'Field "Name" is required.'
        });
    }

    var newStandard = new Standard({
        name: req.body.name,
        color: req.body.color
    });

    newStandard.save().then(function (savedStandard) {
        res.status(201).json({
            message: 'Standard saved successfully',
            obj: savedStandard
        });
    }, function (err) {
        if (err.code == 11000) {
            var msj = ""
            if (err.errmsg.toString().includes("name"))
                msj = "Name";
           
            return res.status(404).json({
                title: 'Error',
                error: msj + ' already exists.'
            });
        }
        return res.status(404).json({
            title: 'Error',
            error: err
        });
    });
}

function patchStandard(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            title: 'Error',
            error: 'Field "Name" is required.'
        });
    }

    Standard.findById(req.params.idStandard, function (err, standard) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!standard) {
            return res.status(404).json({
                title: 'Error',
                error: 'Standard not found.'
            });
        }

        standard.name = req.body.name;
        standard.color = req.body.color;

        standard.save().then(function (editedStandard) {
            res.status(200).json({
                message: 'Success',
                obj: editedStandard
            });
        }, function (err) {
            if (err.code == 11000) {
                var msj = ""
                if (err.errmsg.toString().includes("name"))
                    msj = "Name";
               
                return res.status(404).json({
                    title: 'Error',
                    error: msj + ' already exists.'
                });
            }
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function deleteStandard(req, res) {
    Service.find({ standard: req.params.idStandard}).exec(function (err, services) {
        if (services && services.length > 0) {
            return res.status(400).json({
                title: 'Denied!',
                error: 'Can\'t delete standard because it is mapped with a service.'
            });
        } else {
            Standard.findOne({
                '_id': req.params.idStandard
            })
            .exec(function (err, standard) {
                if (standard) {
                    standard.remove().then(function (deletedStandard) {
                        return res.status(200).json({
                            message: 'Standard deleted successfully',
                            obj: deletedStandard
                        });
                    }, function (err) {
                        return res.status(400).json({
                            title: 'Error',
                            error: err.message
                        });
                    });
                } else {
                    return res.status(404).json({
                        title: 'Error',
                        error: err.message
                    });
                }
            });
        }
    });
}

// EXPORT
module.exports = {
    getStandards,
    getStandard,
    postStandard,
    patchStandard,
    deleteStandard,
}