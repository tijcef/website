import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.heat";

export interface MapReport {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  severity: string | null;
  state: string | null;
  latitude: number;
  longitude: number;
  created_at: string;
  organization?: string | null;
  image_url?: string | null;
}

const CATEGORY_COLORS: Record<string, string> = {
  health: "#ef4444",
  environment: "#16a34a",
  environmental: "#16a34a",
  social: "#2563eb",
  humanitarian: "#2563eb",
  climate: "#0d9488",
  infrastructure: "#9333ea",
};

function colorFor(cat?: string | null) {
  if (!cat) return "#64748b";
  return CATEGORY_COLORS[cat.toLowerCase()] ?? "#64748b";
}

function pinIcon(color: string) {
  const html = `<div style="width:22px;height:22px;border-radius:50% 50% 50% 0;background:${color};transform:rotate(-45deg);border:2px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.3);"></div>`;
  return L.divIcon({ html, className: "tgis-pin", iconSize: [22, 22], iconAnchor: [11, 22], popupAnchor: [0, -22] });
}

interface Props {
  reports: MapReport[];
  showHeatmap?: boolean;
  showClusters?: boolean;
  className?: string;
}

export function TGISMap({ reports, showHeatmap = false, showClusters = true, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const heatRef = useRef<L.Layer | null>(null);

  // init map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [9.082, 8.6753], // Nigeria
      zoom: 6,
      zoomControl: true,
      preferCanvas: true,
    });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
    }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // markers + heat
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (layerRef.current) { map.removeLayer(layerRef.current); layerRef.current = null; }
    if (heatRef.current) { map.removeLayer(heatRef.current); heatRef.current = null; }

    const cluster = showClusters
      ? (L as any).markerClusterGroup({ showCoverageOnHover: false, maxClusterRadius: 50 })
      : L.layerGroup();

    reports.forEach(r => {
      const m = L.marker([r.latitude, r.longitude], { icon: pinIcon(colorFor(r.category)) });
      const safeImage = r.image_url && /^https?:\/\//i.test(r.image_url) ? escape(r.image_url) : "";
      const img = safeImage ? `<img src="${safeImage}" alt="" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-top:6px;" />` : "";
      m.bindPopup(`
        <div style="min-width:220px;font-family:Inter,sans-serif">
          <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${colorFor(r.category)}"></span>
            <span style="text-transform:uppercase;font-size:10px;letter-spacing:.08em;color:#64748b">${r.category ?? "report"}</span>
          </div>
          <div style="font-weight:600;font-size:14px;color:#0f172a">${escape(r.title)}</div>
          <div style="font-size:12px;color:#475569;margin-top:4px;line-height:1.4">${escape((r.description ?? "").slice(0, 140))}</div>
          ${img}
          <div style="margin-top:6px;font-size:11px;color:#64748b">
            ${r.organization ? escape(r.organization) + " · " : ""}${new Date(r.created_at).toLocaleDateString()}
          </div>
        </div>`);
      cluster.addLayer(m);
    });
    cluster.addTo(map);
    layerRef.current = cluster as any;

    if (showHeatmap && reports.length) {
      const points = reports.map(r => [r.latitude, r.longitude, severityWeight(r.severity)]) as any;
      const heat = (L as any).heatLayer(points, { radius: 28, blur: 22, maxZoom: 12 });
      heat.addTo(map);
      heatRef.current = heat;
    }

    if (reports.length) {
      const bounds = L.latLngBounds(reports.map(r => [r.latitude, r.longitude] as [number, number]));
      map.flyToBounds(bounds, { padding: [40, 40], duration: 0.8, maxZoom: 9 });
    }
  }, [reports, showHeatmap, showClusters]);

  return <div ref={containerRef} className={className ?? "h-full w-full rounded-2xl overflow-hidden"} />;
}

function severityWeight(s?: string | null) {
  switch ((s ?? "").toLowerCase()) {
    case "critical": return 1;
    case "high": return 0.8;
    case "medium": return 0.55;
    case "low": return 0.35;
    default: return 0.5;
  }
}
function escape(s: string) {
  return s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export const CATEGORY_COLOR_MAP = CATEGORY_COLORS;
