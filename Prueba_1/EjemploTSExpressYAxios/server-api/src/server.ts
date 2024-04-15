import express, { Express, Request, Response } from 'express';
import { CustomData } from '../../../src/data-structure/CustomData';
import { QueueFactory } from '../../../src/pipeline/QueueFactory';
import { Pipeline } from '../../../src/pipeline/Pipeline';
import { validateCedulaNumber, validateDepartment } from '../../../src/filters/filters';
const app: Express = express();
const port: number = 3000;

app.use(express.json());

// construye una funcion de creacion de colas dependiendo de un parm se crea una funcion u otra (bull o rabbit)
const queueFactory = QueueFactory.getQueueFactory<CustomData>; //ojo que no la invoca aca si no dentro de la Pipeline

// Crear una nueva instancia de Pipeline usando Bull como backend de la cola
const pipeline = new Pipeline<CustomData>([validateCedulaNumber, validateDepartment], queueFactory);


//se crea el listener para cuando un job termina
pipeline.on('finalOutput', (output) => {
    console.log(`Salida final: ${output.data}`);
});

//se crea el listener para cuando un job da error
pipeline.on('errorInFilter', (error, data) => {
    console.error(`Error en el filtro: ${error}, Datos: ${data.data}`);
});

app.post('/users', (req: Request, res: Response) => {
  if(validate(req.body)){
    console.log('Received data:', req.body);
    res.status(201).send({ message: 'Data received successfully', user: req.body });
    for (const dataToProcess of req.body) {
      console.log(`Se ha iniciado el proceso de agenda para la persona  ${dataToProcess.nombre} ${dataToProcess.apellido}`);
      pipeline.processInput(dataToProcess);        
  }
  }
  else{
    res.status(400).send({ message: 'No data received' });
  }
  
});

function validate(data: CustomData[]): boolean{
  if(data.length > 0 ){  
    for (const element of data) {
      if(element.nombre == "" || element.apellido == "" || element.cedula == 0 || element.telefono == "" || element.departamento == "" || element.necesita_asistencia_movilidad == null){
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
