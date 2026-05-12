import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#161616fb", }}
      variant="dark"
      className="shadow-sm py-3"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/city-issue-report"
          className="fw-bold fs-4"
        >
          CITY ISSUE REPORT
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link as={Link} className="fw-bold" to="/city-issue-report">Home</Nav.Link>
            <Nav.Link as={Link} className="fw-bold" to="/city-issue-report/report-issue">Report Issue</Nav.Link>
            <Nav.Link as={Link} className="fw-bold" to="/city-issue-report/report-lists">Reports</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}