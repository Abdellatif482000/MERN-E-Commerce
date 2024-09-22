import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect, useRef } from "react";
import navBarStyles from "../cssModules/homePage.module.css";
import { SigninForm } from "./userProfile/signinForm.jsx";
import { RegistrationForm } from "./userProfile/registrationForm.jsx";

export function NavBar() {
  // Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // **************
  const [signinComp, setSigninComp] = useState(false);
  const [resgistrComp, setResgistrComp] = useState(false);

  return (
    <nav className={navBarStyles.navBar}>
      <Link to={"/"}>
        <h1 className={navBarStyles.logo}>LOGO</h1>
      </Link>
      <input type="text" placeholder="Search" />

      <div className={navBarStyles.navBarBtns}>
        <button onClick={handleShow}>singin</button>
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            onClick={() => {
              setSigninComp(true);
              if (resgistrComp === true) {
                setResgistrComp(false);
                setSigninComp(true);
              }
            }}
          >
            Sign in
          </Button>
          <Button
            onClick={() => {
              setResgistrComp(true);

              if (signinComp === true) {
                setSigninComp(false);
                setResgistrComp(true);
              }
            }}
          >
            Sign up
          </Button>
          {signinComp ? <SigninForm /> : null}
          {resgistrComp ? <RegistrationForm /> : null}
        </Modal.Body>
      </Modal>
    </nav>
  );
}
