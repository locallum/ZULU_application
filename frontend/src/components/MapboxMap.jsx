import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapboxMap.css";

mapboxgl.accessToken = 'pk.eyJ1IjoibG9jYWxsdW0yOCIsImEiOiJjbTk5cjFtcjAwYTRwMnBwdDY4Zmc4ZXJqIn0.7cv2ZQ4vLp4JhtwYUOs9Ow';

const MapboxMap = () => {
    const mapContainerRef = useRef(null);

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

        const el = document.createElement('div');
        el.className = 'marker';
        el.addEventListener('click', () => {
            el.classList.toggle('marker-selected');
        });

        const innerWest = new mapboxgl.Marker(el)
            .setLngLat([151.157, -33.883])
            .addTo(map);

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
