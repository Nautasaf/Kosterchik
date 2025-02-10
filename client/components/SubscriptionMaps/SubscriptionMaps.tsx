import React, { useEffect, useRef, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

interface SubscriptionMapProps {
  eventCoordinates: [number, number];
  onClose: () => void;
}

const SubscriptionMap: React.FC<SubscriptionMapProps> = ({
  eventCoordinates,
  onClose,
}) => {
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [ymapsApi, setYmapsApi] = useState<any>(null);
  const mapRef = useRef<any>(null);
  const [route, setRoute] = useState<any>(null);

  // Получаем геолокацию пользователя
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          console.log("User coordinates obtained:", coords);
          setUserCoords(coords);
        },
        (error) => {
          console.error("Ошибка получения геолокации:", error);
        }
      );
    } else {
      console.error("Геолокация не поддерживается браузером");
    }
  }, []);

  // Создаём маршрут, когда доступны все необходимые данные
  useEffect(() => {
    if (ymapsApi && mapRef.current && userCoords && eventCoordinates) {
      if (route) {
        mapRef.current.geoObjects.remove(route);
      }
      const newRoute = new ymapsApi.multiRouter.MultiRoute(
        {
          referencePoints: [userCoords, eventCoordinates],
          params: { results: 1 },
        },
        { boundsAutoApply: true }
      );
      mapRef.current.geoObjects.add(newRoute);
      setRoute(newRoute);
    }
  }, [ymapsApi, userCoords, eventCoordinates, route]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}>
      <div
        style={{
          position: "relative",
          width: "80%",
          margin: "50px auto",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
        }}>
        <button onClick={onClose} style={{ marginBottom: "10px" }}>
          Закрыть
        </button>
        <YMaps
          query={{
            apikey: "34b7dcda-c8dc-4636-8fbc-7924193d0673",
            lang: "ru_RU",
            load: "package.full,package.multiRouter",
          }}>
          <Map
            instanceRef={(instance) => {
              mapRef.current = instance;
            }}
            state={{ center: eventCoordinates, zoom: 10 }}
            width="100%"
            height="400px"
            onLoad={(ymaps) => {
              console.log("API загружен", ymaps);
              if (ymaps.multiRouter) {
                setYmapsApi(ymaps);
              } else {
                console.error("Модуль multiRouter не найден в API");
              }
            }}>
            <Placemark
              geometry={eventCoordinates}
              options={{ preset: "islands#redDotIcon" }}
            />
            {userCoords && (
              <Placemark
                geometry={userCoords}
                options={{ preset: "islands#blueDotIcon" }}
              />
            )}
          </Map>
        </YMaps>
      </div>
    </div>
  );
};

export default SubscriptionMap;
