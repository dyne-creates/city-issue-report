import { Link } from "react-router-dom";
import CityImage from '../assets/cityImage.jpg'
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

interface ReportData {
  _id: string;
  reporterName: string;
  issueType: string;
  location: string;
  priority: string;
  description: string;
  status: string,
  createdAt: string;
}

export default function Home() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await fetch("https://city-issue-report-backend.onrender.com/report");
      const data = await res.json();
      setReports(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const resolvedCount = reports.filter(r => r.status === "Resolved").length;
  const pendingCount = reports.filter(r => r.status === "Pending").length;

  return (
    <>
      {/* HERO SECTION */}
      <section
        style={{
          backgroundImage: `url(${CityImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.65)",
          }}
        />

        <Container style={{ position: "relative", zIndex: 2 }}>
          <Row className="align-items-center">
            <Col lg={8}>
              <h1 className="display-3 fw-bold text-white">
                City Issue Reporting Platform
              </h1>

              <p className="lead text-light mt-4" style={{ maxWidth: "600px" }}>
                A modern platform that empowers citizens to report public issues
                such as infrastructure damage, waste management concerns, and
                safety hazards helping create a cleaner, safer, and smarter city.
              </p>

              <div className="d-flex gap-3 mt-4 flex-wrap">
                <Link to="/report-issue" style={{ textDecoration: "none" }}>
                  <Button
                    size="lg"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#000",
                      border: "none",
                      borderRadius: "10px",
                      padding: "12px 28px",
                      fontWeight: "600",
                    }}
                  >
                    Report Issue
                  </Button>
                </Link>

                <Link to="/report-lists" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outline-light"
                    size="lg"
                    style={{
                      borderRadius: "10px",
                      padding: "12px 28px",
                    }}
                  >
                    View Reports
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5" style={{ backgroundColor: "#0a0a0a" }}>
        <Container>
          <Row className="g-4">
            {[{
              label: "Total Reports",
              value: reports.length
            },
            {
              label: "Resolved Issues",
              value: resolvedCount
            },
            {
              label: "Pending Issues",
              value: pendingCount
            }].map((item, index) => (
              <Col md={4} key={index}>
                <Card
                  className="text-center border-0 h-100"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    borderRadius: "16px",
                  }}
                >
                  <Card.Body className="py-5">
                    <h2 className="fw-bold">
                      {loading ? "..." : item.value}
                    </h2>
                    <p className="mb-0 fw-light">{item.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5" style={{ backgroundColor: "#000" }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card
                className="border-0 shadow-lg"
                style={{
                  background: "#0a0a0a",
                  backdropFilter: "blur(12px)",
                  color: "white",
                  borderRadius: "16px",
                }}
              >
                <Card.Body className="p-5 text-center">
                  <h2 className="fw-bold mb-3">
                    About the Platform
                  </h2>

                  <p className="text-light" style={{ lineHeight: "1.8" }}>
                    The City Issue Reporting Platform is designed to bridge the gap
                    between citizens and local government services. It enables
                    residents to easily report public concerns such as road damage,
                    garbage accumulation, drainage problems, and street lighting issues.
                  </p>

                  <p className="text-light" style={{ lineHeight: "1.8" }}>
                    By centralizing reports into a single system, authorities can
                    respond more efficiently, prioritize urgent cases, and maintain
                    transparency in resolving community issues.
                  </p>

                  <p className="text-secondary small mt-3">
                    Building smarter communities through citizen participation.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}