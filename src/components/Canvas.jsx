import Offcanvas from "react-bootstrap/Offcanvas";
import Registro from "./Registro";
import React from "react";
import SignInSide from "./SignInSide"

const Canvas = (props) => {
  const { show, handleClose } = props;
  return (
    
    <Offcanvas placement="end" show={show} onHide={handleClose} >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Registro</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="border">
      
      <SignInSide show={show} handleClose={handleClose}></SignInSide>
        {/* <Registro></Registro> */}
      </Offcanvas.Body>
    </Offcanvas>
  );
};



/*class Canvas2 extends React.Component{  
  render()
  {    
    return(
      <Offcanvas placement="end" show={this.props.show} onHide={this.props.handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Registro</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Registro></Registro>
      </Offcanvas.Body>
    </Offcanvas>
    )
  }
}*/
export default Canvas;