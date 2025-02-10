import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Index";
import { useNavigate } from "react-router-dom";

const MainMap: React.FC = () => {
  const events = useSelector((state: RootState) => state.Events.events);
  const navigate = useNavigate();

  const markers = events.map((event) => ({
    id: event.id,
    coordinates: [event.latitude, event.longitude] as [number, number],
    icon: event.markerIcon ? `/icons/${event.markerIcon}.png` : null,
  }));

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <YMaps
        query={{
          apikey: "34b7dcda-c8dc-4636-8fbc-7924193d0673",
          lang: "ru_RU",
          load: "package.full",
        }}>
        <Map
          state={{ center: [55.751244, 37.618423], zoom: 5 }}
          width="100%"
          height="400px">
          {markers.map((marker) => (
            <Placemark
              key={marker.id}
              geometry={marker.coordinates}
              options={{
                iconLayout: marker.icon ? "default#image" : undefined,
                iconImageHref: marker.icon || undefined,
                iconImageSize: marker.icon ? [30, 30] : undefined,
                iconImageOffset: marker.icon ? [-15, -15] : undefined,
              }}
              onClick={() => navigate(`/event/${marker.id}`)}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};

export default MainMap;
