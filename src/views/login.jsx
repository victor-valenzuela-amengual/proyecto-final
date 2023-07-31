import { useState, useContext } from "react";
import ErrorLogin from "../components/ErrorLogin";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieContext from "../contexts/MovieContext";
import { Button, Form, Row, Col, Container, FormText, FormControl } from "react-bootstrap";

export default function Login() {
  const [errorLogin, setErrorLogin] = useState("");
  const { setUsuario } = useContext(MovieContext);
  const navigate = useNavigate();
  const [usuario, setUsuarioLocal] = useState({});

  const { urlRaiz } = useContext(MovieContext);

  const handleSetUsuario = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
   
    setUsuarioLocal({ ...usuario, ...field });
    setErrorLogin("");
   
  };

  const iniciarSesion = async () => {
    const endpoint = `${urlRaiz}login`;
    try {
      console.log(usuario)
      const { data: token } = await axios.post(endpoint, usuario);
      localStorage.setItem("token", token);

      setUsuario(usuario);
      navigate("/perfil");
    } catch (error) {
      if (error.response !== undefined) {
        setErrorLogin(error.response.data);
      } else {
        setErrorLogin(error.message);
      }
    }
  };

  const toRegistro = () => {
    navigate("/registro");
  };

  return (
    <Container fluid className="text-light d-flex">
      <Form className="col-lg-4 col-xl-3  text-light offset-4 border mt-5">
        {/* <Row className="justify-content-sm-center mt-3">
          <Col sm={3}>
            <Image src={img}></Image>
          </Col>
        </Row> */}
        <Row className="text-center mt-3 fuente">
          <Col ss={6}>
            <h4 className="text-dark"> Inicio de sesión</h4>
          </Col>
        </Row>

        <Form.Group className="m-3" controlId="login">
          <Form.Control
            type="email"
            name="email"
            value={usuario.email}
            placeholder="Ingrese usuario"
            onChange={(e) => {
              handleSetUsuario(e);
            }}
          />
        </Form.Group>
        <Form.Group className="m-3" controlId="pass">
          <Form.Control
            type="password"
            value={usuario.password}
            name="password"
            placeholder="Ingrese contraseña"
            onChange={(e) => {
              handleSetUsuario(e);
            }}
          />
        </Form.Group>
        <Form.Group className="m-3" controlId="pass">
          <Button
            variant="primary"
            type="button"
            className="w-100 mb-3"
            // disabled={usuario === "" || parole === "" ? true : false}
            onClick={(e) => {
              iniciarSesion(e);
            }}
          >
            {/* <Navigate to="/observaciones"></Navigate> */}
            Ingresar
          </Button>
          {errorLogin && <ErrorLogin error={errorLogin}></ErrorLogin>}
        </Form.Group>
      </Form>
    </Container>
  );
}
