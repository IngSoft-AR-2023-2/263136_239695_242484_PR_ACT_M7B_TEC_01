"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipeline = void 0;
// Importa EventEmitter para permitir que nuestra clase emita eventos.
const events_1 = require("events");
// Declara la clase Pipeline, que extiende EventEmitter para poder emitir eventos.
class Pipeline extends events_1.EventEmitter {
    // El constructor toma un arreglo de funciones de filtro y una función factory para crear colas.
    constructor(filters, queueFactory) {
        super(); // Llama al constructor de EventEmitter.
        this.filters = filters; // Inicializa el arreglo de funciones de filtro.
        this.filterQueues = []; // Inicializa el arreglo de colas de filtros como vacío.
        this.setupQueues(queueFactory); // Configura las colas para cada filtro.
    }
    // setupQueues configura una cola para cada filtro utilizando la función factory proporcionada.
    setupQueues(queueFactory) {
        // Itera sobre cada filtro y su índice.
        this.filters.forEach((filter, index) => {
            // Crea un nombre único para la cola basado en el índice del filtro.
            const queueName = `filter-queue-${index}`;
            // Usa la función factory para crear una nueva cola.
            const filterQueue = queueFactory(queueName);
            // Añade el filtro y su cola al arreglo filterQueues.
            this.filterQueues.push({ filter, queue: filterQueue });
            // Configura la cola para procesar datos: cuando llegan datos a la cola...
            filterQueue.process((data) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // Aplica la función de filtro a los datos.
                    const filteredData = filter(data);
                    // Envia los datos filtrados al siguiente filtro en la cadena.
                    this.enqueueNextFilter(index, filteredData);
                }
                catch (err) {
                    // En caso de error en el filtro, emite un evento 'errorInFilter' con el error y los datos.
                    this.emit('errorInFilter', err, data);
                }
            }));
        });
    }
    // enqueueNextFilter intenta añadir los datos filtrados a la cola del siguiente filtro.
    enqueueNextFilter(currentFilterIndex, data) {
        // Busca el siguiente filtro en la cadena.
        const nextFilter = this.filterQueues[currentFilterIndex + 1];
        // Si existe un siguiente filtro...
        if (nextFilter) {
            // Añade los datos a la cola del siguiente filtro.
            nextFilter.queue.add(data);
        }
        else {
            // Si no hay más filtros, emite un evento 'finalOutput' con los datos finales.
            this.emit('finalOutput', data);
        }
    }
    // processInput toma datos de entrada y los añade a la cola del primer filtro para comenzar el procesamiento.
    processInput(input) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si hay al menos un filtro...
            if (this.filterQueues.length > 0) {
                // Añade los datos de entrada a la cola del primer filtro.
                yield this.filterQueues[0].queue.add(input);
            }
        });
    }
}
exports.Pipeline = Pipeline;
