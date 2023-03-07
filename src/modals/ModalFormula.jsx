import React,{useState,useRef,useContext} from 'react'
import './ModalFormula.css'
import {Firebase} from '../services/manageDocs.js'
import { PeticioneApi } from '../helpers/PeticionesApi'
import { AppContext } from '../context/AppContext'

const ModalFormula = ({cerrarModal}) => {

  const {usuario} = useContext(AppContext)
  const [documento, setdocumento] = useState()
  const nombre = useRef(null)
  const {registrarSolicitud} = PeticioneApi()

  const {addDocumento} = Firebase()

  const onChange = (env) => {
    setdocumento(env.target.files[0])
  }
  const enviar = () => {  
    
    addDocumento(documento,'1122785365',nombre.current.value)
   
    .then(res => {
        const data = {
          "nombre":nombre.current.value,
          "paciente":'',
          "formula":res,
          "fecha":new Date().toLocaleDateString(),
          "estado":false
    
      }
      data.paciente = usuario.cedula
      registrarSolicitud(data)
    })
  }
   
  return (
    <div className='modal-active'>
        <div className="form-modal">
            <h4>Registrar formula</h4>
            <div >
                <label className='form-label'>Descripción</label>
                <input type="text" className='form-control' ref={nombre}/>
                <label className='form-label'>Formula</label>
                <input onChange={onChange} type="file" className='form-control'/>
                <div className='acciones-modal'>
                    <button onClick={enviar} className="btn btn-success">Enviar</button>
                    <button onClick={cerrarModal} className="btn btn-danger">Cancelar</button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ModalFormula;