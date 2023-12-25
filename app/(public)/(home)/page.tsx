import React from "react";
import { Metadata } from "next";
import TopSection from "./components/TopSection";
import AboutUsSection from "./components/AboutUsSection";

export const metadata: Metadata = {
  title: "Home Page",
};

async function Dashboard() {
  return (
    <div className="pb-10">
      <TopSection />
      <AboutUsSection />
    </div>
  );
}

export default Dashboard;
