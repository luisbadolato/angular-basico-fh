import { Producto, calculaIVA } from './06-desestructuracion-funcion';


/*
    ===== Código de TypeScript =====
*/


const carritoCompras: Producto[] = [
    {
        descripcion: 'Consola',
        precio: 500
    },
    {
        descripcion: 'Televisor',
        precio: 800
    },
];

const [total, iva] = calculaIVA(carritoCompras);

console.log('Total Carrito:', total);
console.log('IVA Carrito:', iva);