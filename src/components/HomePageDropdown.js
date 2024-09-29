import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffcanvasExample() {
  return (
    <>
    {/* <div class="pos-f-t"> */}
  {/* <div class="collapse" id="navbarToggleExternalContent">
    <div class="bg-dark p-4">
      <h4 class="text-white">Collapsed content</h4>
      <span class="text-muted">Toggleable via the navbar brand.</span>
    </div>
  </div> */}
  {/* <nav class="navbar navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </nav>
</div> */}
    {[false].map((expand) => (
  <Navbar key={expand} expand={expand} className="navbar navbar-dark bg-dark">
    <Container fluid>
      {/* <Navbar.Brand href="#">User</Navbar.Brand> */}
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand-${expand}`}
        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
        placement="end"
        className="offcanvas-slide" // Apply the custom class here
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
            About Us
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="#action1">Our servies</Nav.Link>
            <Nav.Link href="#action2">Help</Nav.Link>
            <Nav.Link href="#action2">Contact us</Nav.Link>
            <Nav.Link href="#action2">Feedback</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>
))}

    </>
  );
}

export default OffcanvasExample;