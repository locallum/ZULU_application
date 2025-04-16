import React, { useRef, useEffect } from "react";
import lgaInfo from "../assets/LGAInfo";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibG9jYWxsdW0yOCIsImEiOiJjbTk5cjFtcjAwYTRwMnBwdDY4Zmc4ZXJqIn0.7cv2ZQ4vLp4JhtwYUOs9Ow";

// Styling for map location dots
const markerStyle = {
  cursor: "pointer",
  width: "16px",
  height: "10px",
  backgroundColor: "var(--background-primary)",
  borderRadius: "50%",
  transition: "background-color 0.3s",
};

const MapboxMap = ({ selected, addSelected, removeSelected }) => {
  const mapContainerRef = useRef(null);
  const selectedRef = useRef(selected);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]); 

  useEffect(() => {
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach((marker) => {
      const markerName = marker.id;
      if (selected.includes(markerName)) {
        marker.style.backgroundColor = "#1565c0";
      } else {
        marker.style.backgroundColor = "white";
      }
    })
  }, [selected]);

  function newMarker(name, lng, lat, map) {
    const el = document.createElement("div");
    el.id = name;
    Object.assign(el.style, markerStyle);

    const popup = new mapboxgl.Popup({
      closeOnClick: false,
      closeButton: false,
    })
      .setLngLat([lng, lat])
      .setHTML(`<h3>${name}</h3>`);

    el.addEventListener("mouseenter", () => {
      popup.addTo(map);
    });

    el.addEventListener("mouseleave", () => {
      popup.remove();
    });

    el.addEventListener("click", () => {
      el.selected = !el.selected;
      if (selectedRef.current.includes(name)) {
        removeSelected(name);
      } else {
        addSelected(name);
      }
    });

    new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [151.2093, -33.86],
      pitch: 60,
      zoom: 10,
    });

    map.scrollZoom.disable();
    map.boxZoom.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();

    for (const lga in lgaInfo) {
      const { name, lat, lng } = lgaInfo[lga];
      newMarker(name, lng, lat, map);
    }

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100vw",
        height: "90.2vh",
      }}
    />
  );
};

export default MapboxMap;
