import React, { useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

interface MapPickerProps {
  onLocationSelect: (coords: { lat: number; lng: number }) => void;
  initialCoordinates?: { lat: number; lng: number };
}

const MapPicker: React.FC<MapPickerProps> = ({
  onLocationSelect,
  initialCoordinates,
}) => {
  const [markerCoords, setMarkerCoords] = useState<{
    lat: number;
    lng: number;
  }>(initialCoordinates || { lat: 55.751244, lng: 37.618423 });

  const handleMapClick = (e: any) => {
    const coords = e.get("coords");
    const newCoords = { lat: coords[0], lng: coords[1] };
    setMarkerCoords(newCoords);
    onLocationSelect(newCoords);
  };

  return (
    <YMaps
      query={{ apikey: "34b7dcda-c8dc-4636-8fbc-7924193d0673", lang: "ru_RU" }}>
      <Map
        state={{ center: [markerCoords.lat, markerCoords.lng], zoom: 10 }}
        width="100%"
        height="400px"
        onClick={handleMapClick}>
        <Placemark geometry={[markerCoords.lat, markerCoords.lng]} />
      </Map>
    </YMaps>
  );
};

export default MapPicker;
