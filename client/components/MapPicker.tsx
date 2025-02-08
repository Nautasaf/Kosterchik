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
  const defaultCoords = initialCoordinates || {
    lat: 55.751244,
    lng: 37.618423,
  };
  const [markerCoords, setMarkerCoords] = useState<{
    lat: number;
    lng: number;
  }>(defaultCoords);

  const handleMapClick = (e: any) => {
    const coords = e.get("coords");
    const newCoords = { lat: coords[0], lng: coords[1] };
    setMarkerCoords(newCoords);
    onLocationSelect(newCoords);
  };

  const mapState = {
    center: [markerCoords.lat, markerCoords.lng],
    zoom: 10,
  };

  return (
    <YMaps>
      <Map
        state={mapState}
        width="100%"
        height="400px"
        onClick={handleMapClick}>
        <Placemark geometry={[markerCoords.lat, markerCoords.lng]} />
      </Map>
    </YMaps>
  );
};

export default MapPicker;
