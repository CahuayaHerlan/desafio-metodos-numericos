
"use strict";

/* =====================================================
   INTEGRACIÓN NUMÉRICA - COM-254
   Trapecio compuesto, Simpson 1/3, Simpson 3/8
   ===================================================== */

/* -------------------------
   1. EJERCICIOS DEL DESAFÍO
   ------------------------- */

const ejercicios = {
    19: {
        titulo: "Distancia de un vehículo",
        descripcion: "Estimar la distancia recorrida integrando la velocidad durante los primeros siete segundos.",
        x: [0,1,2,3,4,5,6,7],
        y: [0,14,39,69,95,114,129,139],
        factor: 1/3600,
        unidad: "millas",
        referencia: 0.147072,
        integral: "d = (1/3600) ∫ v(t) dt",
        nota: "El factor 1/3600 convierte segundos por milla/hora en millas."
    },
    20: {
        titulo: "Trabajo de una banda elástica",
        descripcion: "Calcular el trabajo realizado mediante la integral de la fuerza respecto al desplazamiento.",
        x: [0,0.4,0.8,1.2,1.6,2.0,2.4,2.8],
        y: [0,0.85,1.30,1.60,1.87,2.14,2.34,2.52],
        factor: 1,
        unidad: "lb·in",
        referencia: 4.577167,
        integral: "W = ∫ F(x) dx",
        nota: "El resultado está expresado en libra-pulgada."
    },
    21: {
        titulo: "Perfil topográfico",
        descripcion: "Estimar el área bajo un perfil irregular entre x = 1 y x = 10.",
        x: [1,2,3,4,5,6,7,8,9,10],
        y: [1.3,3.7,4.6,4.4,2.7,2.5,3.6,5.3,6.0,5.9],
        factor: 1,
        unidad: "u²",
        referencia: 36.85,
        integral: "A = ∫ y(x) dx",
        nota: "Los datos son una aproximación de referencia; se deben registrar las coordenadas digitalizadas de la gráfica original."
    },
    22: {
        titulo: "Longitud de una catenaria",
        descripcion: "Estimar la longitud de un cable con forma de catenaria entre dos apoyos.",
        funcion: "cosh(x/24)",
        a: -12,
        b: 26,
        n: 8,
        factor: 1,
        unidad: "ft",
        referencia: 43.898841,
        integral: "L = ∫ cosh(x/24) dx",
        nota: "El integrando procede de la fórmula de longitud de arco de la catenaria."
    },
    23: {
        titulo: "Caudal de una tubería",
        descripcion: "Estimar el caudal integrando el perfil de velocidad sobre la sección circular.",
        funcion: "160*pi*x*(1-x/0.25)^(1/7)",
        a: 0,
        b: 0.25,
        n: 8,
        factor: 1,
        unidad: "in³/s",
        referencia: 49*Math.PI/12,
        integral: "Q = ∫ 160πr(1-r/R)^(1/7) dr",
        nota: "El comportamiento cerca del borde de la tubería puede afectar la convergencia numérica."
    },
    24: {
        titulo: "Longitud de una cardioide",
        descripcion: "Estimar la longitud de arco de la trayectoria paramétrica con b = 5.",
        funcion: "20*abs(sin(x/2))",
        a: 0,
        b: 2*Math.PI,
        n: 8,
        factor: 1,
        unidad: "unidades",
        referencia: 80,
        integral: "L = ∫ 20|sin(t/2)| dt",
        nota: "La integral corresponde al integrando de longitud de arco de la cardioide."
    },
    25: {
        titulo: "Energía gravitatoria",
        descripcion: "Estimar la variación de energía potencial de un satélite de 500 kg elevado 800 km.",
        funcion: "500*9.81*(6371000^2)/(6371000+x)^2",
        a: 0,
        b: 800000,
        n: 8,
        factor: 1,
        unidad: "J",
        referencia: 500*9.81*6371000*800000/(6371000+800000),
        integral: "ΔU = ∫ mg₀R²/(R+y)² dy",
        nota: "Se considera la variación de la gravedad con la distancia al centro de la Tierra."
    },
    26: {
        titulo: "Área del lago Erie",
        descripcion: "Estimar el área del lago a partir de anchuras medidas cada 20 millas.",
        x: [40,60,80,100,120,140,160,180,200,220,240,260],
        y: null,
        factor: 1,
        unidad: "mi²",
        referencia: 9940,
        integral: "A = ∫ w(x) dx",
        nota: "La tabla original de anchuras no está disponible en los datos proporcionados. Debes introducir los valores medidos; no se deben inventar."
    },
    27: {
        titulo: "Volumen de un objeto alargado",
        descripcion: "Estimar el volumen de un objeto de revolución a partir de sus diámetros.",
        x: [0,1,2,3,4,5,6,7,8,9,10,11,12],
        y: [0,2.6,3.2,4.8,5.6,6.0,6.2,6.0,5.6,4.8,3.3,2.6,0],
        factor: 1,
        unidad: "in³",
        referencia: 201.842092,
        integral: "V = π ∫ (d(z)/2)² dz",
        nota: "Para el volumen se integra πr². La superficie real de revolución requiere incluir la pendiente del perfil."
    }
};

