import { useNavigate, } from "react-router-dom";
import { useContext, useEffect } from "react";
import MovieContext from "../contexts/MovieContext";

import {
  Card,
  Row,
  Col,
  Container,
  FormText,
  FormControl,
  Button,
} from "react-bootstrap";

import {
  AiOutlineWarning,
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { useState } from "react";
const Galeria = () => {
  const {
    DataMovies,
    errorMovies,
    dataMovies,
    loadingMovies,
    setCriteriosBusquedaPeliculas,
    criteriosBusquedaPeliculas,
    urlRaiz
  } = useContext(MovieContext);

  const navigate = useNavigate();  
 
  const [idPeli,setIdPeli]=useState(0);
  const buscarPeliculas = (e) => {
    setCriteriosBusquedaPeliculas({
      idCategoria: 0,
      agno: 0,
      titulo: e.target.value,
      director: "",
    });
  };
  const buscarPeliculasxAño = (e) => {
    setCriteriosBusquedaPeliculas({
      idCategoria: 0,
      agno: e.target.value,
      titulo: "",
      director: "",
    });
  };
  const agregarCarrito = (e) => {
    e.preventDefault();
    
    let parent = e.target.parentNode;
    let nodo = e.target;
    let id = 0;
    //Si pincha la imagen
    if (parent) id = parent;
    else id = nodo;


  };
  
  const detallePelicula = () => {    
     try {    
      if(idPeli===0) return;
    
     //console.log(idPeli);    
    navigate(`pelicula/${idPeli}`);
    } catch (error) {
      console.log(error);
    }
    
  };

 useEffect(() => {  
  detallePelicula(idPeli);
 }, [idPeli]);

  useEffect(() => {
    DataMovies();
  }, [criteriosBusquedaPeliculas]);

  if (loadingMovies) return <div>Cargando</div>;
  if (errorMovies) return <div>Error: {errorMovies}</div>;
  if (dataMovies === null) return <div>Cargando..</div>;
  // <Card bg="success"
  return (
    <Container>
      <Row>
        <Col sm={1}>
          <FormText>Buscar</FormText>
        </Col>
        <Col sm={3}>
          <FormControl
            as={"input"}
            size="sm"
            placeholder="Título"
            onChange={(e) => {
              buscarPeliculas(e);
            }}
          ></FormControl>
        </Col>        
        <Col sm={1}>
          <FormControl
            as={"input"}
            size="sm"
            placeholder="Año"
            onChange={(e) => {
              buscarPeliculasxAño(e);
            }}
          ></FormControl>
        </Col>
      </Row>
      <Row xs={1} sm={2} md={3} lg={4} xl={6} className="border border-danger">
        {dataMovies.map((movies, idx) => {
          return (
            <Col className="d-flex" key={movies.id}>
              <Card className="mb-2" key={movies.id}>
                <a href="#"><Card.Img
                  className=""
                  value={movies.id}
                  variant="top"
                  src={`./assets/img/${movies.id}.jpg`}                  
                  onClick={()=>{setIdPeli(movies.id)}}                  
                /></a>
                <Card.Body>
                  <Card.Title className="text-center fuente-card">
                    {movies.titulo_alt ? movies.titulo_alt : movies.titulo}
                  </Card.Title>
                  <Card.Subtitle className="text-center fuente-card">
                    {movies.agno} {movies.id}
                  </Card.Subtitle>
                  {/* <Card.Text className="text-center">
                  <AiOutlineShoppingCart onClick={(e)=>{agregarCarrito(e)}}/>
                  </Card.Text> */}
                  <Button
                    className="button-size text-dark p-0"
                    variant="primary"
                    size="sm"
                    value={movies.id}
                    onClick={(e) => {
                      agregarCarrito(e);
                    }}
                  >
                    <AiOutlineShoppingCart className="carrito-icon" />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Galeria;
