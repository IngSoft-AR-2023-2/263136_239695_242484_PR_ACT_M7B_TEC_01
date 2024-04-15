import { CustomData } from '../data-structure/CustomData';

const departamentosValidos = [
    "ARTIGAS", "CANELONES", "CERRO LARGO", "COLONIA", "DURAZNO", 
    "FLORIDA", "FLORES", "LAVALLEJA", "MALDONADO", "MONTEVIDEO", 
    "PAYSANDÚ", "RÍO NEGRO", "RIVERA", "ROCHA", "SALTO", 
    "SAN JOSÉ", "SORIANO", "TACUAREMBÓ", "TREINTA Y TRES"
];

// Segundo filtro: valida que los números de cédula tengan entre 7 y 8 dígitos, y no puede comenzar con 0.
export const validateCedulaNumber = (input: CustomData): CustomData => {
    const cedula: number = input.cedula;
    const cedulaStr: string = cedula.toString();

    if (cedulaStr.length < 7 || cedulaStr.length > 8 || cedulaStr.charAt(0) === '0') {
        throw new Error("Error: el número de cédula debe tener entre 7 y 8 dígitos y no puede comenzar con 0.");
    }

    return input;
};

// Tercer filtro: valida que el departamento sea válido entre los 19 del Uruguay.​
export const validateDepartment = (input: CustomData): CustomData => {
    const departamento = input.departamento.toUpperCase();

    if (!departamentosValidos.includes(departamento)) {
        throw new Error("Error: el departamento proporcionado no es válido. Por favor, asegúrate de ingresar un departamento válido de Uruguay.");
    }

    return input;
};