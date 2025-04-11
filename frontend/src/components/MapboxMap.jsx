import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapboxMap.css";

mapboxgl.accessToken = 'pk.eyJ1IjoibG9jYWxsdW0yOCIsImEiOiJjbTk5cjFtcjAwYTRwMnBwdDY4Zmc4ZXJqIn0.7cv2ZQ4vLp4JhtwYUOs9Ow';

const lgaInfo = {
    "Albury": { name: "Albury", lat: -36.0737, lng: 146.9135 },
    "Armidale": { name: "Armidale", lat: -30.5100, lng: 151.6710 },
    "Ballina": { name: "Ballina", lat: -28.8386, lng: 153.5616 },
    "Balranald": { name: "Balranald", lat: -34.6360, lng: 143.5620 },
    "Bathurst": { name: "Bathurst", lat: -33.4190, lng: 149.5775 },
    "Bayside (NSW)": { name: "Bayside (NSW)", lat: -33.9461, lng: 151.1510 },
    "Bega Valley": { name: "Bega Valley", lat: -36.6765, lng: 149.8400 },
    "Bellingen": { name: "Bellingen", lat: -30.4520, lng: 152.8980 },
    "Berrigan": { name: "Berrigan", lat: -35.6530, lng: 145.8120 },
    "Blacktown": { name: "Blacktown", lat: -33.7667, lng: 150.9167 },
    "Bland": { name: "Bland", lat: -33.8840, lng: 147.2070 },
    "Blayney": { name: "Blayney", lat: -33.5300, lng: 149.2500 },
    "Blue Mountains": { name: "Blue Mountains", lat: -33.7120, lng: 150.3110 },
    "Bogan": { name: "Bogan", lat: -31.5667, lng: 146.7167 },
    "Bourke": { name: "Bourke", lat: -30.0900, lng: 145.9400 },
    "Brewarrina": { name: "Brewarrina", lat: -29.9500, lng: 146.8600 },
    "Broken Hill": { name: "Broken Hill", lat: -31.9500, lng: 141.4500 },
    "Burwood": { name: "Burwood", lat: -33.8770, lng: 151.1040 },
    "Byron": { name: "Byron", lat: -28.6434, lng: 153.6120 },
    "Cabonne": { name: "Cabonne", lat: -33.3500, lng: 148.8000 },
    "Camden": { name: "Camden", lat: -34.0500, lng: 150.7000 },
    "Campbelltown (NSW)": { name: "Campbelltown (NSW)", lat: -34.0700, lng: 150.8200 },
    "Canada Bay": { name: "Canada Bay", lat: -33.8500, lng: 151.1000 },
    "Canterbury-Bankstown": { name: "Canterbury-Bankstown", lat: -33.9200, lng: 151.0300 },
    "Carrathool": { name: "Carrathool", lat: -34.2500, lng: 145.5000 },
    "Central Coast (NSW)": { name: "Central Coast (NSW)", lat: -33.4200, lng: 151.3400 },
    "Central Darling": { name: "Central Darling", lat: -32.0000, lng: 143.0000 },
    "Cessnock": { name: "Cessnock", lat: -32.8300, lng: 151.3500 },
    "Clarence Valley": { name: "Clarence Valley", lat: -29.7000, lng: 152.9500 },
    "Cobar": { name: "Cobar", lat: -31.5000, lng: 145.8000 },
    "Coffs Harbour": { name: "Coffs Harbour", lat: -30.3000, lng: 153.1100 },
    "Coolamon": { name: "Coolamon", lat: -34.8000, lng: 147.2000 },
    "Coonamble": { name: "Coonamble", lat: -30.9500, lng: 148.4000 },
    "Cootamundra-Gundagai": { name: "Cootamundra-Gundagai", lat: -34.6500, lng: 148.0000 },
    "Cowra": { name: "Cowra", lat: -33.8300, lng: 148.7000 },
    "Cumberland": { name: "Cumberland", lat: -33.8500, lng: 150.9800 },
    "Dubbo Regional": { name: "Dubbo Regional", lat: -32.2500, lng: 148.6000 },
    "Dungog": { name: "Dungog", lat: -32.4000, lng: 151.7500 },
    "Edward River": { name: "Edward River", lat: -35.5000, lng: 144.9500 },
    "Eurobodalla": { name: "Eurobodalla", lat: -35.9000, lng: 150.1000 },
    "Fairfield": { name: "Fairfield", lat: -33.8700, lng: 150.9500 },
    "Federation": { name: "Federation", lat: -35.9000, lng: 146.5000 },
    "Forbes": { name: "Forbes", lat: -33.3800, lng: 148.0000 },
    "Georges River": { name: "Georges River", lat: -33.9700, lng: 151.0800 },
    "Gilgandra": { name: "Gilgandra", lat: -31.7000, lng: 148.6500 },
    "Glen Innes Severn": { name: "Glen Innes Severn", lat: -29.7300, lng: 151.7400 },
    "Goulburn Mulwaree": { name: "Goulburn Mulwaree", lat: -34.7500, lng: 149.7200 },
    "Greater Hume Shire": { name: "Greater Hume Shire", lat: -35.9000, lng: 147.0000 },
    "Griffith": { name: "Griffith", lat: -34.2900, lng: 146.0500 },
    "Gunnedah": { name: "Gunnedah", lat: -30.9833, lng: 150.2500 },
    "Gwydir": { name: "Gwydir", lat: -29.7000, lng: 150.5500 },
    "Hawkesbury": { name: "Hawkesbury", lat: -33.5600, lng: 150.8300 },
    "Hay": { name: "Hay", lat: -34.5000, lng: 144.8500 },
    "Hilltops": { name: "Hilltops", lat: -34.4500, lng: 148.3500 },
    "Hornsby": { name: "Hornsby", lat: -33.7020, lng: 151.1000 },
    "Hunters Hill": { name: "Hunters Hill", lat: -33.8320, lng: 151.1450 },
    "Inner West": { name: "Inner West", lat: -33.8940, lng: 151.1530 },
    "Inverell": { name: "Inverell", lat: -29.7700, lng: 151.1100 },
    "Junee": { name: "Junee", lat: -34.8700, lng: 147.5800 },
    "Kempsey": { name: "Kempsey", lat: -31.0800, lng: 152.8400 },
    "Kiama": { name: "Kiama", lat: -34.6720, lng: 150.8540 },
    "Ku-ring-gai": { name: "Ku-ring-gai", lat: -33.7360, lng: 151.1500 },
    "Kyogle": { name: "Kyogle", lat: -28.6200, lng: 153.0000 },
    "Lachlan": { name: "Lachlan", lat: -33.3330, lng: 146.4160 },
    "Lake Macquarie": { name: "Lake Macquarie", lat: -33.0800, lng: 151.5900 },
    "Lane Cove": { name: "Lane Cove", lat: -33.8150, lng: 151.1680 },
    "Leeton": { name: "Leeton", lat: -34.5500, lng: 146.4000 },
    "Lismore": { name: "Lismore", lat: -28.8100, lng: 153.2800 },
    "Lithgow": { name: "Lithgow", lat: -33.4800, lng: 150.1600 },
    "Liverpool": { name: "Liverpool", lat: -33.9200, lng: 150.9200 },
    "Liverpool Plains": { name: "Liverpool Plains", lat: -31.4800, lng: 150.6200 },
    "Lockhart": { name: "Lockhart", lat: -35.2170, lng: 146.7160 },
    "Lord Howe Island": { name: "Lord Howe Island", lat: -31.5560, lng: 159.0780 },
    "Maitland": { name: "Maitland", lat: -32.7300, lng: 151.5500 },
    "Mid-Coast": { name: "Mid-Coast", lat: -32.0200, lng: 152.3000 },
    "Mid-Western Regional": { name: "Mid-Western Regional", lat: -32.5900, lng: 149.5900 },
    "Moree Plains": { name: "Moree Plains", lat: -29.4600, lng: 149.8400 },
    "Mosman": { name: "Mosman", lat: -33.8250, lng: 151.2440 },
    "Murray River": { name: "Murray River", lat: -35.6200, lng: 144.0800 },
    "Murrumbidgee": { name: "Murrumbidgee", lat: -34.8500, lng: 145.6500 },
    "Muswellbrook": { name: "Muswellbrook", lat: -32.2600, lng: 150.8900 },
    "Nambucca Valley": { name: "Nambucca Valley", lat: -30.6300, lng: 152.7300 },
    "Narrabri": { name: "Narrabri", lat: -30.3300, lng: 149.7800 },
    "Narrandera": { name: "Narrandera", lat: -34.7500, lng: 146.5500 },
    "Narromine": { name: "Narromine", lat: -32.2300, lng: 148.2400 },
    "Newcastle": { name: "Newcastle", lat: -32.9300, lng: 151.7800 },
    "North Sydney": { name: "North Sydney", lat: -33.8400, lng: 151.2100 },
    "Northern Beaches": { name: "Northern Beaches", lat: -33.7400, lng: 151.2600 },
    "Oberon": { name: "Oberon", lat: -33.7100, lng: 149.8600 },
    "Orange": { name: "Orange", lat: -33.2900, lng: 149.1000 },
    "Parkes": { name: "Parkes", lat: -33.1400, lng: 148.1700 },
    "Parramatta": { name: "Parramatta", lat: -33.8170, lng: 151.0030 },
    "Penrith": { name: "Penrith", lat: -33.7500, lng: 150.6900 },
    "Port Macquarie-Hastings": { name: "Port Macquarie-Hastings", lat: -31.4300, lng: 152.9100 },
    "Port Stephens": { name: "Port Stephens", lat: -32.7200, lng: 152.1000 },
    "Queanbeyan–Palerang": { name: "Queanbeyan–Palerang", lat: -35.3500, lng: 149.2300 },
    "Randwick": { name: "Randwick", lat: -33.9170, lng: 151.2420 },
    "Richmond Valley": { name: "Richmond Valley", lat: -29.0000, lng: 153.0200 },
    "Ryde": { name: "Ryde", lat: -33.8167, lng: 151.1000 },
    "Shellharbour": { name: "Shellharbour", lat: -34.5800, lng: 150.8700 },
    "Shoalhaven": { name: "Shoalhaven", lat: -34.8800, lng: 150.6000 },
    "Singleton": { name: "Singleton", lat: -32.5700, lng: 151.1800 },
    "Snowy Monaro Regional": { name: "Snowy Monaro Regional", lat: -36.2200, lng: 148.8800 },
    "Snowy Valleys": { name: "Snowy Valleys", lat: -35.3300, lng: 148.1400 },
    "Strathfield": { name: "Strathfield", lat: -33.8750, lng: 151.0800 },
    "Sutherland Shire": { name: "Sutherland Shire", lat: -34.0300, lng: 151.0600 },
    "Sydney": { name: "Sydney", lat: -33.8688, lng: 151.2093 },
    "Tamworth Regional": { name: "Tamworth Regional", lat: -31.0900, lng: 150.9300 },
    "Temora": { name: "Temora", lat: -34.4500, lng: 147.5300 },
    "Tenterfield": { name: "Tenterfield", lat: -29.0600, lng: 152.0200 },
    "The Hills Shire": { name: "The Hills Shire", lat: -33.7150, lng: 150.9500 },
    "Tweed": { name: "Tweed", lat: -28.3200, lng: 153.3400 },
    "Unincorporated Far West": { name: "Unincorporated Far West", lat: -31.9500, lng: 141.4500 },
    "Upper Hunter Shire": { name: "Upper Hunter Shire", lat: -32.0500, lng: 150.8200 },
    "Upper Lachlan Shire": { name: "Upper Lachlan Shire", lat: -34.5100, lng: 149.4700 },
    "Uralla": { name: "Uralla", lat: -30.6500, lng: 151.5000 },
    "Wagga Wagga": { name: "Wagga Wagga", lat: -35.1200, lng: 147.3700 },
    "Walcha": { name: "Walcha", lat: -30.9800, lng: 151.5900 },
    "Walgett": { name: "Walgett", lat: -30.0200, lng: 148.1200 },
    "Warren": { name: "Warren", lat: -31.7000, lng: 147.8500 },
    "Warrumbungle": { name: "Warrumbungle", lat: -31.5900, lng: 149.4400 },
    "Waverley": { name: "Waverley", lat: -33.9000, lng: 151.2500 },
    "Wentworth": { name: "Wentworth", lat: -34.1000, lng: 141.9200 },
    "Willoughby": { name: "Willoughby", lat: -33.7980, lng: 151.2000 },
    "Wingecarribee": { name: "Wingecarribee", lat: -34.4800, lng: 150.4200 },
    "Wollondilly": { name: "Wollondilly", lat: -34.0500, lng: 150.4500 },
    "Wollongong": { name: "Wollongong", lat: -34.4300, lng: 150.8900 },
    "Woollahra": { name: "Woollahra", lat: -33.8840, lng: 151.2500 },
    "Yass Valley": { name: "Yass Valley", lat: -34.8400, lng: 148.9100 }
}

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

function newMarker(name, lng, lat, map) {
    const el = document.createElement('div');
    el.className = 'marker';

    const popup = new mapboxgl.Popup({
        closeOnClick: false,
        closeButton: false
    })
        .setLngLat([lng, lat])
        .setHTML(`<h3>${name}</h3>`);

    el.addEventListener('mouseenter', () => {
        popup.addTo(map);
    });

    el.addEventListener('mouseleave', () => {
        popup.remove();
    });

    el.addEventListener('click', () => {
        el.classList.toggle('marker-selected');
    });

    new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .addTo(map);
}


export default MapboxMap;
