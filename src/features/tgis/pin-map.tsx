import { useEffect, useRef } from "react";
import L from "leaflet";

interface Props {
  lat: number | null;
  lng: number | null;
  onChange: (lat: number, lng: number) => void;
  className?: string;
}

export function PinMap({ lat, lng, onChange, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const center: [number, number] = [lat ?? 9.082, lng ?? 8.6753];
    const map = L.map(ref.current).setView(center, lat && lng ? 12 : 6);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OSM &copy; CARTO",
    }).addTo(map);
    const html = `<div style="width:22px;height:22px;border-radius:50% 50% 50% 0;background:#0d9488;transform:rotate(-45deg);border:2px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.3);"></div>`;
    const icon = L.divIcon({ html, className: "tgis-pin", iconSize: [22, 22], iconAnchor: [11, 22] });
    const marker = L.marker(center, { draggable: true, icon }).addTo(map);
    marker.on("dragend", () => {
      const { lat, lng } = marker.getLatLng();
      onChange(+lat.toFixed(6), +lng.toFixed(6));
    });
    map.on("click", (e: L.LeafletMouseEvent) => {
      marker.setLatLng(e.latlng);
      onChange(+e.latlng.lat.toFixed(6), +e.latlng.lng.toFixed(6));
    });
    mapRef.current = map;
    markerRef.current = marker;
    return () => { map.remove(); mapRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markerRef.current || lat == null || lng == null) return;
    markerRef.current.setLatLng([lat, lng]);
    mapRef.current.setView([lat, lng], Math.max(mapRef.current.getZoom(), 11), { animate: true });
  }, [lat, lng]);

  return <div ref={ref} className={className ?? "h-72 w-full rounded-xl overflow-hidden border border-border"} />;
}
