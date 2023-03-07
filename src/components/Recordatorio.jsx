import React from 'react'
import './Recordatorio.css'

const Recordatorio = ({medicamento, intensidad, cantidad, editar, eliminar, admin,comenzar}) => {

  return (
    <div className='recordatorio'>
        <div className='column1'>
            <label htmlFor="">Medicamento</label>
            <h4>{medicamento}</h4>
        </div>
        <div className='column1'>
            <label htmlFor="">Intensidad</label>
            <h4>{intensidad}</h4>
        </div>
        <div className='column1'>
            <label htmlFor="">Cantidad</label>
            <h4>{cantidad}</h4>
        </div>
        <div className='column1'>
            <label htmlFor="">Acción</label>
            {admin ?
                <div>
                    <button className='btn btn-primary' onClick={editar}>Editar</button>
                    <button className='btn btn-danger' onClick={eliminar}>Eliminar</button>
                </div>
                :
                <div>
                     <button className='btn btn-info' onClick={()=>comenzar(10000,medicamento,cantidad)}>Comenzar</button>
                </div>
            }
        </div>
        
        <p></p>
    </div>
  )
}

export default Recordatorio