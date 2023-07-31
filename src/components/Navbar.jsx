import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
//import "../css/css-components/navbar.css"
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";

import { NavLink } from "react-router-dom";
import { useContext } from "react";
import MovieContext from "../contexts/MovieContext";

const MyNavbar = (props) => {
  const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);
  const { price, cantidad } = useContext(MovieContext);

  return (
    <>
      <Navbar expand="sm" className="bg-success-subtle">
        <Container fluid>
          <Navbar.Brand href="#home">
            {" "}
            <h3>Películas G27</h3>
          </Navbar.Brand>
          <Navbar.Toggle />
          <NavLink
            to="/login"
            className={`navlink ${setActiveClass} d-block d-sm-none`}
          >
            <AiOutlineUser className="icon" />
          </NavLink>
          <Navbar.Offcanvas className="bg-success-subtle">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Películas G27</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink
                  to="/"
                  className={`navlink ${setActiveClass} p-2 d-flex align-items-center`}
                >
                  <AiOutlineHome className="icon" />
                  <p className="mt-2">Inicio</p>
                </NavLink>
                {/* /////////// */}
                <NavLink
                  to="/carrito"
                  className={`navlink ${setActiveClass} d-flex  p-2 align-items-center`}
                >
                  <AiOutlineShoppingCart className="icon" />
                  <p className="mt-2">Carrito</p>
                </NavLink>
                {props.mostrarInicioSesion ? (
                  <NavLink
                    to="/login"
                    className={`navlink ${setActiveClass} d-flex d-sm-flex p-2 align-items-center`}
                  >
                    <AiOutlineUser className="icon" />
                    <p className="mt-2">Iniciar sesión</p>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    className={`navlink ${setActiveClass} d-flex d-sm-flex p-2 align-items-center`}
                  >
                    <AiOutlineLogout className="icon" />
                    <p className="mt-2">Cerrar sesión</p>
                  </NavLink>
                )}

                <NavLink
                  to="/registro"
                  className={`navlink ${setActiveClass} d-flex d-sm-flex p-2 align-items-center`}
                >
                  <AiOutlineUser className="icon" />
                  <p className="mt-2">Registrarse</p>
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/* <div className="p-4">
        <div className="container-fluid">
          <div className="row">
            
            <form className="d-none d-md-flex col-6 align-items-center">
              <input className="form-control" placeholder="Buscar productos" />
            </form>
            
            <form className="d-flex d-md-none py-3 align-items-center">
              <input className="form-control" placeholder="Buscar productos" />
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default MyNavbar;
