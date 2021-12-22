/*
    ===== Código de TypeScript =====
*/

export interface Producto {
    descripcion: string;
    precio: number;
}

const telefono: Producto = {
    descripcion: "Nokia A1",
    precio: 150
}

const tablet: Producto = {
    descripcion: "Ipad Air",
    precio: 350
}

export function calculaIVA(productos: Producto[]): [number, number] {

    let total: number = 0;

    productos.forEach(({ precio }) => {
        total += precio;
    });

    return [total, total * 0.21];
}

const articulos = [telefono, tablet];

const [total, IVA] = calculaIVA(articulos);

// console.log('Precio Bruto:', total);
// console.log('IVA:', IVA);