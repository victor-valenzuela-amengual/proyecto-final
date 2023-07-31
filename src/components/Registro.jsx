import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Button, Row } from "react-bootstrap";
import axios from "axios";

const Registro = () => {
  const [habil, setHabil] = useState(true);

  let token= localStorage.getItem('token');
  const instance = axios.create({
    baseURL: "http://localhost:5000}",
    headers: { 'Authorization': 'Bearer ' + token }
});

  const agregarUsuario= async(nombre,direccion,fono,pass,email)=>{
    let url="http://localhost:5000/registro";
    try {   
        const data={ "nombre":nombre,     
        "direccion":direccion,
        "fono":fono,
        "password":pass,
        "correo":email};
        await instance
            .post(url, data)
            .then(response => {                
                console.log(response.data);
                return response.data;
            })
            .catch((error) => {
                //this.MensajeError = error.response.data;
            })
            .finally(function () { });

       
      } catch (error) {
        console.log(error.message)
      } finally {
        //setLoadingCateg(false);
      }
}
  return (
    <Formik
      initialValues={{
        nombre: "",
        direccion: "",
        fono: "",
        email: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};
        let ok = false;
        if (!values.nombre) {
          errors.nombre = "Required";
          ok = true;
        } else if (!values.direccion) {
          errors.direccion = "Required";
          ok = true;
        } else if (!values.email) {
          errors.email = "Required";
          ok = true;
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
          ok = true;
        } else if (!values.password) {
          errors.password = "Required";
          ok = true;
        }
        setHabil(ok);
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          //alert(JSON.stringify(values, null, 2));
          agregarUsuario(values.nombre,values.direccion,values.fono,values.password,values.email)
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Row>
            <Field
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="mb-2"
            />
            <ErrorMessage name="nombre" component="div" />

            <Field
              type="text"
              name="direccion"
              placeholder="Dirección"
              className="mb-3"
            />
            <ErrorMessage name="direc" component="div" />

            <Field
              type="text"
              name="fono"
              placeholder="Teléfono"
              className="mb-3"
            />
            <ErrorMessage name="fono" component="div" />
            <hr></hr>
            <Field
              type="email"
              name="email"
              placeholder="Correo"
              className="mb-2"
            />
            <ErrorMessage name="email" component="div" />

            <Field
              type="password"
              name="password"
              placeholder="Contraseña"
              className="mb-2"
            />
            <ErrorMessage name="password" component="div" />
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || habil}
            >
              Enviar
            </Button>
          </Row>
        </Form>
        /* <Form>
        <label htmlFor="lastName">Nombre</label>
          <Field type="input" name="inp" />
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>*/
      )}
    </Formik>
  );
};

export default Registro;
