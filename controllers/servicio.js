var Servicio = require('../models/servicio');

function getServicios(req, res) {
    Servicio.find({})
        .exec((error, servicios) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: servicios
            });
        });
}

function getServicio(req, res) {
    Servicio.findById(req.params.idServicio)
    .exec((error, servicio) => {
        if (error) {
            return res.status(404).json({
                title: 'Error',
                error: error
            });
        }

        if (!servicio) {
            return res.status(404).json({
                title: 'Error',
                error: 'No se encontró servicio'
            });
        }

        res.status(200).json({
            message: 'Success',
            obj: servicio
        });
    });
}

function postServicio(req, res) {
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

    var nuevaServicio = new Servicio({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    });

    nuevaServicio.save().then((servicioGuardada) => {
        res.status(200).json({
            message: 'Success',
            obj: servicioGuardada
        });
    }, function (err) {
        // Si el nombre o el numero del contrato ya existen, devolver error
        if (err.code == 11000) {
            var msj = ""
            if (err.errmsg.toString().includes("nombre"))
                msj = "Nombre de Servicio (nombre)";

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

function patchServicio(req, res) {
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
    
    Servicio.findById(req.params.idServicio)
    .exec((error, servicio) => {
        if (error) {
            return res.status(400).json({
                title: 'Error',
                error: error
            });
        }
        if (!servicio) {
            return res.status(404).json({
                title: 'Error',
                error: 'Existen no se encontro área'
            });
        }
        if (req.body.nombre) {
            servicio.nombre = req.body.nombre;
        }
        if (req.body.descripcion) {
            servicio.descripcion = req.body.descripcion;            
        }

        servicio.save().then((servicioActualizada) => {
            
            res.status(200).json({
                message: 'Success',
                obj: servicioActualizada
            });
        }, function (err) {
            // Si el nombre o el numero del contrato ya existen, devolver error
            if (err.code == 11000) {
                var msj = ""
                if (err.errmsg.toString().includes("nombre"))
                    msj = "Nombre de Servicio (nombre)";
    
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

function deleteServicio(req, res) {
    Servicio.findOneAndDelete({'_id': req.params.idServicio})
    .exec((error, servicioEliminada) => {
        if (error) {
            return res.status(400).json({
                title: 'Error',
                error: error
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: servicioEliminada
        });
    });
}

module.exports = {
    getServicios,
    getServicio,
    postServicio,
    patchServicio,
    deleteServicio
};