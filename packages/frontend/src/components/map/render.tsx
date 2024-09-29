import React from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  ZoomControl
} from 'react-leaflet';
import { LatLngTuple, Map as LeafletMap } from 'leaflet';

interface MyMapComponentProps {
  mapRef: React.MutableRefObject<LeafletMap | null>;
  userPosition: LatLngTuple | null;
  attribute: string;
  url: string;
}

const Render: React.FC<MyMapComponentProps> = ({
  mapRef,
  userPosition,
  attribute,
  url
}) => {
  return (
    <MapContainer
      ref={mapRef}
      data-testid="map"
      className="h-full w-full"
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer attribution={attribute} url={url} />
      <ZoomControl position="bottomright" />
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
  );
};

export default Render;
