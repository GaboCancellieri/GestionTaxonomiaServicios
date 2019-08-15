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
    if (!req.body.name) {
        return res.status(400).json({
            title: 'Error',
            error: 'Field "Name" is required'
        });
    }

    var newDomain = new Domain({
        name: req.body.name
    })

    newDomain.save().then(function (nuevoDomain) {
        res.status(201).json({
            message: 'Domain added successfully',
            obj: nuevoDomain
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

function patchDomain(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            title: 'Error',
            error: 'Field "Name" is required'
        });
    }

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
                error: 'Domain not found.'
            });
        }

        domain.name = req.body.name;

        domain.save().then(function (domain) {
            res.status(200).json({
                message: 'Success',
                obj: domain
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

function deleteDomain(req, res){
    Domain.findOne({'_id': req.params.idDomain})
    .exec(function (err, domain) {
        if (domain) {
            domain.remove().then(function (deletedDomain) {
                return res.status(200).json({
                    message: 'Domain deleted successfully.',
                    obj: deletedDomain
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

