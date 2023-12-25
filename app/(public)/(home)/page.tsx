import React from "react";
import { Metadata } from "next";
import TopSection from "./components/TopSection";

export const metadata: Metadata = {
  title: "Home Page",
};

async function Dashboard() {
  return (
    <div>
      <TopSection />
    </div>
  );
}

export default Dashboard;
