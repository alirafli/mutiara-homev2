"use client";

import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import Leaflet from "leaflet";

import { House } from "@/types/house";

interface MapsPopUpProps {
  houseData: House[];
}
function Maps({ houseData }: MapsPopUpProps) {
  const fixPosition = (mark: string) => {
    return mark.split(",").map(Number) as LatLngExpression;
  };

  const markerIcon = Leaflet.divIcon({
    html: `<svg stroke="currentColor" fill="red" stroke-width="0" viewBox="0 0 384 512" height="28" width="28" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>`,
    iconSize: [28, 28],
    iconAnchor: [28 / 2, 28],
    className: "remove-bg",
  });

  const markerIconDisabled = Leaflet.divIcon({
    html: `<svg stroke="currentColor" fill="grey" stroke-width="0" viewBox="0 0 384 512" height="28" width="28" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>`,
    iconSize: [28, 28],
    iconAnchor: [28 / 2, 28],
    className: "remove-bg",
  });

  return (
    <div className="relative h-[350px] md:h-[100%] z-[1]">
      <MapContainer
        center={[-6.249530526835478, 106.69078923880977]}
        zoom={17}
        scrollWheelZoom
        className="h-[100%] w-[100%] -z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {houseData.map((e) => (
          <Marker
            key={e.id}
            position={fixPosition(e.map_link)}
            icon={e.rent_status ? markerIconDisabled : markerIcon}
          >
            <Popup>
              <div>
                <h1>
                  <b>{e.name}</b>
                </h1>
                <h2>{e.address}</h2>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Maps;
