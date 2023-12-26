import React from "react";
import { Metadata } from "next";
import ReportTable from "./components/ReportTable";
import { getReportData } from "./actions";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function Dashboard() {
  const { data } = await getReportData();

  if (!data)
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );

  return (
    <div className="h-[calc(100vh-200px)]">
      <ReportTable report={data} />
    </div>
  );
}

export default Dashboard;
