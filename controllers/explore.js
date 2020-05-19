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
    let leaves = [];
    for (const service of taxonomy) {
        if (service.children.length === 0) {
            leaves.push(service);
        }
    }

    let allValues = [];
    const method = req.params.method;
    if (method === 'Jaro–Winkler') {
        for (const leaf of leaves) {
            allValues.push({
                name: leaf.name,
                value: (natural.JaroWinklerDistance(stringEng,leaf.name,undefined,true) * 100).toFixed(2)
            });
        }
    } else if (method === 'Levenshtein') {
        for (const leaf of leaves) {
            const levDist = natural.LevenshteinDistance(stringEng,leaf.name,undefined,true);
            const biggerLen = Math.max(leaf.name.length, stringEng.length);
            allValues.push({
                name: leaf.name,
                value: (((biggerLen - levDist) / biggerLen) * 100).toFixed(2)
            });
        }
    } else if (method === `Dices co-efficient`) {
        for (const leaf of leaves) {
            allValues.push({
                name: leaf.name,
                value: (natural.DiceCoefficient(stringEng,leaf.name,undefined,true) * 100).toFixed(2)
            });
        }        
    }

    allValues = allValues.sort((a, b) => b.value - a.value);
    res.status(200).json({
        message: 'Success',
        obj: allValues
    });
}

async function getSynonyms(wordTokens) {
    let promises = [];
    for (const token of wordTokens) {
        promises.push(new Promise((resolve,reject) => {
            wordnet.lookup(token, function (results) {
                if (results) {
                    resolve([ { word: token }, ...results]);
                } else {
                    reject(results);
                }
            });
        }));
    }

    return Promise.all(promises);
}

async function getTaxonomy() {
    let serviceTree = [];
    const services = await Service.find({});
    for (const service of services) {
        const serviceNode = {
            name: service.name,
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