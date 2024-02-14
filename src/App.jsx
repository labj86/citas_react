import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

  const [pacientes,setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  useEffect(() => {
    setPacientes(JSON.parse(localStorage.getItem('pacientes')) ?? [])
  }, [])
  
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])
  
  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter( pacienteAc => pacienteAc.id !== id )   
    setPacientes(pacientesActualizados)
  }

  return ( 
  <div className="container mx-auto mt-20">
    
    <Header />
    
    <div className="mt-12 md:flex">
      <Formulario
        pacientes = {pacientes} // props
        setPacientes = {setPacientes}
        paciente = {paciente}
        setPaciente = {setPaciente}
      />
      <ListadoPacientes 
        pacientes = {pacientes}
        setPaciente={setPaciente}
        eliminarPaciente = {eliminarPaciente}
      />
    </div>

  </div>
  )
}

export default App

/*
jsx - JavaScript Syntax Extension

Si un elemento tiene etiqueta de apertura, también debe tener un cierre

Las etiquetas de solo apertura deben finalizar con />

Todos los componentes deben tener un return, en el cual debe haber máximo un solo elemento
en el nivel máximo

function App() {

  const edad = 17

  const sumar = x => {
    console.log(x + x)
  } 

  sumar(2)

  // En el return pueden ir ternarios, pero no if
  // Pueden haber expresiones pero no sentencias
  return ( 
  <>
    {edad >= 18 ? 'Mayor de edad' : 'Menor de edad'}
    <div>
      <h1>{'Hola Mundo'.toUpperCase()}</h1>
      <input type="text" defaultValue={edad}/>
    </div>
  </>
  )
}

*/