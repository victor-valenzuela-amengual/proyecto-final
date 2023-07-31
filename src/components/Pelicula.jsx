//import "../css/css-components/card_details.css"
import { AiOutlineShoppingCart,AiOutlineStar,AiFillStar } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useContext ,useEffect,useState} from "react";
import MovieContext from "../contexts/MovieContext";
import axios from "axios";

const Pelicula = () => {
  const { dataMovies, movieAdd,urlRaiz } = useContext(MovieContext);
  const { idmovie } = useParams();
  const [pelicula,setPelicula] = useState([]);
  const [estrellas,setEstrellas] = useState([0,0,0,0,0]);

  let selectedMovie =[];
   //dataMovies.filter(  (peli) => peli.id === parseFloat(idmovie)

  const detallePelicula = async () => {        
    let url = `${urlRaiz}pelicula/${idmovie}`;    
    try {
      const res = await axios.get(url);

      setPelicula(res.data);
    } catch (error) {
      //setErrorMovies(error.message);
    } finally {
      //setLoadingMovies(false);
    }
  };
  
  const puntuarEstrella = (id)=>{
    console.log(estrellas)

    
  }
  useEffect(() => {  
    detallePelicula();
    puntuarEstrella();
   }, []);
    
  return (
    <div>
      {pelicula.map((element) => {
        return (
          <div>
            <div key={element.id} className="details-card-flex">
              <img  src={`./assets/img/${element.id}.jpg`} alt=''/> 
              <div className="m-3">
                <div className="d-flex justify-content-between">
                  <h2>{element.titulo}</h2>
                  <h2>Puntuación</h2>
                </div>
                <hr />
                <p>{element.sinopsis}</p>
                <hr />
                <p className="fw-bold">Género</p>
                <p>{element.genero}</p>
                <hr />
                <div className="price-add">
                  <p className="fw-bold">
                    Precio: $<span>{element.precio}</span>
                  </p>
                  <Button
                    onClick={() => movieAdd(element)}
                    variant="success"
                    className="add text-light btn-flex"
                  >
                    Añadir
                    <AiOutlineShoppingCart className="btn-icon" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-3 coments">
              <p className="fuente">Comentarios</p>
              <hr />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                voluptates? Fugiat necessitatibus nostrum ea natus enim animi
                sint odit eius dolores.
              </p>
            </div>
            <div className="mt-3 mb-5 p-3 coments">
              <div className="d-flex justify-content-between">
                <p>Valora y/o deja tu comentario</p>
                {/* <p>Puntúa *insertar estrellitas"*</p> */}
                <AiOutlineStar className="btn-icon" />
                <AiOutlineStar className="btn-icon" />
                <AiOutlineStar className="btn-icon" />
                <AiOutlineStar className="btn-icon" />
                <AiOutlineStar className="btn-icon" />
              </div>
              <hr />
              <input type="text" className="user-coment" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Pelicula;
