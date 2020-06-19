'use strict'

var Service = require('../models/service');

// FUNCTIONS
function getServices(req, res) {
    Service.find({})
        .populate('layer')
        .populate('domain')
        .populate('standard')
        .populate('parent')
        .populate('user')
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

async function postService(req, res) {
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

    const code = await generateCode(req.body.parent, req.body.name);

    var nuevoService = new Service({
        code,
        name: req.body.name,
        layer: req.body.layer,
        domain: req.body.domain,
        standard: req.body.standard,
        parent: req.body.parent,
        user: req.body.user,
    })

    nuevoService.save().then(function (newService) {
        Service.populate(newService, ['layer', 'domain', 'standard', 'parent', 'user'], (error, serviceExp) => {
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

async function generateCode(parent, name, originalName = null) {
    let code = '';
    if (parent) {
        const realParent = await Service.findOne({ _id: parent}).exec();
        let brothers;
        if (originalName) {
            brothers = await Service.find({ parent, name: {$ne: originalName} }).exec();
        } else {
            brothers = await Service.find({ parent }).exec();
        }
        const firstIndex = realParent.code.indexOf('-');
        if (firstIndex >= 0) {
            var match = realParent.code.match(/[0-9]$/);
            if (match) {
                code = realParent.code + '.' + (brothers.length + 1);
            } else {
                code = realParent.code + (brothers.length + 1);
            }
        } else {
            var matches = name.match(/\b(\w)/g);
            var acronym = matches.join('');
            code = realParent.code + '-' + acronym.toUpperCase();
        }
    } else {
        var matches = name.match(/\b(\w)/g);
        var acronym = matches.join('');
        code = acronym.toUpperCase();
    }
    return code;
}

function patchService(req, res) {
    Service.findById(req.params.idService, async (err, service) => {
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

        if ((service.parent !== req.body.parent) || (service.name !== req.body.name)) {
            const code = await generateCode(req.body.parent, req.body.name, service.name);
            service.code = code;
        }
        service.name = req.body.name;
        service.layer = req.body.layer;
        service.domain = req.body.domain;
        service.standard = req.body.standard;
        service.parent = req.body.parent;
        service.user = req.body.user;

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
                Service.find({'parent': req.params.idService})
                .exec(async (err, services) => {
                    if (services.length > 0) {
                        const newParent = service.parent || null;
                        for (const serv of services) {
                            serv.parent = newParent;
                            serv.code = await generateCode(newParent, serv.name)
                            serv.save();
                        }
                    }
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