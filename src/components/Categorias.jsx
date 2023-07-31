import { ListGroup, Row, Col, Form } from "react-bootstrap";
import { useContext, useEffect } from "react";
import MovieContext from "../contexts/MovieContext";
import Badge from "react-bootstrap/Badge";
import { Select } from "@mui/material";

const Categorias = () => {
  const {
    dataCateg,
    loadingCateg,
    errorCateg,    
    DataCategories,
    setCriteriosBusquedaPeliculas
  } = useContext(MovieContext);

  const GetMovies = (e) => {
    e.preventDefault();
    setCriteriosBusquedaPeliculas({idCategoria:e.target.value,agno:0,titulo:'',director:''})    
  };

  useEffect(() => {
    DataCategories();
  }, []);

  if (loadingCateg) return <div>Cargando</div>;
  if (errorCateg) return <div>Error: {errorCateg}</div>;
  if (dataCateg === null || dataCateg === undefined)
    return <div>Cargando..</div>;

  return (
    <Row className="d-block ">
      <Col >
        <Row className="d-xs-block d-sm-block d-lg-none d-md-none">
          <Col xs={12}>
            <Form.Select
              onClick={(e) => {
                GetMovies(e);
              }}
            >
              <option>Seleccione categoría</option>
              {dataCateg.map((categ, idx) => {
                return (
                  <option key={idx} id={categ.id}>
                    {categ.categoria}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
        </Row>
      </Col>
      <Col className="" >
        <ListGroup className="d-none d-md-block  ">
          {dataCateg.map((categ, idx) => {
            return (
              <Row key={idx}>
                <Col xs={12}>
                  <ListGroup.Item
                    className="py-0 button border-0"
                    as="button"
                    
                    id={categ.id}
                    //active={categ.id === idCategoria}
                    value={categ.id}
                    onClick={(e) => {
                      GetMovies(e);
                    }}
                  >
                    {categ.categoria}
                  </ListGroup.Item>
                </Col>
              </Row>
            );
          })}
        </ListGroup>
      </Col>
    </Row>
  );
};
export default Categorias;