/* -------------------------
   2. ELEMENTOS DEL HTML
   ------------------------- */

const $ = id => document.getElementById(id);

const ejercicioEl = $("ejercicio");
const modoEl = $("modo");
const metodoEl = $("metodo");

const tituloEjercicioEl = $("tituloEjercicio");
const descripcionEl = $("descripcion");
const modeloEl = $("modelo");

const entradaTablaEl = $("entradaTabla");
const entradaFuncionEl = $("entradaFuncion");

const xEl = $("datosX");
const yEl = $("datosY");
const funcionEl = $("funcion");
const aEl = $("limiteA");
const bEl = $("limiteB");
const nEl = $("n");
const factorEl = $("factor");
const unidadEl = $("unidad");

const mensajeEl = $("mensaje");
const resumenEl = $("resumen");
const graficaEl = $("grafica");
const conclusionEl = $("conclusion");
const tablaEl = $("tablaCalculo");
const formulaEl = $("formula");
const desarrolloEl = $("desarrolloNumerico");
const procedimientoEl = $("procedimiento");
const tituloProcedimientoEl = $("tituloProcedimiento");
const resumenParametrosEl = $("resumenParametros");
const estadoResultadosEl = $("estadoResultados");
const botonProcedimiento = $("btnProcedimiento");

let ultimoCalculo = null;

/* -------------------------
   3. UTILIDADES
   ------------------------- */

function numero(valor) {
    return valor !== "" && Number.isFinite(Number(valor));
}

function num(id, nombre) {
    const campo = $(id);

    if (!campo || !numero(campo.value)) {
        throw new Error(`El campo "${nombre}" debe contener un número válido.`);
    }

    return Number(campo.value);
}

function fmt(valor, decimales = 8) {
    if (!Number.isFinite(valor)) return "No definido";

    return valor.toLocaleString("es-BO", {
        useGrouping: false,
        maximumFractionDigits: decimales,
        minimumFractionDigits: 0
    });
}

