/*
    ===== Código de TypeScript =====
*/

// ======================= //
// == Desestructuracion == //
// ===== de Objetos ====== //
// ======================= //

interface Reproductor {
    volumen: number;
    segundo: number;
    cancion: string;
    detalles: Detalles;
}

interface Detalles {
    autor: string;
    lanzamiento: number;
}

const reproductor: Reproductor = {
    volumen: 90,
    segundo: 36,
    cancion: 'Mess',
    detalles: {
        autor: 'Ed Sheeran',
        lanzamiento: 2015
    }
}

// console.log('El volumen actual es:', reproductor.volumen);
// console.log('El segundo actual es:', reproductor.segundo);
// console.log('La canción actual es:', reproductor.cancion);
// console.log('El autor es:', reproductor.detalles.autor);

const autor = 'Fulano'; // Dará fallo con la propiedad desestructurada si no le cambiamos el nombre

// const { volumen, segundo, cancion, detalles:{ autor: autorDetalle } } = reproductor; // Oneliner, but too messy
const { volumen, segundo, cancion, detalles } = reproductor; // Cleaner though more verbose
const { autor: autorDetalle } = detalles;

// console.log('El volumen actual es:', volumen);
// console.log('El segundo actual es:', segundo);
// console.log('La canción actual es:', cancion);
// console.log('El autor es:', autorDetalle);


// ======================= //
// == Desestructuracion == //
// ===== de Arreglos ===== //
// ======================= //

const dbz: string[] = ['Goku', 'Vegeta', 'Trunks'];

console.log('Personaje 1:', dbz[0]);
console.log('Personaje 2:', dbz[1]);
console.log('Personaje 3:', dbz[2]);

const [ p1, p2, p3 ] = dbz; // position based destructuration
const [ , , p3bis ] = dbz; // selective destructuration

console.log('Personaje 1:', p1);
console.log('Personaje 2:', p2);
console.log('Personaje 3:', p3bis);