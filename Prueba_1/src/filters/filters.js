"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printAssistanceMessage = exports.validateDepartment = exports.validatePhoneNumber = exports.validateCedulaNumber = void 0;
const departamentosValidos = [
    "ARTIGAS", "CANELONES", "CERRO LARGO", "COLONIA", "DURAZNO",
    "FLORIDA", "FLORES", "LAVALLEJA", "MALDONADO", "MONTEVIDEO",
    "PAYSANDÚ", "RÍO NEGRO", "RIVERA", "ROCHA", "SALTO",
    "SAN JOSÉ", "SORIANO", "TACUAREMBÓ", "TREINTA Y TRES"
];
// Segundo filtro: valida que los números de cédula tengan entre 7 y 8 dígitos, y no puede comenzar con 0.
const validateCedulaNumber = (input) => {
    const cedula = input.cedula;
    const cedulaStr = cedula.toString();
    console.log("Se valida la cedula: " + input.cedula);
    if (cedulaStr.length < 7 || cedulaStr.length > 8 || cedulaStr.charAt(0) === '0') {
        throw new Error("Error: el número de cédula debe tener entre 7 y 8 dígitos y no puede comenzar con 0.");
    }
    return input;
};
exports.validateCedulaNumber = validateCedulaNumber;
const validatePhoneNumber = (input) => {
    const telefono = input.telefono.replace(/\s/g, '');
    const regex = /^09\d{7}$/;
    console.log("Se valida el telefono: " + input.telefono);
    if (!regex.test(telefono)) {
        throw new Error("El número de teléfono no cumple con el formato requerido (debe comenzar con '09' y tener 9 dígitos sin contar espacios).");
    }
    return input;
};
exports.validatePhoneNumber = validatePhoneNumber;
// Tercer filtro: valida que el departamento sea válido entre los 19 del Uruguay.​
const validateDepartment = (input) => {
    const departamento = input.departamento.toUpperCase();
    console.log("Se valida el departamento: " + input.departamento);
    if (!departamentosValidos.includes(departamento)) {
        throw new Error("Error: el departamento proporcionado no es válido. Por favor, asegúrate de ingresar un departamento válido de Uruguay.");
    }
    return input;
};
exports.validateDepartment = validateDepartment;
// Cuarto filtro: valida si la persona necesita asistencia médica.​
const printAssistanceMessage = (input) => {
    const { nombre, apellido, necesita_asistencia_movilidad } = input;
    if (necesita_asistencia_movilidad) {
        console.log(`La persona ${nombre} ${apellido} necesita asistencia en movilidad`);
    }
    else {
        console.log(`La persona ${nombre} ${apellido} será agendado en el proceso común`);
    }
    return input;
};
exports.printAssistanceMessage = printAssistanceMessage;
