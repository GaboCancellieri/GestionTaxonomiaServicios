'use strict'
var Domain = require('../models/domain');

// FUNCIONES
function getDomains(req, res){
    Domain.find({})
    .exec(function (err, domains) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!domains) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: domains
        });
    });
}

function getDomain(req, res){
    Domain.findById(req.params.idDomain) 
    .exec(function (err, domain) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!domain) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }

        res.status(200).json({
            message: 'Success',
            obj: domain
        });
    });
}

function postDomain(req, res) {
    if (!req.body.dniDomain) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso DNI'
        });
    }
    if (!req.body.nombreDomain) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso nombre'
        });
    }
    if (!req.body.apellidoDomain) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso apellido'
        });
    }
    if (!req.body.telefonoDomain) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso telefono'
        });
    }
    if (!req.body.direccionDomain) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso direccion'
        });
    }
    if (!req.body.barrioDomain) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso barrio'
        });
    }
    if (!req.body.fechaNacimientoDomain) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso fecha de nacimiento'
        });
    }
    
    var nuevoDomain = new Domain({
        dni: req.body.dniDomain,
        nombre: req.body.nombreDomain,
        apellido: req.body.apellidoDomain,
        telefono: req.body.telefonoDomain,
        direccion: req.body.direccionDomain,
        barrio: req.body.barrioDomain,
        fechaNacimiento:req.body.fechaNacimientoDomain
      
    })

    nuevoDomain.save().then(function (nuevoDomain) {
        res.status(201).json({
            message: 'Domain creado',
            obj: nuevoDomain
        });

    }, function (err) {
        if (err.code == 11000) {
            var msj = ""
            if (err.errmsg.toString().includes("dni"))
                msj = "DNI Domain";
           
            return res.status(404).json({
                title: 'Error',
                error: msj + ' existente.'
            });
        }
        return res.status(404).json({
            title: 'Error',
            error: err
        });
    });
}

function patchDomain(req, res) {
    Domain.findById(req.params.idDomain, function (err, domain) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!domain) {
            return res.status(404).json({
                title: 'Error',
                error: 'Domain no encontrado'
            });
        }

        domain.nombre = req.body.nombreDomain;
        domain.apellido = req.body.apellidoDomain;
        domain.telefono = req.body.telefonoDomain;
        domain.direccion = req.body.direccionDomain;
        domain.barrio = req.body.barrioDomain;
        domain.fechaNacimiento=req.body.fechaNacimientoDomain

        domain.save().then(function (domain) {
            res.status(200).json({
                message: 'Success',
                obj: domain
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function deleteDomain(req, res){
    Domain.findOne({'_id': req.params.idDomain})
    .exec(function (err, domain) {
        if (domain) {
            domain.remove().then(function (domainEliminado) {
                return res.status(200).json({
                    message: 'domain eliminado correctamente',
                    obj: domainEliminado
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
    getDomains,
    getDomain,
    postDomain,
    patchDomain,
    deleteDomain,
}

