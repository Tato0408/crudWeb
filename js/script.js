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
                <button onclick="AbrirModalEditar('${integrante.id}','${ integrante.nombre}', '${integrante.apellido}', '${integrante.correo}')">Editar</button>
                <button onclick="EliminarPersona(${integrante.id})">Eliminar</button>
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
        //En caso que la Api  devuelva un codigo difeente a 200-299 {}
        alert("El registro no pudo ser agregado");
    }
        
});

//Funcion para eliminar registros
async function EliminarPersona(id){
    const confirmacion = confirm("Deseas eliminar el registro?")

    if(confirmacion){
        await fetch(`${API_URL}/${id}`,{
            method: "DELETE",
        }); 

        obtenerIntegrantes();
    }
}

/*Procesos para editar un regustro */

const modalEditar = document.getElementById("mdActualizar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

btnCerrarEditar.addEventListener("click", ()=>{
    modalEditar.close();
});



function AbrirModalEditar(id,nombre, apellido, correo){
    //Se asignan los valores del registro en los input
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = nombre;
    document.getElementById("txtApellidoEditar").value = apellido;
    document.getElementById("txtEmailEditar").value = correo;

    //Abrimos el modal despues de pasar

    modalEditar.showModal();
}

//Cuando programampos con formularios, codificamos el formulario entero, no solo el boton

document.getElementById("frmEditar").addEventListener("submit", async e => {
    e.preventDefault(); //Evitamos que el formulario se envie solo

    //Capturamos los valores de los inputs
    const id= document.getElementById("txtIdEditar").value;
    const nombre = document.getElementById("txtNombreEditar").value.trim();
    const apellido = document.getElementById("txtApellidoEditar").value.trim();
    const correo = document.getElementById("txtEmailEditar").value.trim();

    //Validaciones
    if(!id || !nombre || !apellido || !correo){
        alert("Pedazo de tonoto ingrese los campos")
        return; //Evita que el codigo se siga ejecutando
    }
    
    //Llamada a la Api

    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({correo, nombre, apellido })
    });

    if(respuesta.ok){
        alert("El registro fue actualizado con exito");
        modalEditar.close();
        obtenerIntegrantes();
    }
    else{
        alert("No sepudo actualizar")
    }
});
