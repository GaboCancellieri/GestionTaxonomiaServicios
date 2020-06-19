'use strict'
var Layer = require('../models/layer');
var Service = require('../models/service');

// FUNCIONES
function getLayers(req, res) {
    Layer.find({})
        .exec(function (err, layers) {
            if (err) {
                return res.status(400).json({
                    title: 'Error',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: layers
            });
        });
}

function getLayer(req, res) {
    Estado.findOne({
        'nombre': req.params.estado
    }, (error, estado) => {
        if (error) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!estado) {
            return res.status(400).json({
                title: 'Error',
                error: 'No se encontro estado'
            });
        }

        Layer.find({
                'estadosLayer.estado': estado._id
            })
            .populate([{
                    path: 'paciente'
                },
                {
                    path: 'repartidor'
                },
                {
                    path: 'farmacia'
                },
                {
                    path: 'medicamento'
                },
                {
                    path: 'estadosLayer.estado',
                    model: 'Estado'
                }
            ])
            .exec(function (err, layers) {
                if (err) {
                    return res.status(400).json({
                        title: 'Error',
                        error: err
                    });
                }
                if (!layers) {
                    return res.status(404).json({
                        title: 'Error',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Success',
                    obj: layers
                });
            });
    });
}

function postLayer(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            title: 'Error',
            error: 'Field "Name" is required.'
        });
    }

    var newLayer = new Layer({
        name: req.body.name
    });

    newLayer.save().then(function (savedLayer) {
        res.status(201).json({
            message: 'Layer saved successfully',
            obj: savedLayer
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

function patchLayer(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            title: 'Error',
            error: 'Field "Name" is required.'
        });
    }

    Layer.findById(req.params.idLayer, function (err, layer) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!layer) {
            return res.status(404).json({
                title: 'Error',
                error: 'Layer not found.'
            });
        }

        layer.name = req.body.name;

        layer.save().then(function (editedLayer) {
            res.status(200).json({
                message: 'Success',
                obj: editedLayer
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

function deleteLayer(req, res) {
    Service.find({ layer: req.params.idLayer}).exec(function (err, services) {
        if (services && services.length > 0) {
            return res.status(400).json({
                title: 'Denied!',
                error: 'Can\'t delete layer because it is mapped with a service.'
            });
        } else {
            Layer.findOne({
                '_id': req.params.idLayer
            })
            .exec(function (err, layer) {
                if (layer) {
                    layer.remove().then(function (deletedLayer) {
                        return res.status(200).json({
                            message: 'Layer deleted successfully',
                            obj: deletedLayer
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
    getLayers,
    getLayer,
    postLayer,
    patchLayer,
    deleteLayer,
}