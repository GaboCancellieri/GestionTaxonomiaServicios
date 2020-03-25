'use strict'

var Service = require('../models/service');

// FUNCTIONS
function getServices(req, res) {
    Service.find({})
        .populate('layer')
        .populate('domain')
        .populate('standard')
        .populate('parent')
        .exec((err, services) => {
            if (err) {
                return res.status(400).json({
                    title: 'Error',
                    error: err
                });
            }
            if (!services) {
                return res.status(404).json({
                    title: 'Error',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: services
            });
        });
}

function getService(req, res) {
    Service.findById({
            '_id': req.params.idService
        })
        .populate('clinicas')
        .populate('pacientes')
        .exec(function (err, service) {
            if (err) {
                return res.status(400).json({
                    title: 'Error',
                    error: err
                });
            }
            if (!service) {
                return res.status(404).json({
                    title: 'Error',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: service
            });
        });
}

function getServiceTree(req, res) {
    Service.find({})
        .populate('domain')
        .exec(function (err, services) {
            if (err) {
                return res.status(400).json({
                    title: 'Error',
                    error: err
                });
            }

            let serviceTree = [];
            for (const service of services) {
                const serviceNode = {
                    label: service.domain.name + ': ' + service.name,
                    data: service._id,
                    expandedIcon: 'fa fa-folder-open',
                    collapsedIcon: 'fa fa-folder',
                    children: []
                }
                if (!service.service) {
                    serviceTree.push(serviceNode)
                } else {
                    for (const srvNode of serviceTree) {
                        if (srvNode.data.equals(service.service)) {
                            srvNode.children.push(serviceNode);
                        }
                    }
                }
            }

            res.status(200).json({
                message: 'Success',
                obj: serviceTree
            });
        });
}

function postService(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            title: 'Error',
            error: 'Name is a required field!'
        });
    }

    if (!req.body.layer) {
        return res.status(400).json({
            title: 'Error',
            error: 'Layer is a required field!'
        });
    }
    if (!req.body.domain) {
        return res.status(400).json({
            title: 'Error',
            error: 'Domain is a required field!'
        });
    }

    var nuevoService = new Service({
        name: req.body.name,
        layer: req.body.layer,
        domain: req.body.domain,
        standard: req.body.standard,
        parent: req.body.parent,
    })

    nuevoService.save().then(function (newService) {
        Service.populate(newService, ['layer', 'domain', 'standard', 'parent'], (error, serviceExp) => {
            res.status(201).json({
                message: 'Service creado',
                obj: serviceExp
            });
        })
    }, function (err) {
        if (err.code == 11000) {
            var msj = ''
            //Catching index name inside errmsg reported by mongo to determine the correct error and showing propper message
            if (err.errmsg.toString().includes('name'))
                msj = 'Service name';

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

function patchService(req, res) {
    Service.findById(req.params.idService, function (err, service) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!service) {
            return res.status(404).json({
                title: 'Error',
                error: 'Service no encontrado'
            });
        }

        service.nombre = req.body.nombreService;
        service.apellido = req.body.apellidoService;
        service.telefono = req.body.telefonoService;
        service.matricula = req.body.matriculaService;
        especialidad: req.body.especialidadService;

        service.save().then(function (service) {
            res.status(200).json({
                message: 'Success',
                obj: service
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function deleteService(req, res) {
    Service.findOne({
            '_id': req.params.idService
        })
        .exec(function (err, service) {
            if (service) {
                service.remove().then(function (serviceEliminado) {
                    return res.status(200).json({
                        message: 'Service eliminado correctamente',
                        obj: serviceEliminado
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
    getServices,
    getService,
    getServiceTree,
    postService,
    patchService,
    deleteService,
}