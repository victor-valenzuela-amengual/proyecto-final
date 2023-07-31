import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieContext from "../contexts/MovieContext";

export default function Registro() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({});
  const {
    urlRaiz
  } = useContext(MovieContext);

  const handleSetUsuario = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
    setUsuario({ ...usuario, ...field });
    console.log(usuario);
  };

  const registrarUsuario = async () => {
    
    const endpoint = `${urlRaiz}registro`;
    try {
      await axios.post(endpoint, usuario);
      alert("Usuario registrado con éxito");
      navigate("/login");
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
      <h1>Registrarse</h1>
      <hr />
      <div className="form-group mt-1 ">
        <label>Correo electrónico</label>
        <input
          value={usuario.email}
          onChange={handleSetUsuario}
          type="email"
          name="email"
          className="form-control"
          placeholder="ejemplo@email.com"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Nombre</label>
        <input
          value={usuario.name}
          onChange={handleSetUsuario}
          type="text"
          name="nombre"
          className="form-control"
          placeholder="Nombre completo"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Dirección</label>
        <input
          value={usuario.address}
          onChange={handleSetUsuario}
          type="text"
          name="direccion"
          className="form-control"
          placeholder="Ingrese dirección"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Teléfono</label>
        <input
          value={usuario.phone}
          onChange={handleSetUsuario}
          type="number"
          name="fono"
          className="form-control"
          placeholder="912364567"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Contraseña</label>
        <input
          value={usuario.password}
          onChange={handleSetUsuario}
          type="password"
          name="password"
          className="form-control"
          placeholder="Contraseña"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Repetir contraseña</label>
        <input
          value={usuario.password}
          onChange={handleSetUsuario}
          type="password"
          name="password"
          className="form-control"
          placeholder="Contraseña"
        />
      </div>
      
      <button onClick={registrarUsuario} className="btn btn-success mt-3">
        Registrarme
      </button>
    </div>
  );
}
