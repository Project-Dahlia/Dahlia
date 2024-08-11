'use client';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'tailwindcss/tailwind.css';
import { LatLngTuple } from 'leaflet';
import { useCollapse } from '@/context/collapse-context';
import { cn } from '@/lib/utils';

function Map() {
  // init variables for map
  const attribute =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const [userPosition, setUserPosition] = useState<LatLngTuple | null>(null);
  const { isCollapsed } = useCollapse();

  console.log('checking is  ccollapsed', isCollapsed);

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
    // getPosition();
  }, []);
  return (
    <MapContainer
      data-testid="map"
      className={cn(
        'h-screen w-screen transition-all duration-300',
        isCollapsed ? 'ml-[87px]' : 'ml-[288px]'
      )}
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
