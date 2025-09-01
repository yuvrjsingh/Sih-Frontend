import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Coordinates {
  lat: number;
  lon: number;
}

interface MapDisplayProps {
  coordinates: Coordinates;
  location: string;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ coordinates, location }) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 h-full">
      <h4 className="text-lg font-semibold text-emerald-400 mb-4">Location</h4>
      
      <div className="relative">
        <div className="h-64 rounded-lg overflow-hidden border border-gray-600">
          <MapContainer
            center={[coordinates.lat, coordinates.lon]}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
            className="rounded-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[coordinates.lat, coordinates.lon]}>
              <Popup>
                <div className="text-gray-800">
                  <strong>{location}</strong>
                  <br />
                  Lat: {coordinates.lat.toFixed(4)}
                  <br />
                  Lon: {coordinates.lon.toFixed(4)}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        
        {/* Location Info */}
        <div className="mt-4 text-center">
          <p className="text-white font-medium">{location}</p>
          <p className="text-gray-400 text-sm">
            {coordinates.lat.toFixed(4)}°, {coordinates.lon.toFixed(4)}°
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapDisplay;