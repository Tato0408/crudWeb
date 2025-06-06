const API_URL = "https://retoolapi.dev/tViGRM/Integrantes"
async function obtenerIntegrantes() {
    const respuesta = await fetch(API_URL);
    const data = await respuesta.json();
    mostrarDatos(data);
}

function mostrarDatos(datos) {
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


const modal = document.getElementById("mdAgregar");
const btnAgregar = document.getElementById("btnAgregar");
const btnCerrar = document.getElementById("btnCerrar");

btnAgregar.addEventListener("click", () => { modal.showModal() });
btnCerrar.addEventListener("click", () => { modal.close() });

document.getElementById("frmAgregar").addEventListener("submit", async e => {
    // "e" Representa a submit. Evita que el fomulario se envie solo
    e.preventDefault; //La e en esta linea es if¿gual a la e en async e en la parte de arriba, puede ser cualquier otro nombre, pero tienen que ser los dos el mismo si o si
    //Capturar los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();

    if (!nombre || !apellido || !correo) {
        alert("Ingrese los valores en blanco")
        return; // Para evitar que los datos se envien y lo envia al bloque de codigo principal
    }
    //Llamar a la Api para enviar el registro
    const respuesta = await fetch(API_URL,
        {
            method: "POST", //Tipo de solicitud
            headers:{'Content-Type':'application/json'}, //Tipo de datos enviados
            body : JSON.stringify({nombre, apellido, correo}) //Datos enviados
        });
    //Verificar que la Api responde que los datos fueron enviados correctaente
    if(respuesta.ok){
        alert("El registro fue agregado correctamente")
        
        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();

        //Cerrar el modal 
        modal.close();

        //Recargar la tabla
        obtenerIntegrantes();
    }
    else{
        alert("El registro no pudo ser agregado");
    }
        
});
