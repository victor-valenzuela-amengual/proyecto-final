const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const {  
  GetMovies,GetMovie,ConvencionHATEOAS,GetCategorias,GetReparto,verificarCredenciales,
  registrarUsuario,  verificarUsuario,getUsuario
} = require("./queries");
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Escuchando por el puerto ${PORT}`))
app.use(cors());
app.use(express.json());


const validaLogin = (req, res, next) => {
  try {     
     
    if (req.body.email === "" || req.body.password === "" || req.body.email === undefined)      
      throw new Error( { code: 500, message: 'error.message' });    
    next();
  } catch (error) {    
    res.status(400).send("Falta el usuario o la contraseña");
  }
};

const usuarioExiste = async (req, res, next) => {
  try {        
    await verificarUsuario(req.body.correo);
    next();
  } catch (error) {
    //throw new Error( { code: 500, message: error.message });    
    res.status(400).send(error);
  }
};


const verificarToken = async (req, res, next) => {
  try {      

    const Authorization = req.header("Authorization");      
    
    if(Authorization===undefined)
    {
      
      throw { code: 500, error:'No se ha enviado el token de autorización' }
    }
    
    const token = Authorization.split("Bearer ")[1];          
    jwt.verify(token, process.env.TOKEN);        
    next();
  } catch (error) {
    console.log(error);        
    res.status(error.code || 500).send(error);
  }
};
let correo={};
const decodificarToken = (req, res, next) =>{
  try {
        
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];    
    correo = jwt.decode(token);        
    next();
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
}
app.post("/login", validaLogin, async (req, res) => {
  try {
    const { email, password } = req.body;    

    await verificarCredenciales(email, password);    
    
    const token = jwt.sign({ email }, process.env.TOKEN, { expiresIn: 10 });        
    res.send(token);
  } catch (error) {
    
    res.status(error.code || 500).send(error.message);
  }
});

app.post("/registro",validaLogin,usuarioExiste,  async (req, res) => {
  try {        
   
    await registrarUsuario(req.body);            
    res.status(201).send({code:201,message:'Usuario creado'});
  } catch (error) {    
    res.status(error.code || 500).send(error);
  }
});

app.get("/usuario/:correo",  async (req, res) => {
  try {        
   //console.log(req.params)
    const usuario= await getUsuario(req.params);            
    res.status(200).send(usuario);
  } catch (error) {    
    res.status(error.code || 500).send(error);
  }
});

app.get("/peliculas",  async (req, res) => {
    try {        
      const movies = await GetMovies(req.query);
      //const conv = await ConvencionHATEOAS(movies);    
      res.json(movies);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.get("/categorias",  async (req, res) => {
    try {        
      const categ = await GetCategorias();      
      res.json(categ);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.get("/pelicula/:id",  async (req, res) => {
    try {                
       
      const movies = await GetMovie(req.params.id);
      //const hate = await prepararHATEOAS(joyas);    
      res.json(movies);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.get("/reparto/:id",  async (req, res) => {
    try {                
       
      const movies = await GetReparto(req.params.id);
      //const hate = await prepararHATEOAS(joyas);    
      res.json(movies);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });