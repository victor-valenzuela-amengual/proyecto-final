import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Avatar } from "@mui/material";
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import Mensajes from "./Mensajes";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://desafiolatam.com/">
        Desafio Latam
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignInSide = (props) => {
  const { show, handleClose } = props;

  const [nombre, setNombre] = useState("");
  const [direc, setDirec] = useState("");
  const [fono, setFono] = useState("");
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");
  const [passConf, setPassConf] = useState("");
  const [habil, setHabil] = useState(true);
  const [errorPass, setErrorPass] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const verificarDatos = () => {
    setHabil(true);
    if (
      nombre !== "" &&
      direc !== "" &&
      fono !== "" &&
      correo !== "" &&
      pass !== ""
    )
      setHabil(false);
  };

  const compararPasswords = () => {
    setErrorPass(false);
    if (pass !== passConf) {
      setErrorPass(true);
      return false;
    } else return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (compararPasswords()) {
      const data = new FormData(event.currentTarget);
      agregarUsuario(
        data.get("nombre"),
        data.get("direccion"),
        data.get("fono"),
        data.get("password"),
        data.get("email")
      );
    } else alert("Contraseñas distintas");

    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    //   nombre: data.get("nombre"),}
    //   );
  };

  const agregarUsuario = async (nombre, direccion, fono, pass, email) => {
    let url = "http://localhost:5000/registro";

    try {
      const data = {
        nombre: nombre,
        direccion: direccion,
        fono: fono,
        password: pass,
        correo: email,
      };
      await axios.post(url, data);
    } catch (error) {
      //console.log(error.response.data.message);
      setMensajeError(error.response.data.message);
    } finally {
      //setLoadingCateg(false);
    }
  };
  React.useEffect(() => {
    verificarDatos();
    //console.log(habil);
  }, [nombre, direc, fono, correo, pass]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "75vh" }}>
        <CssBaseline />

        <Grid item component={Paper} elevation={0} square>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}            
            sx={{ mt: 1 }}
          >
            {/* <Avatar
              alt="Remy Sharp"
              children="VV"
               src="/static/images/avatar/1.jpg"
              sx={{ m: 1, bgcolor: "secondary.main" }}

            ></Avatar> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              name="nombre"
              autoFocus
              size="small"
              // error={error}
              onChange={(e) => setNombre(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="direccion"
              label="Direccion"
              name="direccion"
              autoFocus
              size="small"
              onChange={(e) => setDirec(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="fono"
              label="Teléfono"
              name="fono"
              autoFocus
              size="small"
              onChange={(e) => setFono(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              size="small"
              onChange={(e) => setCorreo(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
              onChange={(e) => setPass(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm"
              label="Confirmar contraseña"
              type="password"
              id="confirm"
              autoComplete="current-password"
              size="small"
              error={errorPass}
              onChange={(e) => setPassConf(e.target.value)}
            />
            {errorPass && (
              <div>
                <Mensajes mensaje={"Contraseñas distintas"}></Mensajes>
              </div>
            )}
            {mensajeError !== "" ? (
              <div>
                <Mensajes mensaje={mensajeError}></Mensajes>
              </div>
            ) : (
              <div></div>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              //disabled={habil}   
              onClick={handleClose}             
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Button  variant="contained" onClick={handleClose}>Registrarse</Button> */}

            <Copyright sx={{ mt: 2 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignInSide;
