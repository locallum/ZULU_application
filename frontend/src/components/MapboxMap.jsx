import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibG9jYWxsdW0yOCIsImEiOiJjbTk5cjFtcjAwYTRwMnBwdDY4Zmc4ZXJqIn0.7cv2ZQ4vLp4JhtwYUOs9Ow";

const lgaInfo = {
  Albury: { name: "Albury", lat: -36.0737, lng: 146.9135 },
  Armidale: { name: "Armidale", lat: -30.51, lng: 151.671 },
  Ballina: { name: "Ballina", lat: -28.8386, lng: 153.5616 },
  Balranald: { name: "Balranald", lat: -34.636, lng: 143.562 },
  Bathurst: { name: "Bathurst", lat: -33.419, lng: 149.5775 },
  "Bayside (NSW)": { name: "Bayside (NSW)", lat: -33.9461, lng: 151.151 },
  "Bega Valley": { name: "Bega Valley", lat: -36.6765, lng: 149.84 },
  Bellingen: { name: "Bellingen", lat: -30.452, lng: 152.898 },
  Berrigan: { name: "Berrigan", lat: -35.653, lng: 145.812 },
  Blacktown: { name: "Blacktown", lat: -33.7667, lng: 150.9167 },
  Bland: { name: "Bland", lat: -33.884, lng: 147.207 },
  Blayney: { name: "Blayney", lat: -33.53, lng: 149.25 },
  "Blue Mountains": { name: "Blue Mountains", lat: -33.712, lng: 150.311 },
  Bogan: { name: "Bogan", lat: -31.5667, lng: 146.7167 },
  Bourke: { name: "Bourke", lat: -30.09, lng: 145.94 },
  Brewarrina: { name: "Brewarrina", lat: -29.95, lng: 146.86 },
  "Broken Hill": { name: "Broken Hill", lat: -31.95, lng: 141.45 },
  Burwood: { name: "Burwood", lat: -33.877, lng: 151.104 },
  Byron: { name: "Byron", lat: -28.6434, lng: 153.612 },
  Cabonne: { name: "Cabonne", lat: -33.35, lng: 148.8 },
  Camden: { name: "Camden", lat: -34.05, lng: 150.7 },
  "Campbelltown (NSW)": {
    name: "Campbelltown (NSW)",
    lat: -34.07,
    lng: 150.82,
  },
  "Canada Bay": { name: "Canada Bay", lat: -33.85, lng: 151.1 },
  "Canterbury-Bankstown": {
    name: "Canterbury-Bankstown",
    lat: -33.92,
    lng: 151.03,
  },
  Carrathool: { name: "Carrathool", lat: -34.25, lng: 145.5 },
  "Central Coast (NSW)": {
    name: "Central Coast (NSW)",
    lat: -33.42,
    lng: 151.34,
  },
  "Central Darling": { name: "Central Darling", lat: -32.0, lng: 143.0 },
  Cessnock: { name: "Cessnock", lat: -32.83, lng: 151.35 },
  "Clarence Valley": { name: "Clarence Valley", lat: -29.7, lng: 152.95 },
  Cobar: { name: "Cobar", lat: -31.5, lng: 145.8 },
  "Coffs Harbour": { name: "Coffs Harbour", lat: -30.3, lng: 153.11 },
  Coolamon: { name: "Coolamon", lat: -34.8, lng: 147.2 },
  Coonamble: { name: "Coonamble", lat: -30.95, lng: 148.4 },
  "Cootamundra-Gundagai": {
    name: "Cootamundra-Gundagai",
    lat: -34.65,
    lng: 148.0,
  },
  Cowra: { name: "Cowra", lat: -33.83, lng: 148.7 },
  Cumberland: { name: "Cumberland", lat: -33.85, lng: 150.98 },
  "Dubbo Regional": { name: "Dubbo Regional", lat: -32.25, lng: 148.6 },
  Dungog: { name: "Dungog", lat: -32.4, lng: 151.75 },
  "Edward River": { name: "Edward River", lat: -35.5, lng: 144.95 },
  Eurobodalla: { name: "Eurobodalla", lat: -35.9, lng: 150.1 },
  Fairfield: { name: "Fairfield", lat: -33.87, lng: 150.95 },
  Federation: { name: "Federation", lat: -35.9, lng: 146.5 },
  Forbes: { name: "Forbes", lat: -33.38, lng: 148.0 },
  "Georges River": { name: "Georges River", lat: -33.97, lng: 151.08 },
  Gilgandra: { name: "Gilgandra", lat: -31.7, lng: 148.65 },
  "Glen Innes Severn": { name: "Glen Innes Severn", lat: -29.73, lng: 151.74 },
  "Goulburn Mulwaree": { name: "Goulburn Mulwaree", lat: -34.75, lng: 149.72 },
  "Greater Hume Shire": { name: "Greater Hume Shire", lat: -35.9, lng: 147.0 },
  Griffith: { name: "Griffith", lat: -34.29, lng: 146.05 },
  Gunnedah: { name: "Gunnedah", lat: -30.9833, lng: 150.25 },
  Gwydir: { name: "Gwydir", lat: -29.7, lng: 150.55 },
  Hawkesbury: { name: "Hawkesbury", lat: -33.56, lng: 150.83 },
  Hay: { name: "Hay", lat: -34.5, lng: 144.85 },
  Hilltops: { name: "Hilltops", lat: -34.45, lng: 148.35 },
  Hornsby: { name: "Hornsby", lat: -33.702, lng: 151.1 },
  "Hunters Hill": { name: "Hunters Hill", lat: -33.832, lng: 151.145 },
  "Inner West": { name: "Inner West", lat: -33.894, lng: 151.153 },
  Inverell: { name: "Inverell", lat: -29.77, lng: 151.11 },
  Junee: { name: "Junee", lat: -34.87, lng: 147.58 },
  Kempsey: { name: "Kempsey", lat: -31.08, lng: 152.84 },
  Kiama: { name: "Kiama", lat: -34.672, lng: 150.854 },
  "Ku-ring-gai": { name: "Ku-ring-gai", lat: -33.736, lng: 151.15 },
  Kyogle: { name: "Kyogle", lat: -28.62, lng: 153.0 },
  Lachlan: { name: "Lachlan", lat: -33.333, lng: 146.416 },
  "Lake Macquarie": { name: "Lake Macquarie", lat: -33.08, lng: 151.59 },
  "Lane Cove": { name: "Lane Cove", lat: -33.815, lng: 151.168 },
  Leeton: { name: "Leeton", lat: -34.55, lng: 146.4 },
  Lismore: { name: "Lismore", lat: -28.81, lng: 153.28 },
  Lithgow: { name: "Lithgow", lat: -33.48, lng: 150.16 },
  Liverpool: { name: "Liverpool", lat: -33.92, lng: 150.92 },
  "Liverpool Plains": { name: "Liverpool Plains", lat: -31.48, lng: 150.62 },
  Lockhart: { name: "Lockhart", lat: -35.217, lng: 146.716 },
  "Lord Howe Island": { name: "Lord Howe Island", lat: -31.556, lng: 159.078 },
  Maitland: { name: "Maitland", lat: -32.73, lng: 151.55 },
  "Mid-Coast": { name: "Mid-Coast", lat: -32.02, lng: 152.3 },
  "Mid-Western Regional": {
    name: "Mid-Western Regional",
    lat: -32.59,
    lng: 149.59,
  },
  "Moree Plains": { name: "Moree Plains", lat: -29.46, lng: 149.84 },
  Mosman: { name: "Mosman", lat: -33.825, lng: 151.244 },
  "Murray River": { name: "Murray River", lat: -35.62, lng: 144.08 },
  Murrumbidgee: { name: "Murrumbidgee", lat: -34.85, lng: 145.65 },
  Muswellbrook: { name: "Muswellbrook", lat: -32.26, lng: 150.89 },
  "Nambucca Valley": { name: "Nambucca Valley", lat: -30.63, lng: 152.73 },
  Narrabri: { name: "Narrabri", lat: -30.33, lng: 149.78 },
  Narrandera: { name: "Narrandera", lat: -34.75, lng: 146.55 },
  Narromine: { name: "Narromine", lat: -32.23, lng: 148.24 },
  Newcastle: { name: "Newcastle", lat: -32.93, lng: 151.78 },
  "North Sydney": { name: "North Sydney", lat: -33.84, lng: 151.21 },
  "Northern Beaches": { name: "Northern Beaches", lat: -33.74, lng: 151.26 },
  Oberon: { name: "Oberon", lat: -33.71, lng: 149.86 },
  Orange: { name: "Orange", lat: -33.29, lng: 149.1 },
  Parkes: { name: "Parkes", lat: -33.14, lng: 148.17 },
  Parramatta: { name: "Parramatta", lat: -33.817, lng: 151.003 },
  Penrith: { name: "Penrith", lat: -33.75, lng: 150.69 },
  "Port Macquarie-Hastings": {
    name: "Port Macquarie-Hastings",
    lat: -31.43,
    lng: 152.91,
  },
  "Port Stephens": { name: "Port Stephens", lat: -32.72, lng: 152.1 },
  "Queanbeyan–Palerang": {
    name: "Queanbeyan–Palerang",
    lat: -35.35,
    lng: 149.23,
  },
  Randwick: { name: "Randwick", lat: -33.917, lng: 151.242 },
  "Richmond Valley": { name: "Richmond Valley", lat: -29.0, lng: 153.02 },
  Ryde: { name: "Ryde", lat: -33.8167, lng: 151.1 },
  Shellharbour: { name: "Shellharbour", lat: -34.58, lng: 150.87 },
  Shoalhaven: { name: "Shoalhaven", lat: -34.88, lng: 150.6 },
  Singleton: { name: "Singleton", lat: -32.57, lng: 151.18 },
  "Snowy Monaro Regional": {
    name: "Snowy Monaro Regional",
    lat: -36.22,
    lng: 148.88,
  },
  "Snowy Valleys": { name: "Snowy Valleys", lat: -35.33, lng: 148.14 },
  Strathfield: { name: "Strathfield", lat: -33.875, lng: 151.08 },
  "Sutherland Shire": { name: "Sutherland Shire", lat: -34.03, lng: 151.06 },
  Sydney: { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  "Tamworth Regional": { name: "Tamworth Regional", lat: -31.09, lng: 150.93 },
  Temora: { name: "Temora", lat: -34.45, lng: 147.53 },
  Tenterfield: { name: "Tenterfield", lat: -29.06, lng: 152.02 },
  "The Hills Shire": { name: "The Hills Shire", lat: -33.715, lng: 150.95 },
  Tweed: { name: "Tweed", lat: -28.32, lng: 153.34 },
  "Unincorporated Far West": {
    name: "Unincorporated Far West",
    lat: -31.95,
    lng: 141.45,
  },
  "Upper Hunter Shire": {
    name: "Upper Hunter Shire",
    lat: -32.05,
    lng: 150.82,
  },
  "Upper Lachlan Shire": {
    name: "Upper Lachlan Shire",
    lat: -34.51,
    lng: 149.47,
  },
  Uralla: { name: "Uralla", lat: -30.65, lng: 151.5 },
  "Wagga Wagga": { name: "Wagga Wagga", lat: -35.12, lng: 147.37 },
  Walcha: { name: "Walcha", lat: -30.98, lng: 151.59 },
  Walgett: { name: "Walgett", lat: -30.02, lng: 148.12 },
  Warren: { name: "Warren", lat: -31.7, lng: 147.85 },
  Warrumbungle: { name: "Warrumbungle", lat: -31.59, lng: 149.44 },
  Waverley: { name: "Waverley", lat: -33.9, lng: 151.25 },
  Wentworth: { name: "Wentworth", lat: -34.1, lng: 141.92 },
  Willoughby: { name: "Willoughby", lat: -33.798, lng: 151.2 },
  Wingecarribee: { name: "Wingecarribee", lat: -34.48, lng: 150.42 },
  Wollondilly: { name: "Wollondilly", lat: -34.05, lng: 150.45 },
  Wollongong: { name: "Wollongong", lat: -34.43, lng: 150.89 },
  Woollahra: { name: "Woollahra", lat: -33.884, lng: 151.25 },
  "Yass Valley": { name: "Yass Valley", lat: -34.84, lng: 148.91 },
};

const markerStyle = {
  cursor: "pointer",
  width: "16px",
  height: "10px",
  backgroundColor: "white",
  borderRadius: "50%",
  transition: "background-color 0.3s",
};

const markerSelected = {
  backgroundColor: "#1565c0",
};

const MapboxMap = ({ selected, addSelected, removeSelected }) => {
  const mapContainerRef = useRef(null);

  function newMarker(name, lng, lat, map) {
    const el = document.createElement("div");
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
      if (el.selected) {
        addSelected(name);
      } else {
        removeSelected(name);
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
