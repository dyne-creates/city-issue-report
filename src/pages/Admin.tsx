import { useState, useEffect } from "react";
import { Container, Table, Form, Button, Card, Spinner, Badge, } from "react-bootstrap";

interface ReportData {
  _id: string;
  reporterName: string;
  issueType: string;
  location: string;
  priority: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function Admin() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      fetchReports();
    }
  }, [isLoggedIn]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchReports = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/report"
      );
      const data = await res.json();

      setReports(data);
    } catch (error) {
      alert("Failed to fetch reports.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await res.json();

      if (data.success) {
        setIsLoggedIn(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    id: string,
    status: string
  ) => {
    try {
      const res = await fetch(
        `http://localhost:5000/report/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        fetchReports();
      } else {
        alert("Update failed.");
      }
    } catch (error) {
      alert("Unable to update.");
    }
  };

  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this resolved report?"
      );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/report/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        fetchReports();
      }
    } catch (error) {
      alert("Delete failed.");
    }
  };

  const formatDate = (
    dateString?: string
  ) => {
    if (!dateString) return "No Date";

    return new Date(
      dateString
    ).toLocaleString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const badgeColor = (
    status: string
  ) => {
    if (status === "Resolved")
      return "success";
    return "warning";
  };

  if (!isLoggedIn) {
    return (
      <section
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#000,#111,#1b1b1b)",
        }}
        className="d-flex align-items-center"
      >
        <Container>
          <Card
            className="mx-auto border-0 rounded-4 shadow-lg"
            style={{
              maxWidth: "430px",
              background:
                "rgba(255,255,255,0.06)",
              backdropFilter:
                "blur(14px)",
            }}
          >
            <Card.Body className="p-5 text-white">
              <h3 className="fw-bold text-center mb-4">
                Are you the admin?
              </h3>

              <Form
                onSubmit={
                  handleLogin
                }
              >
                <Form.Group className="mb-4">
                  <Form.Label>
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    onChange={
                      handleChange
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={
                      handleChange
                    }
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="light"
                  className="w-100 fw-bold"
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </section>
    );
  }

  /* DASHBOARD */
  return (
    <section
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#000,#111,#1b1b1b)",
      }}
      className="py-5"
    >
      <Container>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h2 className="text-white fw-bold mb-1">
              Admin Dashboard
            </h2>
            <p className="text-light mb-0">
              Manage city issue
              reports
            </p>
          </div>

          <Button
            variant="outline-light"
            onClick={() =>
              setIsLoggedIn(false)
            }
          >
            Logout
          </Button>
        </div>

        <Card
          className="border-0 rounded-4 shadow-lg"
          style={{
            background:
              "rgba(255,255,255,0.06)",
            backdropFilter:
              "blur(14px)",
          }}
        >
          <Card.Body className="p-0">
            {loading ? (
              <div className="text-center py-5">
                <Spinner
                  animation="border"
                  variant="light"
                />
              </div>
            ) : (
              <div className="table-responsive">
                <Table className="text-white align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Issue</th>
                      <th>Location</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>
                        Update
                      </th>
                      <th>
                        Delete
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {reports.map(
                      (
                        report
                      ) => (
                        <tr
                          key={
                            report._id
                          }
                        >
                          <td>
                            {
                              report.reporterName
                            }
                          </td>

                          <td>
                            {
                              report.issueType
                            }
                          </td>

                          <td>
                            {
                              report.location
                            }
                          </td>

                          <td>
                            {
                              report.priority
                            }
                          </td>

                          <td>
                            <Badge
                              bg={badgeColor(
                                report.status
                              )}
                            >
                              {
                                report.status
                              }
                            </Badge>
                          </td>

                          <td>
                            {formatDate(
                              report.createdAt
                            )}
                          </td>

                          <td>
                            <Form.Select
                              size="sm"
                              value={
                                report.status
                              }
                              onChange={(
                                e
                              ) =>
                                handleStatusUpdate(
                                  report._id,
                                  e
                                    .target
                                    .value
                                )
                              }
                            >
                              <option>
                                Pending
                              </option>
                              <option>
                                Resolved
                              </option>
                            </Form.Select>
                          </td>

                          <td>
                            {report.status ===
                              "Resolved" && (
                                <Button
                                  size="sm"
                                  variant="danger"
                                  onClick={() =>
                                    handleDelete(
                                      report._id
                                    )
                                  }
                                >
                                  Delete
                                </Button>
                              )}
                          </td>
                        </tr>
                      )
                    )}

                    {reports.length ===
                      0 && (
                        <tr>
                          <td
                            colSpan={
                              8
                            }
                            className="text-center py-5 text-light"
                          >
                            No reports
                            found.
                          </td>
                        </tr>
                      )}
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