import React from "react";
import { Metadata } from "next";
import TopSection from "./components/TopSection";
import AboutUsSection from "./components/AboutUsSection";
import FindHomeSection from "./components/FindHomeSection";
import { getHouseData } from "./actions";

export const metadata: Metadata = {
  title: "Home Page",
};

async function Dashboard() {
  const { data } = await getHouseData();

  return (
    <div className="pb-10">
      <TopSection />
      <AboutUsSection />
      <FindHomeSection home={data ?? []} />
    </div>
  );
}

export default Dashboard;
