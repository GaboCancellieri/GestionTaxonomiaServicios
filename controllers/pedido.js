'use strict'

var Pedido = require('../models/pedido');
var Medicamento = require('../models/medicamento');
const CronJob = require('../node_modules/cron/lib/cron').CronJob; // necesario para la tarea una vez al dia. 
var Paciente = require('../models/paciente');
var CounterPedido = require('../models/counterPedido');
var Estado = require('../models/estado');

//Creo los pedidos automaticamente.
const job = new CronJob('*/10 * * * * *', function () {
    /*

        //Decremento en 1 los dias restantes.
        console.log('comienza tarea');

        Paciente.find({"consumiciones.diasRestantes": {$gte:0}}).exec((error, pacientes) => {
            if (error) {
                
            }

            pacientes.forEach(paciente => {
                paciente.consumiciones.forEach(consumicion => {
                    consumicion.diasRestantes = consumicion.diasRestantes - 1;
                });

                paciente.save().then(function (pacienteGuardado) {});
            });
        })

        //Busco los pacientes que poseen menos de 7 dias de consumiciones y les genero un pedido nuevo.
        Paciente.find({"consumiciones.diasRestantes":{$lte:0}}).exec(function (err, pacientes){
            //console.log(pacientes[0].nombre);
            pacientes.forEach(elementPac=>{
                let cont=0;
                //obtener las consumiciones y verificar si diasRestantes es menor a 7
                console.log(elementPac._id);
                elementPac.consumiciones.forEach(elemConsu=>{

                    if(elemConsu.diasRestantes<=7)
                    {
                        Pedido.countDocuments({}, (err, count) =>
                        {             
                            console.log('CONTADOR: ', count)
                            var num=count+1;//numerdo de pedido
                            console.log("Id del medicamento que estoy generando el pedido",elemConsu.medicamento);
                            //Busco el medicamento para poder obtener la cadena de frio.
                            Medicamento.findById(elemConsu.medicamento, function (err, medi) {
                                if (err) {
                                    return res.status(400).json({
                                        title: 'An error occurred',
                                        error: err
                                    });
                                }
                                if (!medi) {
                                    return res.status(404).json({
                                        title: 'Error',
                                        error: 'Medicamento no encontrado'
                                    });
                                }

                                var nuevoPedido = new Pedido({ 
                                  
                                    numero: num,
                                
                                    estado: "Generado",
                                    hora: Date.now(), 
                                    cadenaFrio: medi.cadenaFrio,
                                    medica: elemConsu.medicamento,
                                    pac:elementPac._id
                                
                              
                                });
                                nuevoPedido.idPaciente=elementPac._id;
                                nuevoPedido.idMedicamento=elemConsu.medicamento;
                                console.log("Todos los datos del pedido "+nuevoPedido);
                                console.log("El id del paciente: "+nuevoPedido.pac);
                                console.log("El id del medicamento: "+nuevoPedido.medica);
                        
                                nuevoPedido.save().then(function (nuevoPedido) {});
                                //Actualizo la consumicion. no funciona!!!!!! 
                                //tendria que ser, todos los dias actualiza las consumiciones que fueron entregadas, sino hay sobre venta.
                                console.log('Dias restantes antes de la actualizacion: ',elemConsu.diasRestantes);
                                elemConsu.diasRestantes=(medi.cantidadComprimidos/elemConsu.cantidadConsumicion)/elemConsu.frecuencia;
                                
                                let idt=elemConsu._id;
                                let dias=(medi.cantidadComprimidos/elemConsu.cantidadConsumicion)/elemConsu.frecuencia;
                                console.log('el valor del cont antes: ',cont)
                                elementPac.save().then(function (pacienteGuardado) {});
                            });
                        });
                    }
                    cont=cont+1;
                    console.log('El valor de cont despues de actualizar: ',cont);
                });
            });
        });
        */
});
console.log('pedido de tarea');


job.start();

// FUNCIONES
function getPedidos(req, res) {
    console.log(req.params.estado);
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

        Pedido.find({'estadosPedido.estado': estado._id})
        .populate([
            {path: 'paciente'}, 
            {path: 'repartidor'}, 
            {path: 'farmacia'}, 
            {path: 'medicamento'},
            {path: 'estadosPedido.estado', model: 'Estado'}
        ])
        .exec(function (err, pedidos) {
            if (err) {
                return res.status(400).json({
                    title: 'Error',
                    error: err
                });
            }
            if (!pedidos) {
                return res.status(404).json({
                    title: 'Error',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: pedidos
            });
        });
    });
}

