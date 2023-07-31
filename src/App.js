import { Container } from "react-bootstrap";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import Home from "./views/Home";
import Login from "./views/login";
import VistaPerfil from "./views/VistaPerfil";
import Registro from "./views/registro";
import PageCarrito from "./views/pageCarrito"
import PagePelicula from "./views/pagePelicula"
function App() {
  return (
    <BrowserRouter>
      <MovieProvider>
        <Container fluid>
          
            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route path="/login" element={<Login />} />  
              <Route path="/registro" element={<Registro />} />     
              <Route path="/perfil" element={<VistaPerfil />} />
              <Route path="/carrito" element={<PageCarrito />} />
              <Route path="/pelicula/:idmovie" element={<PagePelicula />} />
              {/* <Route path="/pageom/:numero" element={<PageOM />} /> */}
              {/* <Route path="/pagecomics/:idHero" element={<PageComics />} />             */}
            </Routes>          
        </Container>
      </MovieProvider>
    </BrowserRouter>
  );
}

export default App;
