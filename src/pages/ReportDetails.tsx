import { useState, useEffect } from "react";
import { Container, Card, Row, Col, Badge, Spinner, } from "react-bootstrap";
import { useParams } from "react-router-dom";

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

export default function ReportDetails() {
    const { id } = useParams();

    const [report, setReport] = useState<ReportData | null>(
        null
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReport();
    }, [id]);

    const fetchReport = async () => {
        try {
            const res = await fetch(
                `http://localhost:5000/report/${id}`
            );

            const data = await res.json();
            setReport(data);
        } catch (error) {
            alert("Failed to fetch report.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "No Date";

        const date = new Date(dateString);

        return date.toLocaleString("en-PH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

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
                <Row className="justify-content-center">
                    <Col lg={8}>
                        {loading ? (
                            <div className="text-center py-5">
                                <Spinner
                                    animation="border"
                                    variant="light"
                                />
                            </div>
                        ) : !report ? (
                            <Card
                                className="border-0 rounded-4 text-center p-5"
                                style={{
                                    background:
                                        "rgba(255,255,255,0.06)",
                                    backdropFilter: "blur(14px)",
                                }}
                            >
                                <h4 className="text-white">
                                    Report not found.
                                </h4>
                            </Card>
                        ) : (
                            <Card
                                className="border-0 shadow-lg rounded-4"
                                style={{
                                    background:
                                        "rgba(255,255,255,0.06)",
                                    backdropFilter: "blur(14px)",
                                    border:
                                        "1px solid rgba(255,255,255,0.12)",
                                }}
                            >
                                <Card.Body className="p-4 p-md-5 text-white">
                                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                                        <div>
                                            <h2 className="fw-bold mb-1">
                                                Report Details
                                            </h2>
                                        </div>

                                        <Badge
                                            bg={badgeColor(report.status)}
                                            className="px-3 py-2"
                                        >
                                            {report.status}
                                        </Badge>
                                    </div>

                                    <Row className="g-4">
                                        <Col md={6}>
                                            <Card
                                                className="h-100 border-0 rounded-4"
                                                style={{
                                                    background:
                                                        "rgba(255,255,255,0.05)",
                                                }}
                                            >
                                                <Card.Body>
                                                    <small className="text-secondary">
                                                        Reporter Name
                                                    </small>
                                                    <h5 className="mt-2 text-white">
                                                        {report.reporterName}
                                                    </h5>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col md={6}>
                                            <Card
                                                className="h-100 border-0 rounded-4"
                                                style={{
                                                    background:
                                                        "rgba(255,255,255,0.05)",
                                                }}
                                            >
                                                <Card.Body>
                                                    <small className="text-secondary">
                                                        Issue Type
                                                    </small>
                                                    <h5 className="mt-2 text-white">
                                                        {report.issueType}
                                                    </h5>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col md={6}>
                                            <Card
                                                className="h-100 border-0 rounded-4"
                                                style={{
                                                    background:
                                                        "rgba(255,255,255,0.05)",
                                                }}
                                            >
                                                <Card.Body>
                                                    <small className="text-secondary">
                                                        Location
                                                    </small>
                                                    <h5 className="mt-2 text-white">
                                                        {report.location}
                                                    </h5>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col md={6}>
                                            <Card
                                                className="h-100 border-0 rounded-4"
                                                style={{
                                                    background:
                                                        "rgba(255,255,255,0.05)",
                                                }}
                                            >
                                                <Card.Body>
                                                    <small className="text-secondary">
                                                        Priority
                                                    </small>
                                                    <h5 className="mt-2 text-white">
                                                        {report.priority}
                                                    </h5>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col md={12}>
                                            <Card
                                                className="border-0 rounded-4"
                                                style={{
                                                    background:
                                                        "rgba(255,255,255,0.05)",
                                                }}
                                            >
                                                <Card.Body>
                                                    <small className="text-secondary">
                                                        Description
                                                    </small>

                                                    <p className="mt-2 mb-0 fs-5 text-white">
                                                        {report.description}
                                                    </p>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col md={12}>
                                            <Card
                                                className="border-0 rounded-4"
                                                style={{
                                                    background:
                                                        "rgba(255,255,255,0.05)",
                                                }}
                                            >
                                                <Card.Body>
                                                    <small className="text-secondary">
                                                        Date Submitted
                                                    </small>

                                                    <h6 className="mt-2 mb-0 text-white">
                                                        {formatDate(
                                                            report.createdAt
                                                        )}
                                                    </h6>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
}