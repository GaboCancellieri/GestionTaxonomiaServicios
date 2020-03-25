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

    console.log(porcEng + ' - ' + porcEsp)

    let stringEng = '';
    if (!porcEng || !porcEsp || porcEng < porcEsp) {
        // traducir a ingles
        stringEng = await translate(word, { from: 'es', to: 'en' });
    }

    //Tokenization
    const wordTokens = tokenizer.tokenize(stringEng);
    console.log(wordTokens);

    //Synonyms
    const values = await getSynonyms(wordTokens);
    const synonymMat = [];
    for (const value of values) {
        synonymMat.push(value[1].synonyms);
    }

    //Taxonomy
    const taxonomy = await getTaxonomy();
    let leaves = [];
    for (const service of taxonomy) {
        if (service.children.length === 0) {
            leaves.push(service);
        }
    }
    
    // for (const service of leaves) {
        const nameArr = leaves[96].name.split(' ');
        console.log(leaves[96].name.split(' '));
        for (const nameWord of nameArr) {
            for (const synonymArr of synonymMat) {
                console.log('------------------------------------------------')
                console.log(synonymArr)
                console.log('------------------------------------------------')
                for (const synonym of synonymArr) {
                console.log('******************************')
                console.log(natural.JaroWinklerDistance(synonym,nameWord))
                console.log('******************************')
            }
            }
        }
    // }
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