import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { House } from "@/types/house";
import thousandAndDecimalSeparator from "@/utils/NumberFormatter";
import Image from "next/image";
import React from "react";

interface HouseCardProps {
  house: House;
}

const HouseCard = ({ house }: HouseCardProps) => {
  return (
    <Card key={house.id} className="my-2 p-4">
      <CardTitle className="flex gap-4 items-center">
        {house.name}
        <Badge variant={house.rent_status ? "destructive" : "default"}>
          {house.rent_status ? "Ditempati" : "Kosong"}
        </Badge>
      </CardTitle>

      <CardContent className="flex gap-4 mt-5">
        <div className="relative h-32 w-40 rounded-md bg-cover">
          <Image
            src={`https://jhpvantiskndecjywdon.supabase.co/storage/v1/object/public/images/${house?.photos?.[0]}`}
            fill
            className="rounded-md bg-cover"
            alt="house image"
          />
        </div>

        <div className="relative">
          <h1>
            <b>alamat:</b> {house.address}
          </h1>

          <Badge className="mr-2" variant="outline">
            barang sebelumnya: {house.has_previous ? "ya" : "tidak"}
          </Badge>
          <Badge className="mr-2" variant="outline">
            kamar mandi: {house.bathroom}
          </Badge>
          <Badge className="mr-2" variant="outline">
            {" "}
            kamar: {house.room}
          </Badge>

          <div className="absolute bottom-0 right-0">
            <h1>
              <b>Harga per bulan:</b> Rp
              {thousandAndDecimalSeparator(house.price_per_month)}
            </h1>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HouseCard;
