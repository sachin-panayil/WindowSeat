import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { MapData } from '@windowseat/shared';

interface FlightPathMapProps {
  mapData: MapData;
  recommendedSide: 'left' | 'right';
}

const LANDMARK_EMOJI: Record<string, string> = {
  mountain: '🏔',
  canyon: '🏜',
  lake: '💧',
  river: '🌊',
  geological: '🪨',
  city: '🏙',
  coastal: '🏖',
  desert: '🌵',
  island: '🏝',
  forest: '🌲',
};

function createAirportMarker(color: string): HTMLElement {
  const el = document.createElement('div');
  el.style.cssText = `
    width: 20px; height: 20px; border-radius: 50%;
    background: ${color}; border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    cursor: pointer;
  `;
  return el;
}

function createLandmarkMarker(emoji: string, isRecommended: boolean): HTMLElement {
  const el = document.createElement('div');
  const borderColor = isRecommended ? 'rgba(245, 158, 11, 0.8)' : 'rgba(255, 255, 255, 0.3)';
  const bgColor = isRecommended ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.08)';
  el.style.cssText = `
    width: 32px; height: 32px; border-radius: 8px;
    background: ${bgColor}; border: 2px solid ${borderColor};
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    backdrop-filter: blur(4px);
  `;
  el.textContent = emoji;
  return el;
}

const FlightPathMap: React.FC<FlightPathMapProps> = ({ mapData, recommendedSide }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [
        (mapData.origin.longitude + mapData.destination.longitude) / 2,
        (mapData.origin.latitude + mapData.destination.latitude) / 2,
      ],
      zoom: 4,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

    map.on('load', () => {
      const pathCoords = mapData.path.map(p => [p.longitude, p.latitude] as [number, number]);

      map.addSource('flight-path', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: pathCoords },
        },
      });

      map.addLayer({
        id: 'flight-path-line',
        type: 'line',
        source: 'flight-path',
        paint: {
          'line-color': '#f59e0b',
          'line-width': 2.5,
          'line-dasharray': [4, 3],
          'line-opacity': 0.7,
        },
      });

      const originEl = createAirportMarker('#22c55e');
      new maplibregl.Marker({ element: originEl })
        .setLngLat([mapData.origin.longitude, mapData.origin.latitude])
        .setPopup(
          new maplibregl.Popup({ className: 'ws-popup', offset: 25 }).setHTML(
            `<div class="popup-title">${mapData.origin.name}</div><div class="popup-detail">Origin</div>`
          )
        )
        .addTo(map);

      const destEl = createAirportMarker('#ef4444');
      new maplibregl.Marker({ element: destEl })
        .setLngLat([mapData.destination.longitude, mapData.destination.latitude])
        .setPopup(
          new maplibregl.Popup({ className: 'ws-popup', offset: 25 }).setHTML(
            `<div class="popup-title">${mapData.destination.name}</div><div class="popup-detail">Destination</div>`
          )
        )
        .addTo(map);

      mapData.landmarks.forEach(lm => {
        const isRecommended = lm.side === recommendedSide;
        const el = createLandmarkMarker(
          LANDMARK_EMOJI[lm.type] || '📍',
          isRecommended
        );

        const cloudInfo = lm.cloudCover !== undefined ? `<br>Cloud cover: ${lm.cloudCover}%` : '';
        const timeInfo = lm.estimatedTime
          ? new Date(lm.estimatedTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
          : '';

        new maplibregl.Marker({ element: el })
          .setLngLat([lm.longitude, lm.latitude])
          .setPopup(
            new maplibregl.Popup({ className: 'ws-popup', offset: 25 }).setHTML(
              `<div class="popup-title">${lm.name}</div>` +
              `<div class="popup-detail">` +
              `${lm.type.charAt(0).toUpperCase() + lm.type.slice(1)} · ${lm.side} side` +
              `<br>${lm.distanceFromOrigin} mi from origin` +
              (timeInfo ? `<br>~${timeInfo}` : '') +
              cloudInfo +
              `</div>`
            )
          )
          .addTo(map);
      });

      const bounds = new maplibregl.LngLatBounds();
      bounds.extend([mapData.origin.longitude, mapData.origin.latitude]);
      bounds.extend([mapData.destination.longitude, mapData.destination.latitude]);
      mapData.landmarks.forEach(lm => bounds.extend([lm.longitude, lm.latitude]));

      map.fitBounds(bounds, { padding: { top: 80, bottom: 60, left: 60, right: 60 } });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mapData, recommendedSide]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default FlightPathMap;
