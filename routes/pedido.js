'use strict'

var express = require('express');
var api = express.Router();
var PedidoController = require('../controllers/pedido');

// GETS
api.get('/:estado',PedidoController.getPedidos);
api.get('/conteo/:conteo',PedidoController.contarPedidos);
api.get('/:fechaInicio/:fechaFin',PedidoController.getPedidosEntreFechas);
api.get('/entregado/',PedidoController.getPedidosEntregados);

// api.get('/:idMedico/:idPaciente',MedicoController.editarMedico);

// PATCH
api.patch('/:idPedido',PedidoController.editarPedido);
api.patch('/agregarRepartidor/:idPedido/:idRepartidor', PedidoController.cargarRepartidor);
//creo el pedido.
api.patch('/agregarPedido/:idPaciente/:idMedicamento', PedidoController.cargarPedido2);
//quito el pedido en forma automatica al eliminar una consumicion
api.patch('/quitarPedido/:idPaciente/:idMedicamento', PedidoController.quitarConsumicionPedido);


// POST
api.post('/',PedidoController.cargarPedido);

// DELETE
api.delete('/:idPedido', PedidoController.eliminarPedido)//ver el idPed

module.exports = api; 