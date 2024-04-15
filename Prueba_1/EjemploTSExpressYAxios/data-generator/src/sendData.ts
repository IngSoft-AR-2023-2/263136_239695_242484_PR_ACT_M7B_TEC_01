// src/sendData.ts
import { CustomData } from '../../../src/data-structure/CustomData';
import axios from 'axios';
const faker = require('faker'); // o import faker from 'faker';


const sendData = async () => {
  
  const datos: CustomData[] = [];
  for (let i = 0; i < 10; i++) {
  datos.push(generarDatosAleatorios());
  }
  datos.push(crearDatosErroneos());

  try {
    // Generar un array de 10 objetos de datos aleatorios en formato CustomData
    const response = await axios.post('http://localhost:3000/users', datos);
    console.log('Data sent successfully:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un código de estado
        // que cae fuera del rango de 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error('Error request:', error.request);
      } else {
        // Algo más causó el error
        console.error('Error message:', error.message);
      }
    } else {
      // Error no relacionado con Axios
      console.error('Error:', error);
    }
  }
};
const generarDatosAleatorios = (): CustomData => {
  return {
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      cedula: faker.random.number({ min: 10000000, max: 99999999 }), // Cédula de 8 dígitos
      telefono: faker.phone.phoneNumber(),
      departamento: faker.address.city(),
      necesita_asistencia_movilidad: faker.random.boolean()
  };
};

const crearDatosErroneos = (): CustomData => {
  return {
    nombre: "Leonel",
    apellido: "Ronaldo",
    cedula: 2345, // Cédula de 8 dígitos
    telefono: "3456",
    departamento: "Canelones",
    necesita_asistencia_movilidad: false
  };
};
sendData();
