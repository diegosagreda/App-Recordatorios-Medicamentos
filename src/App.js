import './App.css';
import { useContext } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import Solicitud from './pages/Solicitud';
import Cliente from './pages/Cliente';
import { AppContext } from './context/AppContext';


function App() {

  const {usuario} = useContext(AppContext);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

              <Route path="/" element={<Login/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/solicitud" element={<Solicitud/>}/>
     
              <Route path="/cliente" element={<Cliente/>}/>
         
              <Route path="*" element={<h1>Not found</h1>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
/**
 *  <Route path="/" element={<Login/>}/>
          {usuario.tipo === 'admin' &&
            <Route element={<ProtectedRoute/>}>
              <Route path="/home" element={<Home/>}/>
              <Route path="/solicitud" element={<Solicitud/>}/>
            </Route>
          }
          {usuario.tipo === 'cliente' &&
            <Route element={<ProtectedRoute/>}>
              <Route path="/cliente" element={<Cliente/>}/>
            </Route>
          }
          <Route path="*" element={<h1>Not found</h1>}/>
 * 
 */