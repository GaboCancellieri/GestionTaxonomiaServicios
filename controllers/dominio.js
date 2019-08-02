var Dominio = require('../models/dominio');

function getDominios(req, res) {
    Dominio.find({})
        .exec((error, dominios) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: dominios
            });
        });
}

function getDominio(req, res) {
    Dominio.findById(req.params.idDominio)
    .exec((error, dominio) => {
        if (error) {
            return res.status(404).json({
                title: 'Error',
                error: error
            });
        }

        if (!dominio) {
            return res.status(404).json({
                title: 'Error',
                error: 'No se encontró dominio'
            });
        }

        res.status(200).json({
            message: 'Success',
            obj: dominio
        });
    });
}

function postDominio(req, res) {
    if (!req.body.nombre) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso nombre'
        });
    }
    if (!req.body.descripcion) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso descripcion'
        });
    }

    var nuevaDominio = new Dominio({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    });

    nuevaDominio.save().then((dominioGuardada) => {
        res.status(200).json({
            message: 'Success',
            obj: dominioGuardada
        });
    }, function (err) {
        // Si el nombre o el numero del contrato ya existen, devolver error
        if (err.code == 11000) {
            var msj = ""
            if (err.errmsg.toString().includes("nombre"))
                msj = "Nombre de Dominio (nombre)";

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

function patchDominio(req, res) {
    if (!req.body.nombre) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso nombre'
        });
    }
    if (!req.body.descripcion) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso descripcion'
        });
    }
    
    Dominio.findById(req.params.idDominio)
    .exec((error, dominio) => {
        if (error) {
            return res.status(400).json({
                title: 'Error',
                error: error
            });
        }
        if (!dominio) {
            return res.status(404).json({
                title: 'Error',
                error: 'Existen no se encontro área'
            });
        }
        if (req.body.nombre) {
            dominio.nombre = req.body.nombre;
        }
        if (req.body.descripcion) {
            dominio.descripcion = req.body.descripcion;            
        }

        dominio.save().then((dominioActualizada) => {
            
            res.status(200).json({
                message: 'Success',
                obj: dominioActualizada
            });
        }, function (err) {
            // Si el nombre o el numero del contrato ya existen, devolver error
            if (err.code == 11000) {
                var msj = ""
                if (err.errmsg.toString().includes("nombre"))
                    msj = "Nombre de Dominio (nombre)";
    
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
    });
}

function deleteDominio(req, res) {
    Dominio.findOneAndDelete({'_id': req.params.idDominio})
    .exec((error, dominioEliminada) => {
        if (error) {
            return res.status(400).json({
                title: 'Error',
                error: error
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: dominioEliminada
        });
    });
}

module.exports = {
    getDominios,
    getDominio,
    postDominio,
    patchDominio,
    deleteDominio
};