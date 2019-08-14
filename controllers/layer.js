'use strict'
var Layer = require('../models/layer');

// FUNCIONES
function getLayers(req, res) {
    Estado.findOne({'nombre': req.params.estado}, (error, estado) => {
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

        Layer.find({'estadosLayer.estado': estado._id})
        .populate([
            {path: 'paciente'}, 
            {path: 'repartidor'}, 
            {path: 'farmacia'}, 
            {path: 'medicamento'},
            {path: 'estadosLayer.estado', model: 'Estado'}
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

function getLayer(req, res) {
    Estado.findOne({'nombre': req.params.estado}, (error, estado) => {
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

        Layer.find({'estadosLayer.estado': estado._id})
        .populate([
            {path: 'paciente'}, 
            {path: 'repartidor'}, 
            {path: 'farmacia'}, 
            {path: 'medicamento'},
            {path: 'estadosLayer.estado', model: 'Estado'}
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
    if (!req.body.fechaLayer) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso fecha'
        });
    }

    if (!req.body.idPaciente) {
        return res.status(400).json({
            title: 'Error id paciente',
            error: 'No ingreso paciente'
        });
    }

    if (!req.body.idMedicamento) {
        return res.status(400).json({
            title: 'Error id medicamento',
            error: 'No ingreso medicamento'
        });
    }

    if (!req.body.idFarmacia) {
        return res.status(400).json({
            title: 'Error id medicamento',
            error: 'No ingreso farmacia'
        });
    }

    if (!req.body.idRepartidor) {
        return res.status(400).json({
            title: 'Error id medicamento',
            error: 'No ingreso repartidor'
        });
    }

    Estado.find({})
        .exec((error, estados) => {
            if (error) {
                return res.status(400).json({
                    title: 'Error',
                    error: error
                });
            }
            if (!estados) {
                return res.status(400).json({
                    title: 'Error id medicamento',
                    error: 'No encontro estados'
                });
            }

            var estadoLayer = {
                estado: estados[0]._id,
                fecha: req.body.fechaLayer
            }

            CounterLayer.findById("5cd84be999bac2e4e3fbcf23")
                .exec((error, counterLayer) => {
                    if (error) {
                        return res.status(400).json({
                            title: 'Error',
                            error: error
                        });
                    }
                    if (!counterLayer) {
                        return res.status(400).json({
                            title: 'Error id medicamento',
                            error: 'No encontro contador layer'
                        });
                    }

                    var nuevoLayer = new Layer({
                        numero: counterLayer.contador,
                        fecha: req.body.fechaLayer,
                        paciente: req.body.idPaciente,
                        medicamento: req.body.idMedicamento,
                        farmacia: req.body.idFarmacia,
                        repartidor: req.body.idRepartidor
                    });

                    nuevoLayer.estadosLayer.push(estadoLayer);

                    counterLayer.contador = counterLayer.contador + 1;

                    nuevoLayer.save().then(function (nuevoLayer) {
                        counterLayer.save().then((counterGuardado) => {

                            Layer.populate(nuevoLayer,[
                                {path: 'paciente'},
                                {path: 'repartidor'},
                                {path: 'farmacia'},
                                {path: 'medicamento'},
                                {path: 'estadosLayer.estado'}
                            ], (error, nuevoLayerExpandido) => {
                                if (error) {
                                    return res.status(400).json({
                                        title: 'Error',
                                        error: err
                                    });
                                }
                                if (!nuevoLayerExpandido) {
                                    return res.status(400).json({
                                        title: 'Error',
                                        error: 'No se pudo expandir layer creado'
                                    });
                                }
                                res.status(201).json({
                                    message: 'Medicamento creado',
                                    obj: nuevoLayerExpandido
                                });
                            })
                        })
                    }, function (err) {
                        return res.status(404).json({
                            title: 'Error',
                            error: err
                        });
                    });
                });
        });
}



//cargo el layer cuando agrego el medicamento

function postLayer2(req, res) {
    Layer.countDocuments({}, function (err, count) {
        if (err) {
            return handleError(err)
        } //handle possible errors
        //and do some other fancy stuff
        if (!req.params.idPaciente) {
            return res.status(400).json({
                title: 'Error id paciente',
                error: err
            });
        }
        if (!req.params.idMedicamento) {
            return res.status(400).json({
                title: 'Error id medicamento',
                error: err
            });
        }
        var num = count + 1;
        Medicamento.find({
            "_id": req.params.idMedicamento
        }, function (err, medicamento) {
            if (err) {
                return res.status(400).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!medicamento) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'Medicamento no encontrado'
                });
            }
            var nuevoLayer = new Layer({

                numero: num,

                estado: "Generado",
                hora: Date.now(),
                //a partir de aca no funciona.
                cadenaFrio: medicamento[0].cadenaFrio,
                medica: medicamento[0]._id,
                pac: req.params.idPaciente


            })
            nuevoLayer.idPaciente = req.params.idPaciente;
            nuevoLayer.idMedicamento = req.params.idMedicamento;

            nuevoLayer.save().then(function (nuevoLayer) {
                res.status(201).json({
                    message: 'Layer creado',
                    obj: nuevoLayer
                });

            }, function (err) {
                if (err.code == 11000) {
                    var msj = ""
                    //Catching index name inside errmsg reported by mongo to determine the correct error and showing propper message
                    if (err.errmsg.toString().includes("idPed"))
                        msj = "Numero Layer";

                    return res.status(404).json({
                        title: 'Error',
                        error: msj + ' layer existente.'
                    });
                }
                return res.status(404).json({
                    title: 'Error',
                    error: err
                });
            });
        });
    })

}




function patchLayer(req, res) {
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
                error: 'Layer no encontrado'
            });
        }
        layer.estado = req.body.estadoLayer;
        layer.horaYFecha = req.body.horaYFechaLayer;

        layer.save().then(function (layerEditado) {
            Layer.populate(layerEditado, [{
                path: 'medica',
                model: 'Medicamento'
            }, {
                path: 'pac',
                model: 'Paciente'
            }], (error, layerEditadoExpandido) => {
                res.status(200).json({
                    message: 'Success',
                    obj: layerEditadoExpandido
                });
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function deleteLayer(req, res) {
    Layer.findOne({
            '_id': req.params.idLayer
        })
        .exec(function (err, layer) {
            if (layer) {
                layer.remove().then(function (layerEliminado) {
                    return res.status(200).json({
                        message: 'layer eliminado correctamente',
                        obj: layerEliminado
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

// EXPORT
module.exports = {
    getLayers,
    getLayer,
    postLayer,
    patchLayer,
    deleteLayer,
}