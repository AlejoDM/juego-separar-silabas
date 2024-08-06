
function Sílabas(texto) {
    texto = texto + "----";
    const síl = new Array(100).fill("");
    let cont = 0;
    const V = "aeiouáéíóúAEIOUÁÉÍÓÚüÜ";
    const C = "qwrtyipsdfghjklñzxcvbnmQWRTYPSDFGHJKLÑZXCVBNM";
    const R = "rlhRLH";
    let T = "";
    let i = 0;
    let x = 0;

    while (texto[i] !== "-") {
        // " "
        if (" ¿?.,:;!¡".includes(texto[i])) {
            i++;
        }
        // V
        else if (V.includes(texto[i])) {
            síl[cont] = T;
            T = texto[i];
            i++;
        }
        // CV
        else if (C.includes(texto[i]) && V.includes(texto[i + 1])) {
            síl[cont] = T;
            T = texto.slice(i, i + 2);
            i += 2;
        }
        // CRV
        else if (C.includes(texto[i]) && R.includes(texto[i + 1]) && V.includes(texto[i + 2])) {
            síl[cont] = T;
            T = texto.slice(i, i + 3);
            i += 3;
        }
        // CCV
        else if (C.includes(texto[i]) && C.includes(texto[i + 1]) && V.includes(texto[i + 2])) {
            síl[cont] = T + texto[i];
            T = texto.slice(i + 1, i + 3);
            i += 3;
        }
        // CCRV
        else if (C.includes(texto[i]) && C.includes(texto[i + 1]) && R.includes(texto[i + 2]) && V.includes(texto[i + 3])) {
            síl[cont] = T + texto[i];
            T = texto.slice(i + 1, i + 4);
            i += 4;
        }
        // CCCV
        else if (C.includes(texto[i]) && C.includes(texto[i + 1]) && C.includes(texto[i + 2]) && V.includes(texto[i + 3])) {
            síl[cont] = T + texto.slice(i, i + 2);
            T = texto.slice(i + 2, i + 4);
            i += 4;
        }
        // CCCRV
        else if (C.includes(texto[i]) && C.includes(texto[i + 1]) && C.includes(texto[i + 2]) && R.includes(texto[i + 3]) && V.includes(texto[i + 4])) {
            síl[cont] = T + texto.slice(i, i + 2);
            T = texto.slice(i + 2, i + 5);
            i += 5;
        }
        // CCCC
        else if (C.includes(texto[i]) && C.includes(texto[i + 1]) && C.includes(texto[i + 2]) && C.includes(texto[i + 3]) && V.includes(texto[i + 4])) {
            síl[cont] = T + texto.slice(i, i + 3);
            T = texto.slice(i + 3, i + 5);
            i += 5;
        }
        // C
        else if (C.includes(texto[i])) {
            síl[cont] = T + texto[i];
            i++;
            T = "";
            x = 1;
        }
        cont++;
    }

    if (x === 0) {
        síl[cont] = T;
    }

    const d = "iuIUüÜ";
    const f = "aeoAEO";
    const D = "íúÍÚ";
    const F = "áéóÁÉÓ";

    i = 0;
    let resultado = '';
    while (i < 20) {
        if (síl[i]==="qu" && síl[i+1][0] === "í") {
            resultado += síl[i];
            i++;
        } if (síl[i] !== "" && síl[i + 1] !== "" && d.includes(síl[i][síl[i].length - 1]) && d.includes(síl[i + 1][0])) {
            resultado += síl[i];
            i++;
        } else if (síl[i] !== "" && síl[i + 1] !== "" && d.includes(síl[i][síl[i].length - 1]) && f.includes(síl[i + 1][0])) {
            resultado += síl[i];
            i++;
        } else if (síl[i] !== "" && síl[i + 1] !== "" && d.includes(síl[i][síl[i].length - 1]) && F.includes(síl[i + 1][0])) {
            resultado += síl[i];
            i++;
        } else if (síl[i] !== "" && síl[i + 1] !== "" && F.includes(síl[i][síl[i].length - 1]) && d.includes(síl[i + 1][0])) {
            resultado += síl[i];
            i++;
        } else if (síl[i] !== "" && síl[i + 1] !== "" && f.includes(síl[i][síl[i].length - 1]) && d.includes(síl[i + 1][0])) {
            resultado += síl[i];
            i++;
        } else if (síl[i] !== "") {
            resultado += síl[i] + " ";
            i++;
        } else {
            i++;
        }
    }

    return resultado;
}

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor');
    let aciertos = 0; // Variable para contar los aciertos
    const puntuacionElement = document.getElementById('puntuacion');
    const puntuacionActualElement = document.getElementById('puntuacionActual'); 
    let mejorPuntuacion = localStorage.getItem('mejorPuntuacion') || 0; // Recupera la mejor puntuación guardada

    // Variable para almacenar las palabras obtenidas del Gist
    let palabras = [];

    // URL del archivo en GitHub Gist (reemplaza con tu URL real)
    const urlGist = 'https://gist.githubusercontent.com/AlejoDM/a70de235231fcf4169e521c8e219a3cc/raw/ba0c130e3006124ffa1c595b90ea06379aea8472/palabras.txt';

    async function obtenerPalabrasDesdeGist() {
        try {
            const response = await fetch(urlGist);
            if (!response.ok) {
                throw new Error('Error al cargar el archivo desde Gist');
            }

            const texto = await response.text();
            palabras = texto.split('\n').filter(linea => linea.trim() !== '');

            if (palabras.length === 0) {
                throw new Error('No se encontraron palabras en el archivo');
            }

            obtenerNuevaPalabra();
        } catch (error) {
            console.error('Error al obtener palabras:', error);
        }
    }

    function obtenerNuevaPalabra() {
        const palabra = palabras[Math.floor(Math.random() * palabras.length)];
        const palabraItem = document.createElement('div');
        palabraItem.className = 'palabra-item';
        
        palabraItem.innerHTML = `
            <div class="contenedorJuego">
                <div class="palabra">${palabra}</div>
                <form class="formulario">
                    <input type="text" class="texto" name="texto" autocomplete="off" required>
                    <button type="submit">Enviar</button>
                </form>
                <div class="resultado"></div>
                <div class="aciertos"></div>
            </div>
            `;
        
        console.log('Nueva palabra añadida:', palabra);

        // Insertar el nuevo contenedor antes del primer hijo
        if (contenedor.firstChild) {
            contenedor.insertBefore(palabraItem, contenedor.firstChild);
        } else {
            contenedor.appendChild(palabraItem);
        }

        // Enfocar el nuevo input
        const nuevoInput = palabraItem.querySelector('.texto');
        if (nuevoInput) {
            nuevoInput.focus();
        }

        // Añadir el listener del formulario
        palabraItem.querySelector('form').addEventListener('submit', (event) => {
            event.preventDefault();
            verificarRespuesta(palabra, palabraItem);
        });
    }

    function verificarRespuesta(palabra, palabraItem) {
        const inputTexto = palabraItem.querySelector('.texto').value.trim().toLowerCase();
        const palabraEnSílabas = Sílabas(palabra).trim();
        const resultadoDiv = palabraItem.querySelector('.resultado');

        if (inputTexto === palabraEnSílabas) {
            aciertos++;
            resultadoDiv.textContent = '¡Correcto!';
            resultadoDiv.className = 'resultadocorrecto';
            puntuacionActualElement.textContent = `Puntuación Actual: ${aciertos}`; // Actualizar la puntuación actual
            obtenerNuevaPalabra();
        } else {
            resultadoDiv.textContent = 'Perdiste';
            resultadoDiv.innerHTML = `
                <p class="perdiste">Perdiste</p>
                <p class="correccion">Respuesta correcta: ${palabraEnSílabas}</p>
                <p class="aciertos">Aciertos: ${aciertos}</p>
                <button id="recargar">Intentar de nuevo</button>
            `;
            resultadoDiv.className = 'resultado';

            // Inhabilitar inputs y botón en todos los contenedores
            document.querySelectorAll('.palabra-item').forEach(item => {
                item.querySelectorAll('input, button').forEach(el => {
                    el.disabled = true;
                });
            });

            // Actualizar la mejor puntuación
            if (aciertos > mejorPuntuacion) {
                mejorPuntuacion = aciertos;
                localStorage.setItem('mejorPuntuacion', mejorPuntuacion); // Guardar en localStorage
            }

            // Añadir evento al botón de recarga
            const botonRecargar = resultadoDiv.querySelector('#recargar');
            botonRecargar.disabled = false;
            if (botonRecargar) {
                botonRecargar.addEventListener('click', () => {
                    location.reload(); // Recargar la página
                });
                // Detectar el Enter y hacer clic en el botón de recarga
                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        botonRecargar.click();
                    }
                });
            }
        }
    }

    // Mostrar la mejor puntuación al cargar la página
    puntuacionElement.textContent = `Mejor Puntuación: ${mejorPuntuacion}`;

    // Inicialmente carga las palabras desde el Gist
    obtenerPalabrasDesdeGist();
});