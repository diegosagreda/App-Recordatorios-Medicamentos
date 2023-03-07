import React,{useContext,useEffect,useState} from 'react'
import '../pages/Login.css';
import {useRef} from 'react'
import { PeticioneApi } from '../helpers/PeticionesApi';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const {iniciarSesion,cargarUsuarios,registrarUsuario } = PeticioneApi();
  const navigate = useNavigate()
  const user = useRef(null);
  const cont = useRef(null);

  const ced = useRef(null);
  const nom = useRef(null);
  const usu = useRef(null);
  const pass = useRef(null);

  const {usuario,usuarios,setUsuario} = useContext(AppContext);  
  const [registrar, setregistrar] = useState(false)

  useEffect(() => {
    cargarUsuarios()
  }, [])
  

  const iniciar = async () => {
    (iniciarSesion(user.current.value, cont.current.value))
    .then(res => {
      if(res.length > 0){
        const userlog = res[0]
        setUsuario(userlog)
        window.localStorage.setItem('sesion',true)
        window.localStorage.setItem('usuario',JSON.stringify(userlog))
       
        if(userlog.tipo === 'admin'){
          navigate('/home')
        }else if(userlog.tipo === 'cliente'){
          navigate('/cliente')
        }
      }
    })   
  }
  const registrarse = async () => {
    setregistrar(true)
  }

  const registrarNuevoUsuario = async () => {
    /**Capturamos valores de inputs */
    const nombre = nom.current.value
    const usuario = usu.current.value
    const password = pass.current.value
    const cedula = ced.current.value

    const data = {
      nombre:nombre,
      usuario:usuario,
      contrasena:password,
      cedula:cedula
    }
    registrarUsuario(data);
    setregistrar(false)
  }
  const cancelar = () => setregistrar(false)

  return (
    <div>
      {!registrar ?
        <div className='login'>
            <h2>Iniciar Sesión</h2>
            <label className='label-control' htmlFor="usuario">Usuario</label>
            <input className='form-control'type="text" id='usuario' ref={user}/>
            <label className='label-control' htmlFor="usuario">Contraseña</label>
            <input className='form-control' type="password" id='contrasema' ref={cont}/>
            <button onClick={iniciar} className='btn btn-primary'>Ingresar</button>
            <button onClick={registrarse} className='btn btn-success'>Registrarse</button>   
        </div>
        :
        <div className='registro'>
            <h2>Registro</h2>
            <label className='label-control' htmlFor="usuario">Cédula</label>
            <input className='form-control'type="number"ref={ced}/>
            <label className='label-control' htmlFor="usuario">Nombre</label>
            <input className='form-control' type="text" ref={nom}/>
            <label className='label-control' htmlFor="usuario">Usuario</label>
            <input className='form-control' type="text" ref={usu}/>
            <label className='label-control' htmlFor="usuario">Contraseña</label>
            <input className='form-control' type="password" ref={pass}/>



            <button onClick={registrarNuevoUsuario} className='btn btn-success'>Registrarse</button>   
            <button onClick={cancelar} className='btn btn-danger'>Cancelar</button>   
        </div>
      
    }
    </div>
  )
}

export default Login