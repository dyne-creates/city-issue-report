import { useEffect, useState } from "react";
import { Container, Table, Badge, Button, Spinner, Card, } from "react-bootstrap";
import { Link } from "react-router-dom";

interface ReportData {
  _id: string;
  reporterName: string;
  issueType: string;
  location: string;
  priority: string;
  status: string;
  createdAt: string;
}

export default function ReportList() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/report")
      .then((res) => res.json())
      .then((data) => setReports(data))
      .finally(() => setLoading(false));
  }, []);

  const badgeColor = (status: string) => {
    if (status === "Resolved") return "success";
    if (status === "Pending") return "warning";
    return "secondary";
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        background:
          "#0a0a0a",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <Container>
        <Card
          className="border-0 shadow-lg rounded-4"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Card.Body className="p-4 p-md-5">
            <h2 className="fw-bold text-white mb-2">
              Submitted Reports
            </h2>

            <p className="text-light mb-4">
              View all submitted city concerns.
            </p>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="light" />
              </div>
            ) : reports.length === 0 ? (
              <p className="text-light">
                No reports available.
              </p>
            ) : (
              <div className="table-responsive">
                <Table
                  hover
                  className="align-middle mb-0 text-white"
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom:
                          "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <th className="text-white bg-transparent">
                        Name
                      </th>
                      <th className="text-white bg-transparent">
                        Issue
                      </th>
                      <th className="text-white bg-transparent">
                        Location
                      </th>
                      <th className="text-white bg-transparent">
                        Priority
                      </th>
                      <th className="text-white bg-transparent">
                        Status
                      </th>
                      <th className="text-white bg-transparent">
                        Date
                      </th>
                      <th className="text-white bg-transparent">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {reports.map((report) => (
                      <tr
                        key={report._id}
                        style={{
                          borderBottom:
                            "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <td>{report.reporterName}</td>
                        <td>{report.issueType}</td>
                        <td>{report.location}</td>
                        <td>{report.priority}</td>
                        <td>
                          <Badge
                            bg={badgeColor(report.status)}
                          >
                            {report.status}
                          </Badge>
                        </td>
                        <td>
                          {new Date(
                            report.createdAt
                          ).toLocaleDateString()}
                        </td>
                        <td>
                          <Link to={`/report-details/${report._id}`}>
                            <Button size="sm" variant="light">
                              View
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}