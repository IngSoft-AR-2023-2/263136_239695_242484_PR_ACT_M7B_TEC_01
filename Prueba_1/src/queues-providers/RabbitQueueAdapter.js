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
exports.RabbitMQQueueAdapter = void 0;
// Importa los componentes necesarios de la biblioteca amqplib, que es un cliente de RabbitMQ para Node.js.
const amqplib_1 = require("amqplib");
// Define la clase RabbitMQQueueAdapter que implementa la interfaz IQueue.
class RabbitMQQueueAdapter {
    // El constructor toma el nombre de la cola como parámetro.
    constructor(queueName) {
        this.queueName = queueName;
        // Establece la conexión con RabbitMQ. Aquí se asume que RabbitMQ corre en localhost.
        // Modifica la URL según sea necesario, incluyendo credenciales si es necesario.
        this.connection = (0, amqplib_1.connect)('amqp://user:password@localhost');
        // Crea un canal de comunicación sobre la conexión establecida.
        this.channel = this.connection.then(conn => conn.createChannel());
        // Asegura que la cola especificada exista en RabbitMQ.
        this.channel.then(ch => ch.assertQueue(queueName));
    }
    // Método para añadir un mensaje a la cola. Los datos del mensaje se pasan como parámetro.
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Espera hasta que el canal esté disponible.
            const ch = yield this.channel;
            // Envia el mensaje a la cola, convirtiendo los datos a un Buffer ya que RabbitMQ espera datos binarios.
            ch.sendToQueue(this.queueName, Buffer.from(JSON.stringify(data)));
        });
    }
    // Método para procesar mensajes de la cola. Toma una función callback que define cómo se procesarán los mensajes.
    process(callback) {
        // Una vez que el canal esté disponible, configura el consumo de mensajes de la cola.
        this.channel.then(ch => {
            // Consume mensajes de la cola especificada.
            ch.consume(this.queueName, (msg) => __awaiter(this, void 0, void 0, function* () {
                // Verifica que el mensaje no sea nulo.
                if (msg !== null) {
                    try {
                        // Convierte el contenido del mensaje de Buffer a string, luego a JSON, y finalmente al tipo de datos T.
                        const data = JSON.parse(msg.content.toString());
                        // Llama a la función callback con los datos del mensaje.
                        yield callback(data);
                        // Acusa la recepción del mensaje para que sea eliminado de la cola.
                        ch.ack(msg);
                    }
                    catch (error) {
                        // En caso de error al procesar el mensaje, imprime el error y no acusa la recepción del mensaje.
                        console.error('Error processing message:', error);
                        ch.nack(msg);
                    }
                }
            }));
        });
    }
}
exports.RabbitMQQueueAdapter = RabbitMQQueueAdapter;
