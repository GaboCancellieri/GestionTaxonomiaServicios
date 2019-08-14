'use strict'

var Standard = require('../models/standard');

// FUNCIONES
function getStandards(req, res){
    Standard.find({}, function (err, standards) {
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

function getStandard(req, res){
    var query = Paciente.findById(req.params.idStandard);
    
    query.populate({
        path: 'standards',
        model: 'Standard'
    })
    .exec(function (err, paciente) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!paciente) {
            return res.status(404).json({
                title: 'Error',
                error: 'Paciente no encontrado'
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: paciente.standards
        }); 
    });
    
 
}

function postStandard(req, res) {
    if (!req.body.nombreStandard) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso nombre'
        });
    }
    if (!req.body.dosisStandard) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso dosis'
        });
    }
    if (!req.body.cadenaFrioStandard) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso cadena frio'
        });
    }
    if (!req.body.cantidadComprimidosStandard) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso Cantidad Comprimidos'
        });
    }

    CounterStandard.findById('5cd84be999bac2e4e3fbcf23', function(err, counter){

        var nuevoStandard = new Standard({
            idStandard: counter.contador,
            nombre: req.body.nombreStandard,
            dosis: req.body.dosisStandard,
            cadenaFrio: req.body.cadenaFrioStandard,
            laboratorio: req.body.laboratorioStandard,
            cantidadComprimidos: req.body.cantidadComprimidosStandard
          
        });

        counter.contador = counter.contador + 1;

        nuevoStandard.save().then(function (nuevoStandard) {
            counter.save().then((counterGuardado) => {
                res.status(201).json({
                    message: 'Standard creado',
                    obj: nuevoStandard
                });
            })
        }, function (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        });
    });    
}

function patchStandard(req, res) {
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
                error: 'Standard no encontrado'
            });
        }

        standard.nombre = req.body.nombreStandard;
        standard.dosis = req.body.dosisStandard;
        standard.cadenaFrio = req.body.cadenaFrioStandard;
        standard.laboratorio = req.body.laboratorioStandard;
        standard.cantidadComprimidos = req.body.cantidadComprimidosStandard;

        standard.save().then(function (standard) {
            res.status(200).json({
                message: 'Success',
                obj: standard
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function deleteStandard(req, res){
    Standard.findOne({'_id': req.params.idStandards})
    .exec(function (err, standard) {
        if (standard) {
            standard.remove().then(function (standardEliminado) {
                return res.status(200).json({
                    message: 'standard eliminado correctamente',
                    obj: standardEliminado
                });
            }, function (err) {
                return res.status(400).json({
                    title: 'Error',
                    error: err.message
                });
            });
        }
        else {
            return res.status(404).json({
                title: 'Error',
                error: err.message
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

