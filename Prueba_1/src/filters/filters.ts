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
    console.log("Se valida la cedula: "+ input.cedula);

    if (cedulaStr.length < 7 || cedulaStr.length > 8 || cedulaStr.charAt(0) === '0') {
        throw new Error("Error: el número de cédula debe tener entre 7 y 8 dígitos y no puede comenzar con 0.");
    }

    return input;
};


export const validatePhoneNumber = (input: CustomData): CustomData => {
    const telefono: string = input.telefono.replace(/\s/g, ''); 
    const regex = /^09\d{7}$/; 
    console.log("Se valida el telefono: "+ input.telefono);
    if (!regex.test(telefono)) {
        throw new Error("El número de teléfono no cumple con el formato requerido (debe comenzar con '09' y tener 9 dígitos sin contar espacios).");
    }
    return input;
};

// Tercer filtro: valida que el departamento sea válido entre los 19 del Uruguay.​
export const validateDepartment = (input: CustomData): CustomData => {
    const departamento = input.departamento.toUpperCase();
    console.log("Se valida el departamento: "+ input.departamento);
    if (!departamentosValidos.includes(departamento)) {
        throw new Error("Error: el departamento proporcionado no es válido. Por favor, asegúrate de ingresar un departamento válido de Uruguay.");
    }
    return input;
};
