import './Solicitud.css'
import React,{useState,useContext,useEffect} from 'react'
import { PeticioneApi } from '../helpers/PeticionesApi';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import ModalFormula from '../modals/ModalFormula';
import Recordatorio from '../components/Recordatorio';
import Swal from 'sweetalert2';
import audio from './audio.mp3';

const Cliente = () => {

    
    const [openModal, setopenModal] = useState(false);
    /*Importamos funciones desde petiones api para cargar las solicitudes*/
    const {cargarSolicitudes, cargarRecordatorios} = PeticioneApi();
    const {solicitudes,setSolicitud,setUsuario,usuario,recordatorios} = useContext(AppContext);
    const navegacion = useNavigate();

    const abrirModal = () => {
        setopenModal(true);
    }

    const cerrarModal = () => {
        setopenModal(false);
    }

    const cerrarSesion = () => {
        setUsuario({});
        navegacion('/');
        window.localStorage.clear()
    }

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('usuario'));
        setUsuario(user)
        cargarRecordatorios()
        
     
        /*Cuando se renderiza el home principal cargamos las solictudes en la tabla*/
    },[])

    
    const comenzar = (tiempo, medicamento, cantidad) => {
     
        setInterval(() => {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Tomar medicamento: '+medicamento,
                confirmButtonText: 'Listo',
                text: 'Cantidad: '+cantidad
                
            }).then((result) =>{
                if(result.isConfirmed){
                    //Medicamento tomado
                    console.log('Tomado')
                }
            })
            reproducir()
        }, tiempo);

        
    }
    const audioElement = new Audio(audio);

    const reproducir = () => {
        audioElement.play();
    }
    
     
    return (
        <div className='home'>
            <div className="container">
                {openModal && <ModalFormula cerrarModal={cerrarModal}/>}
                <p>Bienvenido  <strong>{usuario.nombre}</strong></p>
                <h2>Recordatorios</h2>
                <div className="acciones-home">
           
                        <button onClick={abrirModal} className="btn btn-success">Nueva formula</button> 
                 
                        <button className='btn btn-warning' onClick={cerrarSesion}>Cerrar sesión</button>
                    
                </div>
                <hr />
                <div className="container">
                        <h4>Lista de Recordatorios</h4>
                        <div className='row items' >
                            {recordatorios.map((recordatorio) =>{
                                
                                if(recordatorio.paciente === usuario.cedula){

                               return(
                                <Recordatorio key={recordatorio.id} medicamento={recordatorio.medicamento} intensidad = {recordatorio.intensidad} cantidad={recordatorio.cantidad} admin={false} comenzar={comenzar} />
                            )}})}
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Cliente