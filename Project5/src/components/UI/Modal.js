import React from "react";
import ReactDOM from "react-dom";

import classes from './Modal.module.css';

const Backdrop = (props) => {
  return (
    <div onClick={props.onClick} className={classes.backdrop}></div>
  )
}

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>
          {props.children}
        </ModalOverlay>, 
        portalElement
      )}
    </>
  )
}

export default Modal;