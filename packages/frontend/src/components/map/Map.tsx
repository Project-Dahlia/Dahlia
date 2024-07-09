'use client';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'tailwindcss/tailwind.css';
import { LatLngTuple } from 'leaflet';

function Map() {
  // init variables for map
  const attribute =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const [userPosition, setUserPosition] = useState<LatLngTuple | null>(null);

  // Get user position
  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
        },
        () => {
          alert('Could not get your position');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
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
      {userPosition && (
        <Marker position={userPosition}>
          <Popup>
            Your current location. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Map;
