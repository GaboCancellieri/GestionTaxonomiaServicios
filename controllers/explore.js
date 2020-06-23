'use strict'
var Service = require('../models/service');
var lngDetector = new (require('languagedetect'));
var translate = require('translate');
translate.engine = 'yandex'
translate.key = 'trnsl.1.1.20200322T201706Z.20199cf602c8ea84.47ab48bd236ea3b41057728be0c0e755254a9e56'

var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var wordnet = new natural.WordNet();

// FUNCIONES
async function buscar(req, res) {
    const word = req.params.word;
    const deteccion = lngDetector.detect(word).reduce(function (p, c) {
        p[c[0]] = c[1];
        return p;
    }, {});

    const porcEsp = deteccion['spanish'];
    const porcEng = deteccion['english'];

    let stringEng = word;
    if (!porcEng || !porcEsp || porcEng < porcEsp) {
        // traducir a ingles
        stringEng = await translate(word, { from: 'es', to: 'en' });
    }

    //Taxonomy
    const taxonomy = await getTaxonomy();

    let allValues = [];
    const method = req.params.method;
    if (method === 'Jaro–Winkler') {
        for (const leaf of taxonomy) {
            allValues.push({
                service: leaf.service,
                domain: leaf.domain,
                standard: leaf.standard,
                layer: leaf.layer,
                value: (natural.JaroWinklerDistance(stringEng,leaf.service,undefined,true) * 100).toFixed(2)
            });
        }
    } else if (method === 'Levenshtein') {
        for (const leaf of taxonomy) {
            const levDist = natural.LevenshteinDistance(stringEng,leaf.service,undefined,true);
            const biggerLen = Math.max(leaf.service.length, stringEng.length);
            allValues.push({
                service: leaf.service,
                domain: leaf.domain,
                standard: leaf.standard,
                layer: leaf.layer,
                value: (((biggerLen - levDist) / biggerLen) * 100).toFixed(2)
            });
        }
    } else if (method === `Dices co-efficient`) {
        for (const leaf of taxonomy) {
            allValues.push({
                service: leaf.service,
                domain: leaf.domain,
                standard: leaf.standard,
                layer: leaf.layer,
                value: (natural.DiceCoefficient(stringEng,leaf.service,undefined,true) * 100).toFixed(2)
            });
        }        
    }

    allValues = allValues.sort((a, b) => b.value - a.value);
    res.status(200).json({
        message: 'Success',
        obj: allValues
    });
}

async function getTaxonomy() {
    let serviceTree = [];
    const services = await Service.find({}).populate('layer').populate('domain').populate('standard');
    for (const service of services) {
        const serviceNode = {
            service: service.name,
            domain: (service.domain) ? service.domain.name : null,
            standard: (service.standard) ? service.standard.name : null,
            layer: (service.layer) ? service.layer.name : null,
            data: service._id,
            children: []
        }
        if (!service.parent) {
            serviceTree.push(serviceNode)
        } else {
            for (const srvNode of serviceTree) {
                if (srvNode.data.equals(service.parent)) {
                    srvNode.children.push(serviceNode);
                }
            }
            serviceTree.push(serviceNode)
        }
    }
    return serviceTree;
}

// EXPORT
module.exports = {
    buscar,
}