import { useEffect, useState, useRef } from 'react';
import L, { LatLngTuple, Map as LeafletMap } from 'leaflet';
import { useCollapse } from '@/context/collapse-context';
import { cn } from '@/lib/utils';
import 'leaflet/dist/leaflet.css';
import 'tailwindcss/tailwind.css';
import Render from './render';

function GetPosition() {
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

  // Set Leaflet icon assets
  useEffect(() => {
    interface LeafletIconPrototype extends L.Icon.Default {
      _getIconUrl?: (name: string) => string;
    }

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
        'pointer-events-auto absolute top-0 z-[-5] h-[100vh] w-[100vw] transition-all duration-300',
        isCollapsed ? 'left-[87px]' : 'left-[288px]'
      )}
    >
      {typeof window !== 'undefined' && (
        <Render
          mapRef={mapRef}
          userPosition={userPosition}
          attribute={attribute}
          url={url}
        />
      )}
    </div>
  );
}

export default GetPosition;
