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
// src/sendData.ts
const axios_1 = __importDefault(require("axios"));
const faker = require('faker'); // o import faker from 'faker';
const sendData = () => __awaiter(void 0, void 0, void 0, function* () {
    const randomWords = Array.from({ length: 10 }, () => faker.random.word());
    try {
        const response = yield axios_1.default.post('http://localhost:3000/users', randomWords);
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
sendData();
