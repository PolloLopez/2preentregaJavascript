let gastosTotales = [];
let personas = [];

let personaIngresada;
do {
    personaIngresada = prompt("Ingrese TODOS los nombres, para salir escriba SALIR.").toUpperCase().trim();
    if (personaIngresada !== "SALIR") {
        personas.push(personaIngresada);
    }
} while (personaIngresada !== "SALIR");

let personaGastoRealizado;
let valorGastoRealizado;

do {
    do {
        personaGastoRealizado = prompt(`Nombra a las personas a registrar:\n${personas.join(", ")}\nPara terminar escribi SALIR`).toUpperCase().trim();
    } while (!personas.includes(personaGastoRealizado) && personaGastoRealizado !== "SALIR");

    if (personaGastoRealizado !== "SALIR") {
        do {
            valorGastoRealizado = parseInt(prompt("Ingresa el valor del gasto"));
        } while (isNaN(valorGastoRealizado));

        let gastoAgregado = {
            persona: personaGastoRealizado,
            valor: valorGastoRealizado
        };
        gastosTotales.push(gastoAgregado);
    }
} while (personaGastoRealizado !== "SALIR");

const calcularTotal = () => {
    return gastosTotales.reduce((acc, gasto) => acc + gasto.valor, 0);
}

const calcularPromedioGastos = () => {
    return calcularTotal() / personas.length;
}

const calcularTransacciones = () => {
    const gastoPromedio = calcularPromedioGastos();
    const transacciones = {};

    for (const persona of personas) {
        transacciones[persona] = {};
        const gastoPersona = gastosTotales.filter(gasto => gasto.persona === persona).reduce((acc, gasto) => acc + gasto.valor, 0);
        const diferencia = gastoPromedio - gastoPersona;

        for (const otraPersona of personas) {
            if (persona !== otraPersona) {
                const gastoOtraPersona = gastosTotales.filter(gasto => gasto.persona === otraPersona).reduce((acc, gasto) => acc + gasto.valor, 0);
                const diferenciaOtraPersona = gastoPromedio - gastoOtraPersona;

                if (diferencia > 0 && diferenciaOtraPersona < 0) {
                    const montoTransaccion = Math.min(diferencia, -diferenciaOtraPersona);
                    if (montoTransaccion > 0) {
                        transacciones[persona][otraPersona] = montoTransaccion;
                    }
                }
            }
        }
    }

    console.log("Transacciones para igualar los pagos:");
    console.log(transacciones);
}

console.log("Gastos totales: ", gastosTotales);
console.log("Total dinero gastado: ", calcularTotal());
console.log("Gasto promedio por persona: ", calcularPromedioGastos());

calcularTransacciones();
