'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'tailwindcss/tailwind.css';
import { LatLngTuple, Map as LeafletMap } from 'leaflet';
import { useCollapse } from '@/context/collapse-context';
import { cn } from '@/lib/utils';
import L from 'leaflet';

function Map() {
  const attribute =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const [userPosition, setUserPosition] = useState<LatLngTuple | null>(null);
  const { isCollapsed } = useCollapse();
  const mapRef = useRef<LeafletMap | null>(null);

  // Get user position
  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
        },
        () => {
          console.error('Could not get your position');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // Adjust map size when sidebar is collapsed or expanded
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [isCollapsed]);

  // Initialize map and get user position
  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    // Define a more specific type for the Leaflet Icon prototype
    interface LeafletIconPrototype extends L.Icon.Default {
      _getIconUrl?: (name: string) => string;
    }

    // Use the specific type in the assertion
    delete (L.Icon.Default.prototype as LeafletIconPrototype)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/marker-icon-2x.png',
      iconUrl: '/marker-icon.png',
      shadowUrl: '/marker-shadow.png'
    });
  }, []);

  return (
    <div
      className={cn(
        'h-[100vh] w-full transition-all duration-300',
        isCollapsed ? 'ml-[87px]' : 'ml-[288px]'
      )}
    >
      {typeof window !== 'undefined' && (
        <MapContainer
          ref={mapRef}
          data-testid="map"
          className="h-full w-full"
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer attribution={attribute} url={url} />
          {userPosition && (
            <Marker position={userPosition}>
              <Popup>
                Your current location.
                <br />
                Easily customizable.
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
}

export default Map;
