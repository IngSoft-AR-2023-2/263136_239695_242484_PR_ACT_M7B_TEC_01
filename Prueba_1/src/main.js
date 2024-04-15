"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const QueueFactory_1 = require("./pipeline/QueueFactory");
const Pipeline_1 = require("./pipeline/Pipeline");
const filters_1 = require("./filters/filters");
const faker = require('faker'); // o import faker from 'faker';
require('dotenv').config();
// construye una funcion de creacion de colas dependiendo de un parm se crea una funcion u otra (bull o rabbit)
const queueFactory = (QueueFactory_1.QueueFactory.getQueueFactory); //ojo que no la invoca aca si no dentro de la Pipeline
// Crear una nueva instancia de Pipeline usando Bull como backend de la cola
const pipeline = new Pipeline_1.Pipeline([filters_1.toLowercaseWithSpaces, filters_1.filterWithRandomError, filters_1.toUppercase, filters_1.replaceSpacesWithDots], queueFactory);
//se crea el listener para cuando un job termina
pipeline.on('finalOutput', (output) => {
    console.log(`Salida final: ${output.data}`);
});
//se crea el listener para cuando un job da error
pipeline.on('errorInFilter', (error, data) => {
    console.error(`Error en el filtro: ${error}, Datos: ${data.data}`);
});
const main = () => {
    //se genera palabras con faker
    const randomWords = Array.from({ length: 10 }, () => faker.random.word());
    //para cada palabra se activa el pipeline con el dato 
    for (const word of randomWords) {
        let dataToProcess = { data: word };
        pipeline.processInput(dataToProcess);
    }
};
exports.main = main;
(0, exports.main)();
