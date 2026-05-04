const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://dyne:dyne@cluster0.i3mwai0.mongodb.net/project?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(console.error);

// Schema + Model

const reportSchema = new mongoose.Schema(
  {
    reportID: String, 
    reporterName: String, 
    issueType: String, 
    location: String, 
    description: String, 
    status: {
      type: String,
      default: "Pending",
    },
    priority: String,
  },
  {
    timestamps: true
  });

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const Report = mongoose.model("report", reportSchema, "report");
const Admin = mongoose.model("adminAccount", adminSchema, "adminAccount");

// Routes

app.post("/report", async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.json({ message: "Report sent successfully", report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/report", async (req, res) => {
  try {
    const reports = await Report.find()

    res.json(reports);
  } catch (err) {
    res.status(500).json({
      error: "Failed to retrieve reports"
    });
  }
});

app.get("/report/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found.",
      });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch report.",
      error: error.message,
    });
  }
});

app.delete("/report/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Report.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Report deleted from database" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete report" });
  }
});

app.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });

    if (admin) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.put("/report/:id", async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    if (!updatedReport) {
      return res.json({
        success: false,
        message: "Report not found",
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      report: updatedReport,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
// Start server
app.listen(5000, () => console.log("Server running on port 5000"));