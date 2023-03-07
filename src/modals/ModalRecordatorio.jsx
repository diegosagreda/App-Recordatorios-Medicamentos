import React,{useRef} from 'react'
import './ModalRecordatorio.css'
import { PeticioneApi } from '../helpers/PeticionesApi'

const ModalRecordatorio = ({cerrarModal,paciente}) => {

  const {registrarRecordatorio} = PeticioneApi()
  
  const medicamento = useRef(null)
  const intensidad = useRef(null)
  const cantidad = useRef(null)

  const agregarRecordatorio = (e) => {
    const data = {
      paciente: paciente,
      medicamento: medicamento.current.value,
      intensidad: intensidad.current.value,
      cantidad: cantidad.current.value
    }
    registrarRecordatorio(data)
  }

  return (
    <div className='modal-active'>
        <div className="form-modal">
        <h4>Nuevo recordatorio</h4>
        <div >
            <label className='form-label'>Medicamento</label>
            <input type="text" className='form-control' ref={medicamento}/>
            <label className='form-label'>Intensidad</label>
            <input type="text" className='form-control' ref={intensidad} placeholder="Cada numero horas"/>
            <label className='form-label'>Cantidad</label>
            <input type="text" className='form-control' ref={cantidad}/>
            

            <div className='acciones-modal'>
                <button onClick={agregarRecordatorio} className="btn btn-success">Enviar</button>
                <button onClick={cerrarModal} className="btn btn-danger">Cancelar</button>
            </div>
        </div>

        </div>
    </div>
  )
}

export default ModalRecordatorio