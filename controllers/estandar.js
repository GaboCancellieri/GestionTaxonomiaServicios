var Estandar = require('../models/estandar');

function getEstandares(req, res) {
    Estandar.find({})
        .exec((error, estandares) => {
            if (error) {
                return res.status(404).json({
                    title: 'Error',
                    error: error
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: estandares
            });
        });
}

function getEstandar(req, res) {
    Estandar.findById(req.params.idEstandar)
    .exec((error, estandar) => {
        if (error) {
            return res.status(404).json({
                title: 'Error',
                error: error
            });
        }

        if (!estandar) {
            return res.status(404).json({
                title: 'Error',
                error: 'No se encontró estandar'
            });
        }

        res.status(200).json({
            message: 'Success',
            obj: estandar
        });
    });
}

function postEstandar(req, res) {
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

    var nuevaEstandar = new Estandar({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    });

    nuevaEstandar.save().then((estandarGuardada) => {
        res.status(200).json({
            message: 'Success',
            obj: estandarGuardada
        });
    }, function (err) {
        // Si el nombre o el numero del contrato ya existen, devolver error
        if (err.code == 11000) {
            var msj = ""
            if (err.errmsg.toString().includes("nombre"))
                msj = "Nombre de Estandar (nombre)";

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

function patchEstandar(req, res) {
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
    
    Estandar.findById(req.params.idEstandar)
    .exec((error, estandar) => {
        if (error) {
            return res.status(400).json({
                title: 'Error',
                error: error
            });
        }
        if (!estandar) {
            return res.status(404).json({
                title: 'Error',
                error: 'Existen no se encontro área'
            });
        }
        if (req.body.nombre) {
            estandar.nombre = req.body.nombre;
        }
        if (req.body.descripcion) {
            estandar.descripcion = req.body.descripcion;            
        }

        estandar.save().then((estandarActualizada) => {
            
            res.status(200).json({
                message: 'Success',
                obj: estandarActualizada
            });
        }, function (err) {
            // Si el nombre o el numero del contrato ya existen, devolver error
            if (err.code == 11000) {
                var msj = ""
                if (err.errmsg.toString().includes("nombre"))
                    msj = "Nombre de Estandar (nombre)";
    
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

function deleteEstandar(req, res) {
    Estandar.findOneAndDelete({'_id': req.params.idEstandar})
    .exec((error, estandarEliminada) => {
        if (error) {
            return res.status(400).json({
                title: 'Error',
                error: error
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: estandarEliminada
        });
    });
}

module.exports = {
    getEstandares,
    getEstandar,
    postEstandar,
    patchEstandar,
    deleteEstandar
};