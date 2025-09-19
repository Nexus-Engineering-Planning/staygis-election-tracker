"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [wardsGeoJSON, setWardsGeoJSON] = useState(null);

  useEffect(() => {
    fetch("/data/wards.geojson")
      .then((res) => res.json())
      .then(setWardsGeoJSON)
      .catch(console.error);
    // if (mapRef.current) {
    //   mapRef.current.on("load", async () => {
    //     // leaflet.geoJSON(wardsGeoJSON).addTo(mapRef.current!);
    //   });
    // }
  }, []);

  // useEffect(() => {
  //   if (mapContainerRef.current) {
  //     try {
  //       mapRef.current = leaflet
  //         .map(mapContainerRef.current)
  //         .setView([9.082, 8.6753], 5.5);

  //       mapRef.current.on("load", async () => {
  //         const response = await fetch("/data/wards.geojson");
  //         const wardsGeoJSON = await response.json();

  //         leaflet.geoJSON(wardsGeoJSON).addTo(mapRef.current!);

  //         // mapRef.current?.addLayer({
  //         //   id: "wards-layer",
  //         //   type: "fill",
  //         //   source: "wards",
  //         //   layout: {},
  //         //   paint: {
  //         //     "fill-color": "#088",
  //         //     "fill-opacity": 0.4,
  //         //     "fill-outline-color": "#000000",
  //         //   },
  //         // });
  //       });
  //     } catch (err) {
  //       toast(err);
  //     }
  //   }

  //   return () => {
  //     if (mapRef.current) mapRef.current.remove();
  //   };
  // }, []);

  return (
    <MapContainer
      // ref={mapRef}
      center={[9.082, 8.6753]}
      zoom={6}
      className="h-full w-full flex-col rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {wardsGeoJSON && <GeoJSON data={wardsGeoJSON} />}
    </MapContainer>
  );
};

export default Map;
