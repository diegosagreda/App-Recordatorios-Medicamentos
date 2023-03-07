
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { storage } from './config'

export const Firebase = () => {

    const addDocumento = async (file, uid, nombre) => {
    
      const filename = file.name
      const tipoArchivo = file.type
    
      let newName = ''
      let ext = ''
    
      //crear nuevo archivo para cambiar nombre
      const blob = file.slice(0, file.size, tipoArchivo)
      //guardar extension de archivo
      ext = filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
      // renombrar
      newName = nombre + '.' + ext
    
      const storageRef = ref(storage, `${uid}/` + newName)
    
      const newFile = new File([blob], newName, { type: tipoArchivo })
    
      await uploadBytes(storageRef, newFile)
      

      return getDownloadURL(storageRef)
   
    }

    return { addDocumento }
}
