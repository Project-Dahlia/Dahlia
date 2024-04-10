import React from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-Leaflet';

const position: [number, number] = [51.505, -0.09];

function MapComponent() {
  return (
    <MapContainer
      style={{
        height: '100vh',
        width: '100ww'
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

<<<<<<< HEAD
export default Map;
=======
export default MapComponent;
>>>>>>> 9271f94 (refactor(frontend): fixed naming conv)
