'use client';
import React, { useEffect } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'tailwindcss/tailwind.css';
import { LatLngTuple } from 'leaflet';

function Map() {
  // init variables for map
  const attribute =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const markerPosition: LatLngTuple = [51.505, -0.09];

  //Check window
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet');
    }
  }, []);
  return (
    <MapContainer
      data-testid="map"
      className="h-screen w-screen"
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer attribution={attribute} url={url} />
      <Marker position={markerPosition}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
