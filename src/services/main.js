import { database } from './config'
import { ref, update } from 'firebase/database'


export const ACTUALIZAR_DOCUMENTO_REALTIME = async (
  rutaDocumento,
  idDocumento,
  documento
) => await update(ref(database, rutaDocumento + '/' + idDocumento), documento)