function getPedidosEntregados(req, res) {
    console.log('- GET PEDIDOS ENTREGADOS -');
    Pedido.find({
            estado: 'Entregado'
        }).populate({
            path: 'medica',
            select: 'nombre',
            model: 'Medicamento'
        }).populate({
            path: 'pac',
            select: ['apellido', 'direccion'],
            model: 'Paciente'
        })
        .populate({
            path: 'repartidor',
            select: 'apellido',
            model: 'Repartidor'
        }).exec(function (err, pedidos) {
            if (err) {
                return res.status(400).json({
                    title: 'Error',
                    error: err
                });
            }
            if (!pedidos) {
                return res.status(404).json({
                    title: 'Error',
                    error: err
                });
            }
            console.log(pedidos);
            res.status(200).json({
                message: 'Success',
                obj: pedidos
            });
        });
}

function getPedidosEntreFechas(req, res) {
    console.log('- GET PEDIDOS ENTRE FECHAS-');
    Pedido.find(req.params.fechaInicio < Pedido.horaYFechaPedido < Pedido.horaYFechaPedido, function (err, pedidos) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!pedidos) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: pedidos
        });
    });
}

function cargarPedido(req, res) {
    if (!req.body.fechaPedido) {
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

            var estadoPedido = {
                estado: estados[0]._id,
                fecha: req.body.fechaPedido
            }

            CounterPedido.findById("5cd84be999bac2e4e3fbcf23")
                .exec((error, counterPedido) => {
                    if (error) {
                        return res.status(400).json({
                            title: 'Error',
                            error: error
                        });
                    }
                    if (!counterPedido) {
                        return res.status(400).json({
                            title: 'Error id medicamento',
                            error: 'No encontro contador pedido'
                        });
                    }

                    var nuevoPedido = new Pedido({
                        numero: counterPedido.contador,
                        fecha: req.body.fechaPedido,
                        paciente: req.body.idPaciente,
                        medicamento: req.body.idMedicamento,
                        farmacia: req.body.idFarmacia,
                        repartidor: req.body.idRepartidor
                    });

                    nuevoPedido.estadosPedido.push(estadoPedido);

                    counterPedido.contador = counterPedido.contador + 1;

                    nuevoPedido.save().then(function (nuevoPedido) {
                        counterPedido.save().then((counterGuardado) => {

                            Pedido.populate(nuevoPedido,[
                                {path: 'paciente'},
                                {path: 'repartidor'},
                                {path: 'farmacia'},
                                {path: 'medicamento'},
                                {path: 'estadosPedido.estado'}
                            ], (error, nuevoPedidoExpandido) => {
                                if (error) {
                                    return res.status(400).json({
                                        title: 'Error',
                                        error: err
                                    });
                                }
                                if (!nuevoPedidoExpandido) {
                                    return res.status(400).json({
                                        title: 'Error',
                                        error: 'No se pudo expandir pedido creado'
                                    });
                                }
                                res.status(201).json({
                                    message: 'Medicamento creado',
                                    obj: nuevoPedidoExpandido
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



//cargo el pedido cuando agrego el medicamento

function cargarPedido2(req, res) {
    console.log('CARGAR PEDIDO 2');

    Pedido.countDocuments({}, function (err, count) {
        if (err) {
            return handleError(err)
        } //handle possible errors
        console.log("Cantidad de pedidos hasta el momento:", count)
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
        console.log(req.params.idMedicamento);
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

            console.log("Numero pedido nuevo:", num);
            console.log("El medicamento es:", medicamento);
            //console.log("cadena de frio:",medicamento[0].cadenaFrio);
            var nuevoPedido = new Pedido({

                numero: num,

                estado: "Generado",
                hora: Date.now(),
                //a partir de aca no funciona.
                cadenaFrio: medicamento[0].cadenaFrio,
                medica: medicamento[0]._id,
                pac: req.params.idPaciente


            })
            nuevoPedido.idPaciente = req.params.idPaciente;
            nuevoPedido.idMedicamento = req.params.idMedicamento;
            console.log("Todos los datos del pedido " + nuevoPedido);
            console.log("El id del paciente: " + nuevoPedido.pac);
            console.log("El id del medicamento: " + nuevoPedido.medica);

            nuevoPedido.save().then(function (nuevoPedido) {
                res.status(201).json({
                    message: 'Pedido creado',
                    obj: nuevoPedido
                });

            }, function (err) {
                if (err.code == 11000) {
                    var msj = ""
                    //Catching index name inside errmsg reported by mongo to determine the correct error and showing propper message
                    if (err.errmsg.toString().includes("idPed"))
                        msj = "Numero Pedido";

                    return res.status(404).json({
                        title: 'Error',
                        error: msj + ' pedido existente.'
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




function editarPedido(req, res) {
    console.log('EDITAR PEDIDO');
    console.log(req.params.idPedido);
    Pedido.findById(req.params.idPedido, function (err, pedido) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!pedido) {
            return res.status(404).json({
                title: 'Error',
                error: 'Pedido no encontrado'
            });
        }
        console.log("pedido viejo " + pedido);
        pedido.estado = req.body.estadoPedido;
        pedido.horaYFecha = req.body.horaYFechaPedido;


        console.log("pedido nuevo: " + pedido);
        pedido.save().then(function (pedidoEditado) {
            Pedido.populate(pedidoEditado, [{
                path: 'medica',
                model: 'Medicamento'
            }, {
                path: 'pac',
                model: 'Paciente'
            }], (error, pedidoEditadoExpandido) => {
                res.status(200).json({
                    message: 'Success',
                    obj: pedidoEditadoExpandido
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

function eliminarPedido(req, res) {

    console.log('ELIMINAR pedido');

    console.log(req.params.idPedidos);


    Pedido.findOne({
            '_id': req.params.idPedido
        })
        .exec(function (err, pedido) {
            if (pedido) {
                pedido.remove().then(function (pedidoEliminado) {
                    return res.status(200).json({
                        message: 'pedido eliminado correctamente',
                        obj: pedidoEliminado
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

//Cargar un Repartidor

function cargarRepartidor(req, res) {
    console.log("entre cargar repartidor");

    //Asocio el repartidor al pedido
    Pedido.findById(req.params.idPedido, function (err, pedido) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!pedido) {
            return res.status(404).json({
                title: 'Error',
                error: 'Pedido no encontrado'
            });
        }

        console.log("repartidores: " + req.params.idRepartidor);
        pedido.repartidor = req.params.idRepartidor;



        pedido.save().then(function (pedido) {
            res.status(200).json({
                message: 'Success',
                obj: pedido
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function contarPedidos(req, res) {
    Pedido.find({})
    .populate({path: 'estadosPedido.estado', model: 'Estado'})
    .exec(async (err, pedidos) => {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }

        var conteo = {
            generados: 0,
            enProceso: 0,
            retirados: 0,
            pendientes: 0,
            entregados: 0,
        };

        var x = await pedidos.findIndex(pedido => {
            var ultimoEstado = pedido.estadosPedido[pedido.estadosPedido.length - 1];
            if (ultimoEstado.estado.nombre === 'Generado') {
                conteo.generados = conteo.generados + 1;
            } else if (ultimoEstado.estado.nombre === 'En Proceso') {
                conteo.enProceso = conteo.enProceso + 1;
            } else if (ultimoEstado.estado.nombre === 'Retirado') {
                conteo.retirados = conteo.retirados + 1;
            } else if (ultimoEstado.estado.nombre === 'Pendiente') {
                conteo.pendientes = conteo.pendientes + 1;
            } else if (ultimoEstado.estado.nombre === 'Entregado') {
                conteo.entregados = conteo.entregados + 1;
            }
        });

        res.status(200).json({
            message: 'Success',
            obj: conteo
        });
    });
}


function quitarConsumicionPedido(req, res) {




}


// EXPORT
module.exports = {
    getPedidos,
    getPedidosEntregados,
    getPedidosEntreFechas,
    cargarPedido,
    editarPedido,
    eliminarPedido,
    cargarRepartidor,
    cargarPedido2,
    quitarConsumicionPedido,
    contarPedidos
}