import {useState, useEffect} from 'react' // Hooks
import { Error } from './Error'
// rafce
const Formulario = (props) => {
  //const [nombreDeLaVariable,seterDeLaVariable] = useState(ValorInicial);
  const [nombre,setNombre] = useState('');
  const [propietario,setPropietario] = useState('');
  const [email,setEmail] = useState('');
  const [fecha,setFecha] = useState('');
  const [sintomas,setSintomas] = useState('');

  const [error,setError] = useState(false)

  useEffect(() => {
    console.log('Componente listo')
  }, []) // Se ejecuta una sola vez

  useEffect(() => {
    if (Object.keys(props.paciente).length > 0) {
      setNombre(props.paciente.nombre)
      setPropietario(props.paciente.propietario)
      setEmail(props.paciente.email)
      setFecha(props.paciente.fecha)
      setSintomas(props.paciente.sintomas)
    }
  },[props.paciente]) // Se ejecuta cuando cambia paciente

  const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validacion del formulario
    if ([nombre,propietario,email,fecha,sintomas].includes('')) {
      console.log('Hay un campo vacio')
      setError(true)
      return
    } 
    setError(false)

    // Objeto de Paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    }
    
    if (props.paciente.id) {
      // Editando el Registro
      objetoPaciente.id = props.paciente.id
      const pacientesActualizados = props.pacientes.map( 
        pacienteState => pacienteState.id === props.paciente.id ? objetoPaciente : pacienteState )
      
      props.setPacientes(pacientesActualizados)
      props.setPaciente({})

    } else {
      // Nuevo Registro
      objetoPaciente.id = generarId()
      props.setPacientes([...props.pacientes, objetoPaciente])
    }

    // Reiniciar formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">
          Añade Pacientes y {''}
          <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
          {/* Si error es true muestra el div */}
          {/* {error && <Error mensaje='Todos los campos son obligatorios'/>} */}
          {error && <Error><p>Todos los campos son obligatorios</p></Error>}
          <div className="mb-5">
            <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
              Nombre Mascota
            </label>
            <input 
              id="mascota"
              type="text"
              placeholder="Nombre de la mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} // Evento de react
            />
          </div>

          <div className="mb-5">
            <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
              Nombre Propietario
            </label>
            <input 
              id="propietario"
              type="text"
              placeholder="Nombre del propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={propietario}
              onChange={(e) => setPropietario(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
              Email
            </label>
            <input 
              id="email"
              type="email"
              placeholder="Email Contacto Propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
              Alta
            </label>
            <input 
              id="alta"
              type="date"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
              Síntomas
            </label>
            <textarea 
              id="sintomas"
              type="text"
              placeholder="Describe los síntomas"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
            />
          </div>

          <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded-md"
            value={props.paciente.id ? 'Editar Paciente' : 'Agregar paciente'}
          />
        </form>
    </div>
  )
}

export default Formulario
