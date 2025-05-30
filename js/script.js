const API_URL = "https://retoolapi.dev/tViGRM/Integrantes"
async function obtenerIntegrantes() {
    const respuesta = await fetch(API_URL);
const data = await respuesta.json();
mostrarDatos(data);
}

function mostrarDatos(datos){
    const tabla = document.querySelector("#tabla tbody")

    tabla.innerHTML = "";
    datos.forEach(integrante => (
        tabla.innerHTML += `
        <tr>
            <td>${integrante.id}</td>
            <td>${integrante.nombre}</td>
            <td>${integrante.apellido}</td>
            <td>${integrante.correo}</td>
            <td>
                <button>Editar</button>
                <button>Eliminar</button>
            </td>
        </tr>
        `
    ));
}
obtenerIntegrantes();