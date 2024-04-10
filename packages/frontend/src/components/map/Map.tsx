'use client';

// import L from 'leaflet';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
// import MarkerIcon from '../node-modules/leaflet/dist/images/marker-icon.png';
// import MarkerShadow from '../node-modules/leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

function Map() {
  // const position: [number, number] = [51.505, -0.09];
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

export default Map;
