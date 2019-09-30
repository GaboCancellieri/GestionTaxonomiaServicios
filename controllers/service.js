'use strict'

var Service = require('../models/service');
var dataSet = [{
        "code": "HI-ABD",
        "name": "Allow Biological Data"
    },
    {
        "code": "HI-ABD1",
        "name": "Allow showing abundance data"
    }, {
        "code": "HI-ABD2",
        "name": "Allow showing distribution data"
    }, {
        "code": "HI-ABD3",
        "name": "Allow showing size data"
    },
    {
        "code": "HI-CDE",
        "name": "Chain definition editor"
    },
    {
        "code": "HI-CV",
        "name": "Catalogue viewer"
    }, {
        "code": "HI-GCV",
        "name": "Geographic chart viewer"
    }, {
        "code": "HI-GCV1",
        "name": "Show information as histogram"
    }, {
        "code": "HI-GCV2",
        "name": "Show information as areachart"
    }, {
        "code": "HI-GCV3",
        "name": "Show information as piechart"
    }, {
        "code": "HI-GDSV",
        "name": "Geographic data structure viewer"
    },
    {
        "code": "HI-SLD",
        "name": "Show load data"
    }, {
        "code": "HI-SLD1",
        "name": "Show load files"
    }, {
        "code": "HI-SLD2",
        "name": "Show load forms"
    }, {
        "code": "HI-SLD2.1",
        "name": "Show load zone form"
    }, {
        "code": "HI-SLD3",
        "name": "Show load shapefiles"
    },
    {
        "code": "HI-GDV",
        "name": "Geographic data viewer"
    }, {
        "code": "HI-GSV",
        "name": "Geographic SPREADSHEET viewer"
    }, {
        "code": "HI-GV",
        "name": "Geographic viewer"
    },
    {
        "code": "HI-AF",
        "name": "Advance features"
    },
    {
        "code": "HI-AF1",
        "name": "Add language selection"
    },
    {
        "code": "HI-MM",
        "name": "Map manipulation"
    },
    {
        "code": "HI-LM",
        "name": "Layer manipulation"
    }, {
        "code": "HI-LM1",
        "name": "Layer attributes"
    }, {
        "code": "HI-LM1.1",
        "name": "Specific ocean dephts by labels"
    }, {
        "code": "HI-LM1.2",
        "name": "Code of zones by tables"
    }, {
        "code": "HI-LM1.3",
        "name": "Description of zones by tables"
    }, {
        "code": "HI-LM1.4",
        "name": "Seaweed biomass data associated to stations by labels"
    }, {
        "code": "HI-LM1.5",
        "name": "Station name by labels"
    }, {
        "code": "HI-LM1.6",
        "name": "Location of station by labels"
    }, {
        "code": "HI-LM1.7",
        "name": "Station name by tables"
    }, {
        "code": "HI-LM1.8",
        "name": "Deep of oceanographic data of stations by tables"
    }, {
        "code": "HI-LM1.9",
        "name": "Abundance of biological data of stations by histograms"
    }, {
        "code": "HI-LM1.10",
        "name": "Abundance of biological data of stations by tables"
    }, {
        "code": "HI-LM1.11",
        "name": "Size and value information about specific species by histograms"
    }, {
        "code": "HI-LM1.12",
        "name": "Code of species found by tables"
    }, {
        "code": "HI-LM1.13",
        "name": "Date of census on each zone by labels"
    }, {
        "code": "HI-LM1.14",
        "name": "Type of census on each zone by tables"
    }, {
        "code": "HI-LM1.15",
        "name": "Surface covered by the fishing zones by labels"
    }, {
        "code": "HI-LM1.16",
        "name": "Name of species that can be fishing by tables"
    }, {
        "code": "HI-LM1.17",
        "name": "Zones covered by specific fishing rules by contextual menues"
    }, {
        "code": "HI-LM1.18 ",
        "name": "Zones covered by specific fishing rules by tables"
    }, {
        "code": "HI-LM1.19",
        "name": "Code zones by labels"
    }, {
        "code": "HI-LM1.20",
        "name": "Description of zones by labels"
    }, {
        "code": "HI-LM1.21",
        "name": "Location of station by table"
    }, {
        "code": "HI-LM2",
        "name": "Layer scales"
    }, {
        "code": "HI-LM2.1",
        "name": "Add map scale"
    }, {
        "code": "HI-LM2.2",
        "name": "Add map projection configuration"
    }, {
        "code": "HI-LM3",
        "name": "Measuring"
    }, {
        "code": "HI-LM3.1",
        "name": "Grouped zones surface in square kilometers by labels"
    }, {
        "code": "HI-LM3.2",
        "name": "Grouped zones surface in hectares by labels"
    }, {
        "code": "HI-LM3.3",
        "name": "Grouped stations distances by labels"
    }, {
        "code": "HI-LM3.4",
        "name": "Distribution of species of grouped stations by histograms"
    }, {
        "code": "HI-LM3.5",
        "name": "Population density by tables"
    }, {
        "code": "HI-LM3.6",
        "name": "Seaweed density by tables"
    }, {
        "code": "HI-LM3.7",
        "name": "Distribution of seaweed of grouped stations by tables"
    }, {
        "code": "HI-LM3.8",
        "name": "Distance between points in kilometers by labels"
    }, {
        "code": "HI-LM3.9",
        "name": "Time between two stations by labels"
    }, {
        "code": "HI-LM3.10",
        "name": "Area surface in square kilometers by labels"
    }, {
        "code": "HI-LM3.11",
        "name": "Area surface in hectares by labels"
    }, {
        "code": "HI-LM3.12",
        "name": "Area surface in acres by labels"
    }, {
        "code": "HI-LM3.13",
        "name": "Area surface in square feets by labels"
    }, {
        "code": "HI-LM3.14",
        "name": "Distance between points in feets by labels"
    }, {
        "code": "HI-LM4",
        "name": "Layer grouping"
    }, {
        "code": "HI-LM4.1",
        "name": "Grouped zones by drawing"
    }, {
        "code": "HI-LM4.2",
        "name": "Grouped stations of censuses by cliking"
    }, {
        "code": "HI-LM4.3",
        "name": "Grouped fishing zones by drawing"
    }, {
        "code": "HI-LM5",
        "name": "Hide Show layers"
    }, {
        "code": "HI-LM5.1",
        "name": "Show Hide layers according to specific scales"
    }, {
        "code": "HI-LM5.1.1",
        "name": "Ocean depths of bathymetry by depth contours"
    }, {
        "code": "HI-LM5.1.2",
        "name": "Show zones by poligons"
    }, {
        "code": "HI-LM5.1.3",
        "name": "Stations of specific census by points"
    }, {
        "code": "HI-LM5.1.4",
        "name": "Population of species in specific stations"
    }, {
        "code": "HI-LM5.1.5",
        "name": "Censuses by selectable list"
    }, {
        "code": "HI-LM5.1.6",
        "name": "Censuses by selectable tree"
    }, {
        "code": "HI-LM6",
        "name": "Manipulate base layers"
    }, {
        "code": "HI-LM6.1",
        "name": "Show default base map"
    }, {
        "code": "HI-LM6.2",
        "name": "Show menu change base map"
    }, {
        "code": "HI-MM1",
        "name": "Overview"
    }, {
        "code": "HI-MM2",
        "name": "Refreshing"
    }, {
        "code": "HI-MM3",
        "name": "Labeling (add modifiy delete)"
    }, {
        "code": "HI-MM4",
        "name": "Panning & zoom (in, out, last, next)"
    }, {
        "code": "HI-MM4.1",
        "name": "Add increase and decrease zoom"
    }, {
        "code": "HI-MM4.2",
        "name": "Add the zoom to fit the whole map"
    }, {
        "code": "HI-MM4.3",
        "name": "Add the zoom to fit a specific layer"
    }, {
        "code": "HI-MM4.4",
        "name": "Add map panning"
    },
    {
        "code": "HI-GVA",
        "name": "Geographic viewer – animation"
    }, {
        "code": "HI-GVI",
        "name": "Geographic viewer - imagery"
    }, {
        "code": "HI-RM",
        "name": "Raster manipulation"
    }, {
        "code": "HI-RM1",
        "name": "Overlap raster images"
    }, {
        "code": "HI-RM2",
        "name": "Raster images grouping"
    }, {
        "code": "HI-RM3",
        "name": "Hide Show raster images"
    }, {
        "code": "HI-RM3.1",
        "name": "Temperatures of the ocean"
    }, {
        "code": "HI-RM3.2",
        "name": "Salinity levels of the ocean"
    },
    {
        "code": "HI-GVM",
        "name": "Geographic viewer – mosaicing"
    }, {
        "code": "HI-GVP",
        "name": "Geographic viewer – perspective"
    }, {
        "code": "HI-SE",
        "name": "Service editor"
    }, {
        "code": "MMS-FA",
        "name": "Fiches access"
    }, {
        "code": "MMS-FA1",
        "name": "Search data"
    }, {
        "code": "MMS-FA1.1",
        "name": "Search zones"
    }, {
        "code": "MMS-FA1.2",
        "name": "Search stations"
    }, {
        "code": "MMS-FA1.3",
        "name": "Search census"
    }, {
        "code": "MMS-FA2",
        "name": "Store data"
    }, {
        "code": "MMS-FA2.1",
        "name": "Store zones"
    }, {
        "code": "PS-S",
        "name": "Spatial"
    }, {
        "code": "PS-S1",
        "name": "Route determination"
    }, {
        "code": "PS-S1.1",
        "name": "Calculate distances between two points"
    }, {
        "code": "PS-S1.2",
        "name": "Calculate distances (meters) between stations"
    }, {
        "code": "PS-S1.3",
        "name": "Calculate lenght of time (in minutes) between stations"
    }, {
        "code": "PS-S2",
        "name": "Feature matching"
    }, {
        "code": "PS-S2.1",
        "name": "Determine similar characteristics in different zones"
    }, {
        "code": "PS-S2.2",
        "name": "Determine similar characteristics in different stations"
    }, {
        "code": "PS-S2.3",
        "name": "Compare data of sea conditions on different stations"
    }, {
        "code": "PS-S2.4",
        "name": "Look for fishing areas with similar characteristics"
    }, {
        "code": "PS-S2.5",
        "name": "Look for similar ocenaographic conditions in different zones"
    }, {
        "code": "PS-S3",
        "name": "Proximity analisys"
    }, {
        "code": "PS-S3.1",
        "name": "Locate stations in speficic distances"
    }, {
        "code": "PS-S3.2",
        "name": "Obtain geographic features around a specific points in zones"
    }, {
        "code": "PS-S4",
        "name": "Area calculation"
    }, {
        "code": "PS-S4.1",
        "name": "Calculate zone surface in square kilometers"
    }, {
        "code": "PS-S4.2",
        "name": "Calculate zone surface in hectares"
    }, {
        "code": "PS-S4.3",
        "name": "Calculate seaweed density of different stations"
    }, {
        "code": "PS-S4.4",
        "name": "Calculate the area drawn by the user"
    }, {
        "code": "PS-S5",
        "name": "Data Analysis"
    }, {
        "code": "PS-S5.1",
        "name": "Biological data analysis"
    }, {
        "code": "PS-S5.1.1",
        "name": "Abundance analysis"
    }, {
        "code": "PS-S5.1.2",
        "name": "Distribution analysis"
    }, {
        "code": "PS-S5.1.3",
        "name": "Size analysis"
    }, {
        "code": "PS-S5.2",
        "name": "Fetch biological data"
    }, {
        "code": "PS-S5.2.1",
        "name": "Fetch data by zones"
    }, {
        "code": "PS-S5.2.2",
        "name": "Fetch data by censuses"
    }, {
        "code": "PS-S5.2.3",
        "name": "Fetch data by stations"
    }, {
        "code": "PS-T",
        "name": "Thematic"
    }, {
        "code": "PS-T1",
        "name": "Change detection"
    }, {
        "code": "PS-T1.1",
        "name": "Determine changes on population of species in different censuses"
    }, {
        "code": "PS-T1.2",
        "name": "Determine changes on distribution of seaweed in different censuses"
    }, {
        "code": "PS-T1.3",
        "name": "Determine changes of distribution of species in different censuses"
    }, {
        "code": "PS-T2",
        "name": "Subsetting"
    }, {
        "code": "PS-T2.1",
        "name": "Query the biomass of seaweeds in a station"
    }, {
        "code": "PS-T2.2",
        "name": "Query the name of a station"
    }, {
        "code": "PS-T2.3",
        "name": "Query the location of a station"
    }, {
        "code": "PS-T2.4",
        "name": "Query census attributes"
    }, {
        "code": "PS-T2.5",
        "name": "Query zone attributes"
    }, {
        "code": "PS-T2.5.1",
        "name": "Query the description of zones"
    }, {
        "code": "PS-T2.5.2",
        "name": "Query the code of zones"
    }, {
        "code": "PS-T3",
        "name": "Export"
    }, {
        "code": "PS-T3.1",
        "name": "Export map to jpg format"
    }, {
        "code": "PS-T3.2",
        "name": "Export map to pdf format"
    }, {
        "code": "PS-T3.3",
        "name": "Export zone areas to jpg format"
    }, {
        "code": "PS-T4",
        "name": "Loading"
    }, {
        "code": "PS-T4.1",
        "name": "Load data by files"
    }, {
        "code": "PS-T4.1.1",
        "name": "Load zones by files"
    }, {
        "code": "PS-T4.2",
        "name": "Load data by forms"
    }, {
        "code": "PS-T4.2.1",
        "name": "Load zones by forms"
    }, {
        "code": "PS-T4.3",
        "name": "Load data by shapefiles"
    }, {
        "code": "PS-T4.3.1",
        "name": "Load zones by shapefiles"
    }, {
        "code": "PS-T4.4",
        "name": "Load base mape"
    }, {
        "code": "PS-T5",
        "name": "Add panning & zoom"
    }, {
        "code": "PS-T5.1",
        "name": "Add panning"
    }, {
        "code": "PS-T5.2",
        "name": "Add zoom"
    }, {
        "code": "PS-T6",
        "name": "Swtich language"
    }, {
        "code": "PS-T6.1",
        "name": "Switch Spanish language"
    }, {
        "code": "PS-T6.2",
        "name": "Switch English language"
    },
    {
        "code": "PS-T7",
        "name": "Map Generation"
    }, {
        "code": "PS-T7.1",
        "name": "Local Map Generation"
    }, {
        "code": "PS-T7.2",
        "name": "External Map Generation"
    }
];


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