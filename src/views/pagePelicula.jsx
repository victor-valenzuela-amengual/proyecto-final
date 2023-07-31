import Pelicula from "../components/Pelicula";
import { useParams } from "react-router-dom";
import Menu from "../components/Navbar";
import { Row, Col } from "react-bootstrap";
const Movie = () => {
  return (
    <Row>
      <Col>
        <Menu></Menu>
      </Col>
      <div>
        <Pelicula />
      </div>
    </Row>
  );
};

export default Movie;
