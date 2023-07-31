import { createContext, useState } from "react";
import axios from "axios";
import { useContext,useEffect } from "react";

const MovieContext = createContext(null);
const MovieProvider = ({ children }) => {
  const [dataCateg, setDataCateg] = useState(null);
  const [dataMovies, setDataMovies] = useState(null);
  const [carrito, setCarrito] = useState([])
  const [idCategoria, setIdCategoria] = useState(0);
  const [errorMovies, setErrorMovies] = useState(null);
  const [errorCateg, setErrorCateg] = useState(null);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingCateg, setLoadingCateg] = useState(true);
  const [usuario, setUsuario] = useState({});
  const [criteriosBusquedaPeliculas, setCriteriosBusquedaPeliculas] = useState({});
  const [price, setPrice] = useState(0)
  const [cantidad, setCantidad] = useState(0) 
  
  const urlRaiz = "http://localhost:5000/";

  const DataCategories = async () => {
    let url = `${urlRaiz}categorias`;
    try {
      const res = await axios.get(url);
      setDataCateg(res.data);
    } catch (error) {
      setErrorCateg(error.message);
    } finally {
      setLoadingCateg(false);
    }
  };

  const DataMovies = async () => {
    const categoria = criteriosBusquedaPeliculas.idCategoria??0;
    const year = criteriosBusquedaPeliculas.agno;
    const title = criteriosBusquedaPeliculas.titulo??'';
    
    let url = `${urlRaiz}peliculas?idcategoria=${categoria}&agno=${year}&titulo=${title}&director=`
    + `&limit=30&page=1&orderby=agno_DESC,titulo_ASC`;
    
    try {
      const res = await axios.get(url);
      setDataMovies(res.data);
    } catch (error) {
      setErrorMovies(error.message);
    } finally {
      setLoadingMovies(false);
    }
  };
  useEffect(() => {
    let precioTotal = 0
    let cantidadTotal = 0
    carrito.forEach(function (movie) {
      precioTotal += movie.price * movie.cantidad
      cantidadTotal += movie.cantidad
      setPrice(precioTotal)
      setCantidad(cantidadTotal)
    })
  }, [carrito])

  const movieAdd = (element) => {
    const movieCarrito = {
      id: element.id,
      img: element.img,
      name: element.name,
      price: element.price,
      cantidad: 1,
    }
    const addedMovie = carrito.find((e) => e.id === element.id)
    if (addedMovie) {
      addedMovie.cantidad += 1
      setCarrito([...carrito])
    } else setCarrito([...carrito, movieCarrito])
  }

  const movieRemove = (element, index) => {
    const removedMovie = carrito.find((e) => e.id === element.id)
    if (removedMovie.cantidad > 0) {
      removedMovie.cantidad -= 1
      setCarrito([...carrito])
    } else {
      carrito.splice(index, 1)
      setCarrito([...carrito])
    }
  }

  return (
    <MovieContext.Provider
      value={{
        DataCategories,
        DataMovies,
        errorCateg,
        errorMovies,
        setIdCategoria,
        dataCateg,
        dataMovies,
        loadingCateg,
        loadingMovies,
        idCategoria,
        urlRaiz,
        setUsuario,
        usuario,
        criteriosBusquedaPeliculas,
        setCriteriosBusquedaPeliculas,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieProvider };
export default MovieContext;
