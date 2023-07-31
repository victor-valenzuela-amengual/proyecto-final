import Perfil from "../components/Perfil.jsx";
import Menu from "../components/Navbar";
const VistaPerfil = () => {
  return (
    <div>
      <Menu mostrarInicioSesion={false}></Menu>
      <Perfil />
    </div>
  );
};

export default VistaPerfil;
