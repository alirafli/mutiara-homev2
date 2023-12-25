import React from "react";
import { Metadata } from "next";
import ReportTable from "./components/ReportTable";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function Dashboard() {
  return (
    <div className="h-[calc(100vh-200px)]">
      <ReportTable />
    </div>
  );
}

export default Dashboard;
