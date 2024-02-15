import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import AddressInput from "./AddressInput";
import { fetchApplication } from "../http/ApplicationAPI"; // Путь к вашему файлу ApplicationAPI.js

const parseCoordinates = (coordinatesString) => {
  // Предполагаем, что координаты разделены запятой
  const [latitude, longitude] = coordinatesString.split(",").map(Number);

  // Проверка на NaN может быть добавлена, чтобы обработать некорректные значения

  return [latitude, longitude];
};

const MapComponent = () => {
  const [applications, setApplications] = useState([]);
  const [currentCoordinates, setCurrentCoordinates] = useState(null);
  const [currentBalloonContent, setCurrentBalloonContent] = useState("");

  useEffect(() => {
    // Используйте функцию fetchApplication из ApplicationAPI.js для получения данных с сервера
    const fetchData = async () => {
      try {
        const data = await fetchApplication();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей для выполнения useEffect только после монтирования

  if (!Array.isArray(applications)) {
    console.error("Error: 'applications' is not an array");
    return null;
  }

  const applicationPlacemarks = applications.map((application) => ({
    id: application.id,
    coordinates: parseCoordinates(application.coordinates),
    balloonContent: `Application: ${application.name}`,
  }));

  const placemarks = [
    {
      id: 1,
      coordinates: [57.76792, 40.92688],
      balloonContent: "Address 1",
    },
    {
      id: 2,
      coordinates: [57.784687, 40.874387],
      balloonContent: "Address 2",
    },
  ];

  return (
    <div className="Maps" style={{ display: "flex" }}>
      <div style={{ flex: 1, marginRight: "20px" }}>
        <AddressInput
          setCoordinates={setCurrentCoordinates}
          setBalloonContent={setCurrentBalloonContent}
        />
      </div>
      <div style={{ flex: 0 }}>
        <YMaps
          query={{
            apikey: "f8534690-add3-40fe-b4c7-b071258ee1f8",
            suggest_apikey: "03e91725-0743-484e-931d-0278d623a482",
          }}
        >
          <Map
            defaultState={{
              center: [57.76792, 40.92688],
              zoom: 9,
            }}
            width={400}
            height={400}
          >
            {placemarks.map((placemark) => (
              <Placemark
                key={placemark.id}
                geometry={placemark.coordinates}
                properties={{ balloonContent: placemark.balloonContent }}
              />
            ))}
            {applicationPlacemarks.map((placemark) => (
              <Placemark
                key={placemark.id}
                geometry={placemark.coordinates}
                properties={{ balloonContent: placemark.balloonContent }}
              />
            ))}

            {currentCoordinates && (
              <Placemark
                geometry={currentCoordinates}
                properties={{ balloonContent: currentBalloonContent }}
              />
            )}
          </Map>
        </YMaps>
      </div>
    </div>
  );
};

export default MapComponent;
