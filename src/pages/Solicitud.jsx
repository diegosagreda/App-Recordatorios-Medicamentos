import React,{useContext,useState,useEffect} from 'react'
import './Solicitud.css'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import ModalRecordatorio from '../modals/ModalRecordatorio'
import Recordatorio from '../components/Recordatorio'
import { PeticioneApi } from '../helpers/PeticionesApi';


const Solicitud = () => {

 const {getPaciente,cargarRecordatorios,cargarUsuarios} = PeticioneApi()
 

  const [openModal, setopenModal] = useState(false)
  const {solicitud,paciente,recordatorios,setSolicitud,usuarios} = useContext(AppContext)
  const [nombrePaciente, setnombrePaciente] = useState('')
  const [cedula, setcedula] = useState('')
  const navigate = useNavigate()
  const [recordatoriosPaciente, setrecordatoriosPaciente] = useState([])

  const volverPantallaPrincipal = () => {
    navigate('/home')
  }

  const nuevoRecordatorio = () => {
    setopenModal(true); 
 }
 const cerrarModal = () => {
    setopenModal(false);
 }

 useEffect(()=>{
    cargarUsuarios()
    cargarRecordatorios()
    const res = JSON.parse(window.localStorage.getItem('solicitud'))
    const paciente = JSON.parse(window.localStorage.getItem('paciente'))

    setSolicitud(res)

    setnombrePaciente(paciente.nombre)
    setcedula(paciente.cedula)

    
 },[])

  return (
    <div className='solicitud'>
        {openModal && <ModalRecordatorio cerrarModal={cerrarModal} paciente={solicitud.paciente}/>}
        <div className="container">
            <div className="row">
            <h3>Solicitud</h3>
                <div className="col-xl-3">
                    <div className="btn btn-primary" onClick={volverPantallaPrincipal}>Volver</div>
                </div>
            </div>
        </div>
        <div className="row">

        </div>
        <div className="container">
            <div className="row">
                <div className="col-xl-6 col-md-6">
                    <h5>Formula Medica</h5>
                    <embed
                        src={solicitud.formula}
                        type="application/pdf"
                        frameBorder="0"
                        scrolling="auto"
                        height="400px"
                        width="100%"
                    ></embed>
                </div>
                <div className="col-xl-6 col-md-6 personales">
                    <div className="datos-personales">
                        <h5>Datos Personales</h5>
                        <p><strong>Nombre: </strong> {nombrePaciente}</p>
                        <p><strong>Cedula: </strong> {cedula}</p>
                    </div>
                  
                </div>
            </div>
            <div className="row">
               
                <div className="col-xl-3 btn-nuevoRecordatorio">
                    <div onClick={nuevoRecordatorio} className="btn btn-success">Añadir recordatorio</div>
                </div>
            </div>
        </div>
        <div className="container recordatorios">
            <h4>Lista de Recordatorios</h4>
            <div className='row items' >
                {recordatorios.map((recordatorio) => {
                    if(recordatorio.paciente === solicitud.paciente){
                        return(
                            <Recordatorio key={recordatorio.id} medicamento={recordatorio.medicamento} intensidad = {recordatorio.intensidad} cantidad={recordatorio.cantidad} admin={true}/>
                        )
                    }
                } )}
            </div>
        </div>

    </div>
  )
}

export default Solicitud