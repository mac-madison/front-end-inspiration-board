import React from "react";
import { Container, Navbar } from "react-bootstrap";

const NavBarCom = ({ showForm }) => {
  return (
    <Navbar sticky="top" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Navbar.Brand onClick={showForm}>Create Board</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBarCom;
