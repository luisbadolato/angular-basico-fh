/*
    ===== Código de TypeScript =====
*/

function sumar(a: number, b: number): number {
    return a + b;
}

const sumarFlecha = (a: number, b: number): number => {
    return a + b;
}

function multiplicar( numero: number, otroNumero?: number, base: number = 2): number {
    return numero * base;
}

// const resultado = multiplicar(5, 10);

// console.log(resultado);

interface PersonajeLOTR {
    nombre: string;
    pv: number;
    mostrarHp: () => void;
}


function curar( personaje: PersonajeLOTR, curarX: number ): void {
    personaje.pv += curarX;
}

const nuevoPersonaje: PersonajeLOTR = {
    nombre: "Jaimito",
    pv: 50,
    mostrarHp() {
        console.log('Puntos de vida:', this.pv);
    }
}

curar ( nuevoPersonaje, 20);

nuevoPersonaje.mostrarHp();
