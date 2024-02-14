// rfce
//function Header(props) { // props, palabra reservado para propiedades
function Header() {

  return (
    <>
      <h1 className="font-black text-5xl text-center md:w-3/4 mx-auto">
        Seguimiento Pacientes {''} <br />
        <span className="text-indigo-600">Veterinaria</span>
      </h1>
    </>
  )
}

export default Header
