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
const axios_1 = __importDefault(require("axios"));
const faker = require('faker'); // o import faker from 'faker';
const sendData = () => __awaiter(void 0, void 0, void 0, function* () {
    const datos = [];
    for (let i = 0; i < 10; i++) {
        datos.push(generarDatosAleatorios());
    }
    datos.push(crearDatosErroneos());
    datos.push(crearDatoCorrecto());
    try {
        // Generar un array de 10 objetos de datos aleatorios en formato CustomData
        const response = yield axios_1.default.post('http://localhost:3000/users', datos);
        console.log('Data sent successfully:', response.data);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (error.response) {
                // La solicitud se realizó y el servidor respondió con un código de estado
                // que cae fuera del rango de 2xx
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
            }
            else if (error.request) {
                // La solicitud se hizo pero no se recibió respuesta
                console.error('Error request:', error.request);
            }
            else {
                // Algo más causó el error
                console.error('Error message:', error.message);
            }
        }
        else {
            // Error no relacionado con Axios
            console.error('Error:', error);
        }
    }
});
const generarDatosAleatorios = () => {
    return {
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        cedula: faker.random.number({ min: 10000000, max: 99999999 }), // Cédula de 8 dígitos
        telefono: faker.phone.phoneNumber(),
        departamento: obtenerCiudadValida(),
        necesita_asistencia_movilidad: faker.random.boolean()
    };
};
const crearDatosErroneos = () => {
    return {
        nombre: "Leonel",
        apellido: "Ronaldo",
        cedula: 2345, // Cédula de 8 dígitos
        telefono: "3456",
        departamento: "Paraguay",
        necesita_asistencia_movilidad: false
    };
};
const departamentosValidos = [
    "ARTIGAS", "CANELONES", "CERRO LARGO", "COLONIA", "DURAZNO",
    "FLORIDA", "FLORES", "LAVALLEJA", "MALDONADO", "MONTEVIDEO",
    "PAYSANDÚ", "RÍO NEGRO", "RIVERA", "ROCHA", "SALTO",
    "SAN JOSÉ", "SORIANO", "TACUAREMBÓ", "TREINTA Y TRES"
];
const obtenerCiudadValida = () => {
    const indice = faker.random.number({ min: 0, max: departamentosValidos.length - 1 });
    return departamentosValidos[indice];
};
const crearDatoCorrecto = () => {
    return {
        nombre: "Leonel",
        apellido: "Ronaldo",
        cedula: 2345678, // Cédula de 8 dígitos
        telefono: "093456096",
        departamento: "Montevideo",
        necesita_asistencia_movilidad: false
    };
};
sendData();
