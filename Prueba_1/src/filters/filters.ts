import { CustomData } from '../data-structure/CustomData';
// Primer filtro: Convierte el input a minúsculas y añade un espacio entre cada letra.
/*export const toLowercaseWithSpaces = (input: CustomData): CustomData => {
    let result: string = input.data
        .toLowerCase()             // Convierte el string a minúsculas.
        .split('')                  // Separa el string en un array de caracteres.
        .join(' ');                 // Une los caracteres con un espacio entre ellos.
    console.log(`Filtro toLowercaseWithSpaces,  input${JSON.stringify(input)}, output ${result} }`)
    return {data: result}
};

// Segundo filtro: Convierte el input a mayúsculas.
export const toUppercase = (input: CustomData): CustomData=> {
    
    let result:string = input.data.toUpperCase();   // Convierte el string a mayúsculas.
    console.log(`Filtro toUppercase,  input${JSON.stringify(input)}, output ${result} }`)
    return {data: result}
};

// Tercer filtro: Reemplaza cada espacio en el input por un punto.
export const replaceSpacesWithDots = (input: CustomData): CustomData => {
    let result = input.data.replace(/ /g, '.');  // Reemplaza cada espacio (' ') por un punto ('.').
    console.log(`Filtro replaceSpacesWithDots,  input${JSON.stringify(input)}, output ${result} }`)
    return {data: result}
};

export const filterWithRandomError = (input: CustomData): CustomData => {
    if (Math.random() < 0.5) { // Probabilidad de 50% para generar un error
        throw new Error("Error aleatorio");
    }
    return {data: input.data.trim()}
}

// Invierte el orden de las letras en el input.
export const reverseLetters = (input: CustomData): CustomData => {
    // Divide la cadena en un array de caracteres, invierte el orden del array y luego une los caracteres nuevamente en una cadena.
    let result = input.data.split('').reverse().join('');
    console.log(`Filtro reverseLetters, input ${JSON.stringify(input)}, output ${result}`);
    return { data: result };
};
*/
