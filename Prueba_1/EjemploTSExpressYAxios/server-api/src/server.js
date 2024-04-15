"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const QueueFactory_1 = require("../../../src/pipeline/QueueFactory");
const Pipeline_1 = require("../../../src/pipeline/Pipeline");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// construye una funcion de creacion de colas dependiendo de un parm se crea una funcion u otra (bull o rabbit)
const queueFactory = (QueueFactory_1.QueueFactory.getQueueFactory); //ojo que no la invoca aca si no dentro de la Pipeline
// Crear una nueva instancia de Pipeline usando Bull como backend de la cola
const pipeline = new Pipeline_1.Pipeline([], queueFactory);
//se crea el listener para cuando un job termina
pipeline.on('finalOutput', (output) => {
    console.log(`Salida final: ${output.data}`);
});
//se crea el listener para cuando un job da error
pipeline.on('errorInFilter', (error, data) => {
    console.error(`Error en el filtro: ${error}, Datos: ${data.data}`);
});
app.post('/users', (req, res) => {
    if (validate(req.body)) {
        console.log('Received data:', req.body);
        res.status(201).send({ message: 'Data received successfully', user: req.body });
        for (const dataToProcess of req.body) {
            console.log(`Se ha iniciado el proceso de agenda para la persona  ${dataToProcess.nombre} ${dataToProcess.apellido}`);
            pipeline.processInput(dataToProcess);
        }
    }
    else {
        res.status(400).send({ message: 'No data received' });
    }
});
function validate(data) {
    if (data.length > 0) {
        for (const element of data) {
            if (element.nombre == "" || element.apellido == "" || element.cedula == 0 || element.telefono == "" || element.departamento == "" || element.necesita_asistencia_movilidad == null) {
                return false;
            }
        }
        return true;
    }
    return false;
}
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});
