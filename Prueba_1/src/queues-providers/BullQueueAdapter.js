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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullQueueAdapter = void 0;
// Importa Bull y algunos tipos específicos de Bull para trabajar con colas y trabajos.
const bull_1 = __importDefault(require("bull"));
// Define la clase BullQueueAdapter que implementa la interfaz genérica IQueue.
class BullQueueAdapter {
    // El constructor toma un nombre de cola y crea una nueva instancia de cola Bull con ese nombre.
    constructor(queueName) {
        this.queue = new bull_1.default(queueName);
    }
    // Método async para añadir datos a la cola. 
    // 'data' es el dato de tipo genérico T que se quiere encolar.
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Añade el dato a la cola usando el método 'add' de Bull.
            yield this.queue.add(data);
        });
    }
    // Método para procesar los datos en la cola. 
    // 'callback' es la función que se llamará con cada dato encolado para procesarlo.
    process(callback) {
        // Configura el procesador de la cola usando el método 'process' de Bull.
        // Para cada trabajo en la cola, Bull pasará el trabajo al callback.
        this.queue.process((job) => __awaiter(this, void 0, void 0, function* () {
            // Llama al callback proporcionado con los datos del trabajo.
            // 'job.data' contiene el dato encolado de tipo T.
            yield callback(job.data);
        }));
    }
}
exports.BullQueueAdapter = BullQueueAdapter;
