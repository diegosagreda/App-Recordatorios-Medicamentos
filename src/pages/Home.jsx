import { useEffect, useState,useContext } from 'react';
import ModalFormula from '../modals/ModalFormula';
import './Home.css';
import { PeticioneApi } from '../helpers/PeticionesApi';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


export const Home = () => {
    const [openModal, setopenModal] = useState(false);
    /*Importamos funciones desde petiones api para cargar las solicitudes*/
    const {cargarSolicitudes,eliminarSolicitud,cargarUsuarios,getPaciente} = PeticioneApi();
    const {solicitudes,setSolicitud,setUsuario} = useContext(AppContext);
    const navegacion = useNavigate();

    const abrirModal = () => {
        setopenModal(true);
    }

    const verSolicitud = (solicitud) => {
        //setSolicitud(solicitud);
        window.localStorage.setItem('solicitud',JSON.stringify(solicitud));
        window.localStorage.setItem('paciente',JSON.stringify(getPaciente(solicitud.paciente)));
        navegacion('/solicitud');
    }
    const eliminar = async (id) => {
        await eliminarSolicitud(id);
    }

    const cerrarModal = () => {
        setopenModal(false);
    }

    const cerrarSesion = () => {
        setUsuario({});
        navegacion('/');
        window.localStorage.clear()
    }

    /*Cuando se renderiza el home principal cargamos las solictudes en la tabla*/
    useEffect(() => {
      cargarSolicitudes()
      cargarUsuarios()
    },[])
     
    return (
        <div className='home'>
            <div className="container">
                {openModal && <ModalFormula cerrarModal={cerrarModal}/>}
                <h2>Gestion de medicamentos</h2>
                <div className="acciones-home">
           
                        <button onClick={abrirModal} className="btn btn-success">Nueva formula</button> 
                 
                        <button className='btn btn-warning' onClick={cerrarSesion}>Cerrar sesión</button>
                    
                </div>
                <hr />
                <div className="col-xl-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Acción</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {
                                solicitudes.map(solicitud => (
                                    <tr key={solicitud.id}>
                                        <td>{solicitud.nombre}</td>
                                        <td>{solicitud.fecha}</td>
                                        <td>{solicitud.estado?'Aprobado':'Pendiente'}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=>verSolicitud(solicitud)}>Ver</button> 
                                            <button className='btn btn-danger' onClick={()=>eliminarSolicitud(solicitud.id)}>Eliminar</button>
                                        </td>
                                        
                                    </tr>
                                ))   
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}
