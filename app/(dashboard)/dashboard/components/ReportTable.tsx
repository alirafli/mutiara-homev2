"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";

const ReportTable = () => {
  const { userId } = useAppSelector((state) => state.persistUserReducer);

  if (!userId) {
    redirect("/");
  }
  return <div>ReportTable</div>;
};

export default ReportTable;
