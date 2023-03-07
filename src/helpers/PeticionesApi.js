import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";


export const PeticioneApi = () => {

    let development = 'https://api-farmacia.onrender.com';
    //let development = 'http://127.0.0.1:8000';
   

   
    const {setSolicitudes,setUsuarios,usuarios,setRecordatorios } = useContext(AppContext);

   /*Funcion para cargar todas las solicitudes*/
    const cargarSolicitudes = async () => {
        try {
            const respuesta = await fetch(development + '/api/solicitudes/');
            if (respuesta.status === 200) {
                const resp = await respuesta.json();
                await setSolicitudes(resp);
            } else {
                setSolicitudes([]);
            }

        } catch (error) {
            console.log("Algo salio mal con cargar solicitudes: ",error)
        }
    }
    /*Funcion para registrar*/
    const registrarSolicitud = (solicitud) => {


            try {
               fetch(development + '/api/solicitudes/', { 
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(solicitud)
                })
                .then(respuesta => {
                    if (respuesta.status === 201) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Solicitud registrada con exito',
                            timer: 1500,
                            showConfirmButton: false,
                          })
                        cargarSolicitudes()
                        return respuesta.json();
                    }
                    else {
                        alert('No se puedo Registrar...');
                    }
                })
    
            } catch (error) {
                console.log("Algo salio mal al registrar desempeño...")
                console.log(error)
            }
       
    }
    /*Funcion para eliminar una solicitud*/
    const eliminarSolicitud = async (id) => {
        try{
            const respuesta = await fetch(development + '/api/solicitudes/' + id+'/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (respuesta.status === 204) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Solicitud eliminada con exito',
                    timer: 1500,
                    showConfirmButton: false,
                  })
                cargarSolicitudes()
            }
        }catch(e){
            console.log('No se pudo eliminar solicitud')
        }
    }
    /*Funcion para logearse*/
    const iniciarSesion = async (user, contra) => {
        
        return usuarios.filter(usuario => (usuario.usuario === user && usuario.contrasena === contra));
                  
    }
    /*Funcion para registrar un nuevo usuario*/
    const registrarUsuario = async (usuario) => {
        try {
            fetch(development + '/api/usuarios/', { 
                 method: 'POST', 
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(usuario)
             })
             .then(respuesta => {
                 if (respuesta.status === 201) {
                     Swal.fire({
                         position: 'center',
                         icon: 'success',
                         title: 'Registrado con exito',
                       })
                    
                     return respuesta.json();
                 }
                 else {
                     alert('No se puedo Registrar...');
                 }
             })
 
         } catch (error) {
             console.log("Algo salio mal al registrar usuario...")
             console.log(error)
         }
    }
    /** Cargar usuarios */
    const cargarUsuarios = async () => {
        try {
            const respuesta = await fetch(development + '/api/usuarios/');
            if (respuesta.status === 200) {
                const resp = await respuesta.json();
                await setUsuarios(resp);
            } else {
                setUsuarios([]);
            }

        } catch (error) {
            console.log("Algo salio mal con cargar usuarios: ",error)
        }
    }
    /** Get nombre paciete */
    const getPaciente = (id) => {
        const res =  usuarios.find(usuario => (usuario.cedula === id));
       // setPaciente(res);
       //console.log(res)
        return res;
    }
    /* Cargar recordatorios*/
    const cargarRecordatorios = async () => {
        try {
            const respuesta = await fetch(development + '/api/recordatorios/');
            if (respuesta.status === 200) {
                const resp = await respuesta.json();
                await setRecordatorios(resp);
            } else {
                setRecordatorios([]);
            }
        } catch (error) {
            console.log("Algo salio mal con cargar recordarios: ",error)
        }
    }
    /* Registrar recordatorio*/
    const registrarRecordatorio = async (recordatorio) => {
        try {
            fetch(development + '/api/recordatorios/', { 
                 method: 'POST', 
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(recordatorio)
             })
             .then(respuesta => {
                 if (respuesta.status === 201) {
                     Swal.fire({
                         position: 'center',
                         icon: 'success',
                         title: 'Recordatorio agregado con exito',
                         timer:2000,
                         showConfirmButton:false
                       })
                       cargarRecordatorios()
                     return respuesta.json();
                 }
                 else {
                     alert('No se puedo Registrar recor...');
                 }
             })
 
         } catch (error) {
             console.log("Algo salio mal al registrar recor...")
             console.log(error)
         }
    }
    return {
       cargarSolicitudes,
       registrarSolicitud,
       iniciarSesion,
       cargarUsuarios,
       eliminarSolicitud,
       registrarUsuario,
       getPaciente,
       cargarRecordatorios,
       registrarRecordatorio
    }

}