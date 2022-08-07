import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarModal from '../img/cerrar.svg'

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto,
    gastoEditar,
    setGastoEditar
}) => {

  const [mensaje, setMensaje] = useState('')
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')


  useEffect(() => {
    if ( Object.keys(gastoEditar).length > 0) {
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
    }
  }, [])

  const cerrarModal = () => {
    setAnimarModal(false)
    setGastoEditar({})
    setTimeout(() => {
        setModal(false)
    },100)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if([nombre, cantidad, categoria].includes('')) {
        setMensaje('Todos los campos son obligatorios')
        return
    }
    guardarGasto({nombre, cantidad, categoria, id, fecha})
  }
  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img 
                src={CerrarModal} 
                alt="cerrar modal" 
                onClick={cerrarModal}    
            />
        </div>
        <form 
            className={`formulario ${animarModal ? 'animar': 'cerrar'}`}
            onSubmit={handleSubmit} 
        >
            <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>

            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
            <div className='campo'>
                <label htmlFor='nombre'>Nombre gasto</label>

                <input 
                    id='nombre'
                    type="text" 
                    placeholder='Añade el Nombre del gasto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor='cantidad'>cantidad</label>

                <input 
                    id='cantidad'
                    type="number" 
                    placeholder='Añade la cantidad del gasto: ej. 300'
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor='categoria'>Categoria</label>
                <select
                    id='categoria'
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                >
                    <option value="" >-- Seleccione --</option>
                    <option value="ahorro" >Ahorro</option>
                    <option value="comida" >Comida</option>
                    <option value="casa" >Casa</option>
                    <option value="gastos" >Gastos varios</option>
                    <option value="ocio" >Ocio</option>
                    <option value="salud" >Salud</option>
                    <option value="suscripciones" >Suscripciones</option>
                </select>
            </div>

            <input 
                type="submit"
                value={gastoEditar.nombre ? 'Editar gasto' : 'Añadir gasto'}
            />
        </form>
    </div>
  )
}

export default Modal