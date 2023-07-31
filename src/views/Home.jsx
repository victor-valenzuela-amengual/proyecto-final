import Categorias from "../components/Categorias";
import { Row, Col } from "react-bootstrap";
import Galeria from "../components/Galeria";
import { ErrorBoundary } from "react-error-boundary";
import Menu from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Row>
        <Col>
          <Menu mostrarInicioSesion={true}></Menu>
        </Col>
      </Row>
      <Row className="d-xs-block d-sm-block d-md-flex d-lg-flex d-xl-flex">
        <Col xs={2} sm={6} md={3} xl={3} className="px-0">
          <h4 className="text-center">Categorias</h4>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Categorias></Categorias>
          </ErrorBoundary>
        </Col>
        <Col className="">          
          <Galeria idcategoria={0}></Galeria>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
