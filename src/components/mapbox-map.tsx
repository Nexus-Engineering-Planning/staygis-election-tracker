"use client";

import { useEffect, useRef } from "react";
import mapboxgl, { Map as Map$1 } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { toast } from "sonner";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainerRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map$1>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      try {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/standard",
          center: [9.082, 8.6753],
          zoom: 5.5,
        });

        mapRef.current.on("load", async () => {
          const response = await fetch("/data/wards.geojson");
          const geojson = await response.json();

          mapRef.current?.addSource("wards", {
            type: "geojson",
            data: geojson,
          });

          mapRef.current?.addLayer({
            id: "wards-layer",
            type: "fill",
            source: "wards",
            layout: {},
            paint: {
              "fill-color": "#088",
              "fill-opacity": 0.4,
              "fill-outline-color": "#000000",
            },
          });
        });
      } catch (err) {
        toast.error(err as string);
      }
    }

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  return <div ref={mapContainerRef} className="h-full w-full flex-col rounded-xl" />;
};

export default Map;
