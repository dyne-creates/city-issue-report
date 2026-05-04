import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Dropdown, Spinner, } from "react-bootstrap";

export default function ReportIssue() {
    const [loading, setLoading] = useState(false);
    const [isOthers, setIsOthers] = useState(false);

    const [reportData, setReportData] = useState({
        reporterName: "",
        issueType: "",
        location: "",
        priority: "",
        description: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setReportData({
            ...reportData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelect = (key: string | null) => {
        if (!key) return;

        if (key === "Others") {
            setIsOthers(true);
            setReportData({
                ...reportData,
                issueType: "",
            });
        } else {
            setIsOthers(false);
            setReportData({
                ...reportData,
                issueType: key,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !reportData.reporterName.trim() ||
            !reportData.issueType.trim() ||
            !reportData.location.trim() ||
            !reportData.priority.trim() ||
            !reportData.description.trim()
        ) {
            alert("Please complete all fields.");
            return;
        }
        try {
            setLoading(true);

            const res = await fetch("http://localhost:5000/report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reportData),
            });

            const data = await res.json();
            alert(data.message);

            setReportData({
                reporterName: "",
                issueType: "",
                location: "",
                priority: "",
                description: "",
            });

            setIsOthers(false);
        } catch (error) {
            alert("Unable to submit report.");
        } finally {
            setLoading(false);
        }
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
                    <Col lg={7}>
                        <Card
                            className="border-0 shadow-lg rounded-4"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                backdropFilter: "blur(14px)",
                                border: "1px solid rgba(255,255,255,0.12)",
                            }}
                        >
                            <Card.Body className="p-5 text-white">
                                <h2 className="fw-bold text-center mb-2">
                                    Report an Issue
                                </h2>

                                <p className="text-center text-light mb-4">
                                    Help improve the city by submitting a concern.
                                </p>

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold">
                                            Reporter Name
                                        </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="reporterName"
                                            value={reportData.reporterName}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold">
                                            Issue Type
                                        </Form.Label>

                                        <Dropdown onSelect={handleSelect}>
                                            <Dropdown.Toggle
                                                className="w-100 text-start"
                                                variant="dark"
                                            >
                                                {reportData.issueType ||
                                                    "Select Issue Type"}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="w-100">
                                                <Dropdown.Item eventKey="Road Damage / Pothole">
                                                    Road Damage / Pothole
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="Garbage Overflow">
                                                    Garbage Overflow
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="Flooding">
                                                    Flooding
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="Illegal Parking">
                                                    Illegal Parking
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="Noise Complaint">
                                                    Noise Complaint
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="Others">
                                                    Others
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        {isOthers && (
                                            <Form.Control
                                                className="mt-3"
                                                type="text"
                                                placeholder="Enter custom issue"
                                                name="issueType"
                                                value={reportData.issueType}
                                                onChange={handleChange}
                                            />
                                        )}
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold">
                                            Location
                                        </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="location"
                                            value={reportData.location}
                                            onChange={handleChange}
                                            placeholder="Enter location"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold d-block">
                                            Priority
                                        </Form.Label>

                                        {["Low", "Medium", "High"].map(
                                            (level) => (
                                                <Form.Check
                                                    inline
                                                    key={level}
                                                    type="radio"
                                                    name="priority"
                                                    label={level}
                                                    value={level}
                                                    checked={
                                                        reportData.priority === level
                                                    }
                                                    onChange={handleChange}
                                                />
                                            )
                                        )}
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold">
                                            Description
                                        </Form.Label>

                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            name="description"
                                            value={reportData.description}
                                            onChange={handleChange}
                                            placeholder="Describe the issue..."
                                        />
                                    </Form.Group>

                                    <Button
                                        type="submit"
                                        className="w-100 py-2 fw-semibold"
                                        variant="dark"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <Spinner size="sm" />
                                        ) : (
                                            "Submit Report"
                                        )}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}