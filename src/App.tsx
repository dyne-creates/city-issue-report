import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";
import ReportLists from "./pages/ReportLists";
import ReportDetails from "./pages/ReportDetails";
import Admin from "./pages/Admin";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/city-issue-report" element={<Home />} />
            <Route path="/city-issue-report/report-issue" element={<ReportIssue />} />
            <Route path="/city-issue-report/report-lists" element={<ReportLists />} />
            <Route path="/city-issue-report/report-details/:id" element={<ReportDetails />} />
            <Route path="/city-issue-report/admin" element={<Admin />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
  );
}