function htmlSeguro(valor) {
    return String(valor)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function mensaje(texto, tipo = "") {
    mensajeEl.textContent = texto;
    mensajeEl.className = "mensaje";

    if (tipo) mensajeEl.classList.add(tipo);
}

function listaNumerica(texto, nombre) {
    if (!texto.trim()) {
        throw new Error(`Debes introducir los valores de ${nombre}.`);
    }

    const valores = texto.trim().split(/[\s,;]+/).map(Number);

    if (valores.length < 2 || valores.some(v => !Number.isFinite(v))) {
        throw new Error(`La lista ${nombre} debe contener al menos dos números válidos.`);
    }

    return valores;
}

function ocultar(id, estado) {
    $(id).classList.toggle("oculto", estado);
}

/* -------------------------
   4. EVALUAR FUNCIONES
   ------------------------- */

function crearFuncion(expresion) {
    let e = expresion.trim().toLowerCase();

    if (!e) {
        throw new Error("Introduce una función matemática.");
    }

    /*
      Sustituir funciones de varias letras primero evita
      que una función larga se confunda con una corta.
    */

    e = e
        .replaceAll("π", "pi")
        .replace(/\bcosh\b/g, "Math.cosh")
        .replace(/\bsinh\b/g, "Math.sinh")
        .replace(/\btanh\b/g, "Math.tanh")
        .replace(/\bsqrt\b/g, "Math.sqrt")
        .replace(/\babs\b/g, "Math.abs")
        .replace(/\basin\b/g, "Math.asin")
        .replace(/\bacos\b/g, "Math.acos")
        .replace(/\batan\b/g, "Math.atan")
        .replace(/\bsin\b/g, "Math.sin")
        .replace(/\bcos\b/g, "Math.cos")
        .replace(/\btan\b/g, "Math.tan")
        .replace(/\bexp\b/g, "Math.exp")
        .replace(/\blog\b/g, "Math.log")
        .replace(/\bln\b/g, "Math.log")
        .replace(/\bpi\b/g, "Math.PI")
        .replace(/\^/g, "**");

    /*
      Solo se admiten caracteres y nombres de funciones
      correspondientes a expresiones matemáticas sencillas.
    */

    if (!/^[0-9x+\-*/().,\sA-Za-z]*$/.test(e)) {
        throw new Error("La función contiene caracteres no permitidos.");
    }

    if (/\b(?:window|document|globalThis|process|require|constructor|eval|Function|fetch|import)\b/i.test(e)) {
        throw new Error("La expresión contiene una palabra no permitida.");
    }

    let evaluar;

    try {
        evaluar = new Function("x", `"use strict"; return (${e});`);
    } catch {
        throw new Error("No se pudo interpretar la función. Revisa la sintaxis.");
    }

    return x => {
        let r;

        try {
            r = evaluar(x);
        } catch {
            throw new Error(`No se pudo evaluar la función en x = ${fmt(x)}.`);
        }

        if (typeof r !== "number" || !Number.isFinite(r)) {
            throw new Error(`La función no produce un valor finito en x = ${fmt(x)}.`);
        }

        return r;
    };
}

/* -------------------------
   5. PREPARAR LOS DATOS
   ------------------------- */

function validarTabla(x, y) {
    if (x.length !== y.length) {
        throw new Error("Las listas x e y deben tener la misma cantidad de valores.");
    }

    if (x.length < 2) {
        throw new Error("Se necesitan al menos dos puntos.");
    }

    for (let i = 1; i < x.length; i++) {
        if (x[i] <= x[i - 1]) {
            throw new Error("Los valores de x deben ser estrictamente crecientes.");
        }
    }

    const h = x[1] - x[0];
    const tol = 1e-8 * Math.max(1, Math.abs(h));

    for (let i = 2; i < x.length; i++) {
        if (Math.abs((x[i] - x[i - 1]) - h) > tol) {
            throw new Error(
                "Los métodos de Simpson requieren un espaciado uniforme. Revisa los valores de x."
            );
        }
    }

    return h;
}

function prepararDatos() {
    const modo = modoEl.value;
    const id = Number(ejercicioEl.value);
    const ejercicio = ejercicios[id];

    let x, y, h, n, a, b;

    if (modo === "funcion") {
        a = num("limiteA", "límite inferior");
        b = num("limiteB", "límite superior");
        n = num("n", "n");

        if (b <= a) {
            throw new Error("El límite superior debe ser mayor que el inferior.");
        }

        if (!Number.isInteger(n) || n < 1) {
            throw new Error("n debe ser un entero positivo.");
        }

        const f = crearFuncion(funcionEl.value);
        h = (b - a) / n;
        x = [];
        y = [];

        for (let i = 0; i <= n; i++) {
            const xi = i === n ? b : a + i * h;
            x.push(xi);
            y.push(f(xi));
        }
    } else {
        x = listaNumerica(xEl.value, "x");
        y = listaNumerica(yEl.value, "y");

        h = validarTabla(x, y);
        n = x.length - 1;
        a = x[0];
        b = x[x.length - 1];
    }

    /*
      Ejercicio 27: los valores ingresados son diámetros.
      Para calcular volumen, el integrando es π(d/2)².
    */

    const yOriginal = y.slice();

    if (id === 27) {
        y = y.map(d => Math.PI * Math.pow(d / 2, 2));
    }

    /*
      El ejercicio 26 requiere una tabla real de anchuras.
      Si no se ingresan, la validación de la lista ya detendrá
      el cálculo en el modo tabulado.
    */

    return {
        id, ejercicio, x, y, yOriginal, h, n, a, b,
        modo,
        factor: num("factor", "factor de conversión"),
        unidad: $("unidad").value.trim() || "unidades"
    };
}

/* -------------------------
   6. TRAPECIO COMPUESTO
   ------------------------- */

function trapecio(y, h) {
    const n = y.length - 1;
    let suma = (y[0] + y[n]) / 2;

    for (let i = 1; i < n; i++) {
        suma += y[i];
    }

    return h * suma;
}

/* -------------------------
   7. SIMPSON 1/3
   ------------------------- */

function simpson13(y, h) {
    const n = y.length - 1;

    if (n < 2 || n % 2 !== 0) return null;

    let impares = 0;
    let pares = 0;

    for (let i = 1; i < n; i++) {
        if (i % 2 === 0) {
            pares += y[i];
        } else {
            impares += y[i];
        }
    }

    return h / 3 * (y[0] + y[n] + 4 * impares + 2 * pares);
}

/* -------------------------
   8. SIMPSON 3/8
   ------------------------- */

function simpson38(y, h) {
    const n = y.length - 1;

    if (n < 3 || n % 3 !== 0) return null;

    let multiplos3 = 0;
    let otros = 0;

    for (let i = 1; i < n; i++) {
        if (i % 3 === 0) {
            multiplos3 += y[i];
        } else {
            otros += y[i];
        }
    }

    return 3 * h / 8 * (y[0] + y[n] + 3 * otros + 2 * multiplos3);
}

/* -------------------------
   9. SIMPSON COMBINADO
   ------------------------- */

function simpsonCombinado(y, h) {
    const n = y.length - 1;

    if (n < 2) return null;

    if (n % 2 === 0) {
        return simpson13(y, h);
    }

    if (n >= 3) {
        const n13 = n - 3;
        let resultado = 0;

        if (n13 > 0) {
            const tramo13 = simpson13(y.slice(0, n13 + 1), h);

            if (tramo13 === null) return null;
            resultado += tramo13;
        }

        const tramo38 = simpson38(y.slice(n13), h);

        if (tramo38 === null) return null;
        resultado += tramo38;

        return resultado;
    }

    return null;
}

/* -------------------------
   10. COMPARACIÓN Y TARJETAS
   ------------------------- */

function calcularResultados(datos) {
    const { y, h, factor, unidad, ejercicio } = datos;

    if (!Number.isFinite(factor)) {
        throw new Error("El factor de conversión debe ser finito.");
    }

    const ref = Number.isFinite(ejercicio.referencia)
        ? ejercicio.referencia
        : null;

    return [
        {
            clave: "trapecio",
            nombre: "Trapecio compuesto",
            bruto: trapecio(y, h),
            descripcion: "Aproxima mediante trapecios."
        },
        {
            clave: "simpson13",
            nombre: "Simpson 1/3",
            bruto: simpson13(y, h),
            descripcion: "Requiere n par."
        },
        {
            clave: "simpson38",
            nombre: "Simpson 3/8",
            bruto: simpson38(y, h),
            descripcion: "Requiere n múltiplo de 3."
        },
        {
            clave: "combinado",
            nombre: "Simpson combinado",
            bruto: simpsonCombinado(y, h),
            descripcion: "Combina 1/3 y 3/8 cuando corresponde."
        }
    ].map(r => {
        const valor = r.bruto === null ? null : r.bruto * factor;
        const error = valor === null || ref === null
            ? null
            : Math.abs(ref - valor);

        const errorPct = error === null || ref === 0
            ? null
            : error / Math.abs(ref) * 100;

        return { ...r, valor, error, errorPct, unidad };
    });
}

function tarjetaResultado(r, seleccionado, referencia) {
    if (r.valor === null) {
        return `
            <article class="tarjeta-resultado">
                <h3>${r.nombre}</h3>
                <p>Este método no es compatible con n = ${ultimoCalculo?.datos.n ?? "—"}.</p>
                <span class="etiqueta-metodo">No aplicable</span>
            </article>
        `;
    }

    const errorHTML = r.error === null
        ? `<div>Error: no hay referencia válida.</div>`
        : `
            <div>Error absoluto: <strong>${fmt(r.error, 9)}</strong></div>
            <div>Error porcentual: <strong>${fmt(r.errorPct, 6)}%</strong></div>
        `;

    return `
        <article class="tarjeta-resultado ${seleccionado === r.clave ? "seleccionado" : ""}">
            <h3>${r.nombre}</h3>
            <span class="valor">${fmt(r.valor, 10)}</span>
            <span class="unidad">${htmlSeguro(r.unidad)}</span>

            <div class="detalle">
                <div>Integral sin factor: <strong>${fmt(r.bruto, 10)}</strong></div>
                ${referencia === null
                    ? `<div>Referencia: <strong>No disponible</strong></div>`
                    : `<div>Referencia: <strong>${fmt(referencia, 10)}</strong></div>`
                }
                ${errorHTML}
            </div>

            <span class="etiqueta-metodo">
                ${seleccionado === r.clave ? "Método seleccionado" : r.descripcion}
            </span>
        </article>
    `;
}

function mostrarResultados(datos, resultados) {
    const elegido = metodoEl.value;
    const referencia = Number.isFinite(datos.ejercicio.referencia)
        ? datos.ejercicio.referencia
        : null;

    resumenEl.innerHTML = resultados
        .map(r => tarjetaResultado(r, elegido, referencia))
        .join("");

    estadoResultadosEl.textContent =
        `Ejercicio ${datos.id} · ${datos.n} subintervalos · h = ${fmt(datos.h, 10)}`;

    resumenParametrosEl.innerHTML = `
        <div><span>Intervalo</span><strong>[${fmt(datos.a)}, ${fmt(datos.b)}]</strong></div>
        <div><span>Espaciado h</span><strong>${fmt(datos.h, 10)}</strong></div>
        <div><span>Subintervalos n</span><strong>${datos.n}</strong></div>
    `;

    const compatibles = resultados.filter(r => r.valor !== null);

    if (compatibles.length === 0) {
        conclusionEl.innerHTML = `
            <h3>No hay resultados compatibles</h3>
            <p>Ajusta n para cumplir las condiciones de los métodos de integración.</p>
        `;
    } else {
        let mejor = null;

        for (const r of compatibles) {
            if (r.error !== null && (!mejor || r.error < mejor.error)) {
                mejor = r;
            }
        }

        if (mejor) {
            conclusionEl.innerHTML = `
                <h3>Interpretación de los resultados</h3>
                <p>
                    Entre los métodos compatibles, <strong>${mejor.nombre}</strong>
                    presenta el menor error absoluto respecto a la referencia.
                </p>
                <p>
                    Aproximación: <strong>${fmt(mejor.valor, 10)} ${htmlSeguro(datos.unidad)}</strong>.
                </p>
                <p>
                    Error absoluto: <strong>${fmt(mejor.error, 10)}</strong>.
                    Error porcentual: <strong>${fmt(mejor.errorPct, 6)}%</strong>.
                </p>
                <p>
                    Esta comparación depende de la calidad de los datos y del valor
                    de referencia utilizado.
                </p>
            `;
        } else {
            const mejorValor = compatibles.reduce((a, b) =>
                Math.abs(a.valor) <= Math.abs(b.valor) ? a : b
            );

            conclusionEl.innerHTML = `
                <h3>Interpretación de los resultados</h3>
                <p>
                    Se obtuvieron ${compatibles.length} aproximaciones válidas.
                    No es posible determinar el error verdadero sin una referencia.
                </p>
                <p>
                    El método seleccionado es <strong>${mejorValor.nombre}</strong>.
                    Revisa las hipótesis y unidades del problema.
                </p>
            `;
        }
    }

    botonProcedimiento.disabled = false;
}

/* -------------------------
   11. TABLA DE NODOS
   ------------------------- */

function mostrarTabla(datos) {
    let filas = "";

    for (let i = 0; i <= datos.n; i++) {
        let peso = "—";

        if (i === 0 || i === datos.n) {
            peso = "1";
        } else if (datos.n % 2 === 0) {
            peso = i % 2 === 0 ? "2" : "4";
        }

        filas += `
            <tr>
                <td>${i}</td>
                <td>${fmt(datos.x[i], 8)}</td>
                <td>${fmt(datos.y[i], 8)}</td>
                <td>${peso}</td>
            </tr>
        `;
    }

    tablaEl.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>i</th>
                    <th>xᵢ</th>
                    <th>Integrando</th>
                    <th>Peso Simpson 1/3</th>
                </tr>
            </thead>
            <tbody>${filas}</tbody>
        </table>
    `;
}

/* -------------------------
   12. GRÁFICA
   ------------------------- */

function dibujarGrafica(datos) {
    const ancho = Math.max(graficaEl.clientWidth || 550, 300);
    const alto = 285;
    const m = { izq: 56, der: 20, arriba: 20, abajo: 42 };

    const xmin = Math.min(...datos.x);
    const xmax = Math.max(...datos.x);
    const yminOriginal = Math.min(0, ...datos.y);
    const ymaxOriginal = Math.max(...datos.y);
    const rango = ymaxOriginal - yminOriginal || 1;

    const ymin = yminOriginal - rango * 0.06;
    const ymax = ymaxOriginal + rango * 0.12;

    const px = x => m.izq + (x - xmin) / (xmax - xmin) *
        (ancho - m.izq - m.der);

    const py = y => m.arriba + (ymax - y) / (ymax - ymin) *
        (alto - m.arriba - m.abajo);

    let svg = `
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 ${ancho} ${alto}"
             role="img" aria-label="Gráfica de los datos de integración">
            <rect width="${ancho}" height="${alto}" fill="#0b1527"/>
    `;

    for (let i = 0; i <= 4; i++) {
        const yy = m.arriba + i * (alto - m.arriba - m.abajo) / 4;
        const valor = ymax - i * (ymax - ymin) / 4;

        svg += `
            <line x1="${m.izq}" y1="${yy}"
                  x2="${ancho - m.der}" y2="${yy}"
                  stroke="#2a3b55"/>
            <text x="${m.izq - 8}" y="${yy + 4}"
                  fill="#a4b4ca" font-size="10" text-anchor="end">
                ${fmt(valor, 3)}
            </text>
        `;
    }

    svg += `
        <line x1="${m.izq}" y1="${m.arriba}"
              x2="${m.izq}" y2="${alto - m.abajo}" stroke="#71839d"/>
        <line x1="${m.izq}" y1="${alto - m.abajo}"
              x2="${ancho - m.der}" y2="${alto - m.abajo}" stroke="#71839d"/>
    `;

    const puntos = datos.x.map((x, i) =>
        `${px(x)},${py(datos.y[i])}`
    ).join(" ");

    svg += `
        <polygon
            points="${px(datos.x[0])},${py(0)} ${puntos} ${px(datos.x[datos.n])},${py(0)}"
            fill="#60a5fa" fill-opacity="0.10"/>
        <polyline points="${puntos}"
            fill="none" stroke="#60a5fa" stroke-width="2.5"
            stroke-linejoin="round"/>
    `;

    datos.x.forEach((x, i) => {
        svg += `
            <circle cx="${px(x)}" cy="${py(datos.y[i])}" r="3.5"
                    fill="#34d399"/>
        `;
    });

    svg += `
        <text x="${ancho / 2}" y="${alto - 8}"
              fill="#a4b4ca" font-size="12" text-anchor="middle">x</text>
        <text x="15" y="${alto / 2}"
              fill="#a4b4ca" font-size="12"
              text-anchor="middle"
              transform="rotate(-90 15 ${alto / 2})">f(x)</text>
        </svg>
    `;

    graficaEl.innerHTML = svg;
}

/* -------------------------
   13. PROCEDIMIENTO DETALLADO
   ------------------------- */

function sumaPonderada(y, tipo) {
    const n = y.length - 1;
    let texto = "";

    if (tipo === "trapecio") {
        texto = `(${fmt(y[0])} + ${fmt(y[n])})/2`;

        for (let i = 1; i < n; i++) {
            texto += ` + ${fmt(y[i])}`;
        }

        return texto;
    }

    if (tipo === "simpson13") {
        const terminos = [`${fmt(y[0])}`, `${fmt(y[n])}`];

        for (let i = 1; i < n; i++) {
            terminos.push(`${i % 2 === 0 ? 2 : 4}(${fmt(y[i])})`);
        }

        return terminos.join(" + ");
    }

    if (tipo === "simpson38") {
        const terminos = [`${fmt(y[0])}`, `${fmt(y[n])}`];

        for (let i = 1; i < n; i++) {
            terminos.push(`${i % 3 === 0 ? 2 : 3}(${fmt(y[i])})`);
        }

        return terminos.join(" + ");
    }

    return "Se suman las aproximaciones de los tramos Simpson 1/3 y 3/8.";
}

function mostrarProcedimiento() {
    if (!ultimoCalculo) return;

    const { datos, resultados } = ultimoCalculo;
    const elegido = metodoEl.value;
    const resultado = resultados.find(r => r.clave === elegido);

    if (!resultado || resultado.valor === null) {
        mensaje(
            "El método seleccionado no es compatible con n. Ajusta el número de subintervalos.",
            "advertencia"
        );
        return;
    }

    procedimientoEl.classList.remove("oculto");
    tituloProcedimientoEl.textContent = resultado.nombre;

    const h = datos.h;
    let cuerpo = `
        <div class="formula-card">
            <h3>Paso 1. Identificar los datos</h3>
            <p>Intervalo: [${fmt(datos.a)}, ${fmt(datos.b)}]</p>
            <p>Número de subintervalos: n = ${datos.n}</p>
            <p>Factor de conversión: ${fmt(datos.factor)}</p>
            <p>Unidad final: ${htmlSeguro(datos.unidad)}</p>
        </div>

        <div class="formula-card">
            <h3>Paso 2. Calcular el espaciado</h3>
            <p>h = (b − a) / n</p>
            <p class="sustitucion">
                h = (${fmt(datos.b)} − ${fmt(datos.a)}) / ${datos.n}
                = ${fmt(h, 10)}
            </p>
        </div>
    `;

    if (elegido === "trapecio") {
        cuerpo += `
            <div class="formula-card">
                <h3>Paso 3. Aplicar trapecio compuesto</h3>
                <p>T = h [(f₀ + fₙ)/2 + Σ fᵢ]</p>
                <p class="sustitucion">
                    T = ${fmt(h, 10)} × [${sumaPonderada(datos.y, "trapecio")}]
                </p>
                <p>Integral aproximada sin conversión: <strong>${fmt(resultado.bruto, 10)}</strong></p>
            </div>
        `;
    }

    if (elegido === "simpson13") {
        cuerpo += `
            <div class="formula-card">
                <h3>Paso 3. Aplicar Simpson 1/3</h3>
                <p>S = (h/3) [f₀ + fₙ + 4Σ fᵢ impares + 2Σ fᵢ pares]</p>
                <p class="sustitucion">
                    S = (${fmt(h, 10)}/3) × [${sumaPonderada(datos.y, "simpson13")}]
                </p>
                <p>Integral aproximada sin conversión: <strong>${fmt(resultado.bruto, 10)}</strong></p>
            </div>
        `;
    }

    if (elegido === "simpson38") {
        cuerpo += `
            <div class="formula-card">
                <h3>Paso 3. Aplicar Simpson 3/8</h3>
                <p>S = (3h/8) [f₀ + fₙ + 3Σ fᵢ no múltiplos de 3 + 2Σ fᵢ múltiplos de 3]</p>
                <p class="sustitucion">
                    S = (3 × ${fmt(h, 10)}/8) × [${sumaPonderada(datos.y, "simpson38")}]
                </p>
                <p>Integral aproximada sin conversión: <strong>${fmt(resultado.bruto, 10)}</strong></p>
            </div>
        `;
    }

    if (elegido === "combinado") {
        cuerpo += `
            <div class="formula-card">
                <h3>Paso 3. Aplicar Simpson combinado</h3>
                <p>Se utiliza Simpson 1/3 en los primeros intervalos pares y Simpson 3/8 en los últimos tres, cuando n es impar.</p>
                <p>Si n es par, se aplica Simpson 1/3 en todo el intervalo.</p>
                <p>Integral aproximada sin conversión: <strong>${fmt(resultado.bruto, 10)}</strong></p>
            </div>
        `;
    }

    cuerpo += `
        <div class="formula-card">
            <h3>Paso 4. Aplicar el factor de conversión</h3>
            <p class="sustitucion">
                Resultado = ${fmt(resultado.bruto, 10)} × ${fmt(datos.factor)}
            </p>
            <p>
                Resultado final:
                <strong>${fmt(resultado.valor, 10)} ${htmlSeguro(datos.unidad)}</strong>
            </p>
        </div>
    `;

    if (resultado.error !== null) {
        cuerpo += `
            <div class="formula-card">
                <h3>Paso 5. Calcular el error</h3>
                <p>Error absoluto: Eₐ = |Iref − Iaprox|</p>
                <p class="sustitucion">
                    Eₐ = |${fmt(datos.ejercicio.referencia, 10)} − ${fmt(resultado.valor, 10)}|
                    = ${fmt(resultado.error, 10)}
                </p>
                <p>Error porcentual: E% = 100 × Eₐ / |Iref|</p>
                <p class="sustitucion">
                    E% = ${fmt(resultado.errorPct, 6)}%
                </p>
            </div>
        `;
    } else {
        cuerpo += `
            <div class="formula-card">
                <h3>Paso 5. Error</h3>
                <p>No se puede calcular un error verdadero sin una referencia válida.</p>
            </div>
        `;
    }

    cuerpo += `
        <div class="formula-card">
            <h3>Interpretación del ejercicio</h3>
            <p>${htmlSeguro(datos.ejercicio.nota)}</p>
        </div>
    `;

    formulaEl.innerHTML = cuerpo;
    desarrolloEl.innerHTML = "";

    procedimientoEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* -------------------------
   14. CALCULAR
   ------------------------- */

function calcular() {
    try {
        const datos = prepararDatos();
        const resultados = calcularResultados(datos);

        ultimoCalculo = { datos, resultados };

        mostrarTabla(datos);
        mostrarResultados(datos, resultados);
        dibujarGrafica(datos);

        mensaje(
            `Cálculo completado correctamente. Se utilizaron ${datos.n} subintervalos.`,
            "exito"
        );

        return true;
    } catch (error) {
        mensaje(error.message, "error");
        return false;
    }
}

/* -------------------------
   15. CARGAR EJERCICIO
   ------------------------- */

function cargarEjercicio() {
    const id = Number(ejercicioEl.value);
    const e = ejercicios[id];

    if (!e) return;

    tituloEjercicioEl.textContent = e.titulo;
    descripcionEl.textContent = e.descripcion;
    modeloEl.textContent = e.integral;

    xEl.value = e.x ? e.x.join(", ") : "";
    yEl.value = e.y ? e.y.join(", ") : "";
    funcionEl.value = e.funcion || "";

    aEl.value = e.a !== undefined ? e.a : "";
    bEl.value = e.b !== undefined ? e.b : "";

    nEl.value = e.x ? e.x.length - 1 : (e.n || 8);
    factorEl.value = e.factor;
    unidadEl.value = e.unidad;

    /*
      El ejercicio 26 solo aporta las distancias.
      Se dejan las anchuras vacías para no inventar mediciones.
    */

    if (id === 26) {
        modoEl.value = "tabla";
        yEl.value = "";
        mensaje(
            "Ejercicio 26: introduce las anchuras reales correspondientes a cada distancia. No se han inventado los datos que faltan.",
            "advertencia"
        );
    } else {
        mensaje(
            `Ejercicio ${id} cargado. Revisa los datos y pulsa Calcular integral.`,
            ""
        );
    }

    ultimoCalculo = null;
    resumenEl.innerHTML = `
        <div class="resultado-vacio">
            <span>∫</span>
            <h3>Listo para calcular</h3>
            <p>Los resultados del ejercicio ${id} aparecerán aquí.</p>
        </div>
    `;

    estadoResultadosEl.textContent = "Esperando el cálculo";
    conclusionEl.innerHTML = `
        <h3>Interpretación</h3>
        <p>Los comentarios aparecerán después del cálculo.</p>
    `;

    tablaEl.innerHTML = `<p class="texto-vacio">La tabla aparecerá después del cálculo.</p>`;
    graficaEl.innerHTML = `<p class="texto-vacio">La gráfica aparecerá después del cálculo.</p>`;
    formulaEl.innerHTML = `<p class="texto-vacio">Selecciona un método y realiza un cálculo.</p>`;

    procedimientoEl.classList.add("oculto");
    botonProcedimiento.disabled = true;

    actualizarModo();
}

/* -------------------------
   16. MODO DE ENTRADA
   ------------------------- */

function actualizarModo() {
    const esFuncion = modoEl.value === "funcion";

    ocultar("entradaTabla", esFuncion);
    ocultar("entradaFuncion", !esFuncion);
}

/* -------------------------
   17. VALIDAR
   ------------------------- */

function validar() {
    try {
        const datos = prepararDatos();
        const compatibles = [];

        if (datos.n % 2 === 0) compatibles.push("Simpson 1/3");
        if (datos.n % 3 === 0) compatibles.push("Simpson 3/8");
        if (datos.n >= 3) compatibles.push("Simpson combinado");

        mensaje(
            `Datos válidos. n = ${datos.n}, h = ${fmt(datos.h, 10)}. Métodos compatibles: ${compatibles.join(", ") || "solo trapecio compuesto"}.`,
            "exito"
        );
    } catch (error) {
        mensaje(error.message, "error");
    }
}

/* -------------------------
   18. PRUEBA f(x) = x²
   ------------------------- */

function cargarPrueba() {
    modoEl.value = "funcion";
    ejercicioEl.value = "22";

    tituloEjercicioEl.textContent = "Prueba de validación";
    descripcionEl.textContent = "Comprobar el método de integración con f(x) = x² en [0, 2].";
    modeloEl.textContent = "I = ∫₀² x² dx = 8/3";

    funcionEl.value = "x^2";
    aEl.value = 0;
    bEl.value = 2;
    nEl.value = 4;
    factorEl.value = 1;
    unidadEl.value = "unidades";

    actualizarModo();

    /*
      Para la prueba matemática se desactiva la referencia
      propia del ejercicio 22 y se utiliza 8/3.
    */

    mensaje(
        "Prueba cargada: f(x) = x², intervalo [0, 2], n = 4. El resultado exacto es 8/3.",
        "exito"
    );

    if (calcular()) {
        const ref = 8 / 3;

        ultimoCalculo.resultados = ultimoCalculo.resultados.map(r => ({
            ...r,
            error: r.valor === null ? null : Math.abs(ref - r.valor),
            errorPct: r.valor === null ? null : Math.abs(ref - r.valor) / Math.abs(ref) * 100
        }));

        /*
          Reemplazar el contenido de referencia por la integral
          exacta de la prueba, no por la referencia del ejercicio 22.
        */

        ultimoCalculo.datos.ejercicio = {
            ...ultimoCalculo.datos.ejercicio,
            referencia: ref,
            nota: "Prueba de validación: la integral exacta de x² entre 0 y 2 es 8/3."
        };

        mostrarResultados(ultimoCalculo.datos, ultimoCalculo.resultados);
    }
}

/* -------------------------
   19. IMPRESIÓN
   ------------------------- */

function imprimirResultados() {
    if (!ultimoCalculo) {
        mensaje("Primero debes calcular un ejercicio.", "advertencia");
        return;
    }

    window.print();
}

function imprimirInforme() {
    $("informe").scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => window.print(), 250);
}

/* -------------------------
   20. EVENTOS
   ------------------------- */

$("calcular").addEventListener("click", calcular);
$("btnCalcularNav").addEventListener("click", () => {
    $("configuracion").scrollIntoView({ behavior: "smooth" });
    calcular();
});
$("validar").addEventListener("click", validar);
$("cargar").addEventListener("click", cargarPrueba);
$("btnProcedimiento").addEventListener("click", () => {
    if (procedimientoEl.classList.contains("oculto")) {
        mostrarProcedimiento();
    } else {
        procedimientoEl.classList.add("oculto");
    }
});
$("btnImprimir").addEventListener("click", imprimirResultados);
$("btnImprimirInforme").addEventListener("click", imprimirInforme);

ejercicioEl.addEventListener("change", cargarEjercicio);
modoEl.addEventListener("change", actualizarModo);

metodoEl.addEventListener("change", () => {
    if (ultimoCalculo) {
        mostrarResultados(ultimoCalculo.datos, ultimoCalculo.resultados);
    }
});

/* -------------------------
   21. INICIALIZACIÓN
   ------------------------- */

cargarEjercicio();
