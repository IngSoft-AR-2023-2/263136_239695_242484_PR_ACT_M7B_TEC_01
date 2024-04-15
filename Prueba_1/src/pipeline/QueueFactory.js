"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueFactory = void 0;
const RabbitQueueAdapter_1 = require("../queues-providers/RabbitQueueAdapter");
class QueueFactory {
    static getQueueFactory(queueName) {
        //const queueType = process.env.QUEUE_TYPE;
        const queueType = 'RABBITMQ';
        switch (queueType) {
            // case 'BULL':
            // Asegúrate de tener una instancia de Redis corriendo o configurar la conexión de Bull según sea necesario.                
            //return new BullQueueAdapter<T>(queueName);
            case 'RABBITMQ':
                // Asegúrate de que tu instancia de RabbitMQ esté corriendo o configurar la conexión de RabbitMQ según sea necesario.
                return new RabbitQueueAdapter_1.RabbitMQQueueAdapter(queueName);
            default:
                throw new Error(`Unsupported queue type: ${queueType}`);
        }
    }
}
exports.QueueFactory = QueueFactory;
