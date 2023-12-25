"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { House } from "@/types/house";
import HouseCard from "./HouseCard";

interface FindHomeSectionProps {
  home: House[];
}
const FindHomeSection = ({ home }: FindHomeSectionProps) => {
  const [page, setPage] = useState(1);

  const houseTotalPage = Math.ceil(home.length / 2);

  const handlePreviousPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page >= houseTotalPage) return;
    setPage(page + 1);
  };

  const handleClickPage = (now: number) => {
    setPage(now);
  };

  const renderPagination = () => {
    return Array.from({ length: houseTotalPage }, (_, index) => (
      <div
        key={index}
        onClick={() => handleClickPage(index + 1)}
        className="cursor-pointer"
      >
        <PaginationLink isActive={index + 1 === page}>
          {index + 1}
        </PaginationLink>
      </div>
    ));
  };

  return (
    <div className="mt-24 md:mt-44 max-w-screen-xl flex flex-col items-center justify-between px-4 mx-auto">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mx-auto mb-5">
        Cari Rumah Sewa
      </h2>

      <div className="flex w-full gap-6">
        <Card className="w-full pb-8">
          <CardHeader>
            <CardTitle>Informasi Rumah Sewa {page}</CardTitle>
          </CardHeader>
          <CardContent>
            {home.slice((page - 1) * 2, page * 2).map((e) => (
              <HouseCard key={e.id} house={e} />
            ))}
          </CardContent>

          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={handlePreviousPage}
              />
              {renderPagination()}

              <PaginationNext
                className="cursor-pointer"
                onClick={handleNextPage}
              />
            </PaginationContent>
          </Pagination>
        </Card>

        <Card className="w-full"></Card>
      </div>
    </div>
  );
};

export default FindHomeSection;
