'use client';
import React, { useEffect } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
// import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// const position: [number, number] = [51.505, -0.09];

function Map() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('leaflet');
    }
  }, []);
  return (
    <MapContainer
      id="map"
      style={{
        height: '100vh',
        width: '100vw'
      }}
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
