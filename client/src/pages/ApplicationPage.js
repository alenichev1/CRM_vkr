import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import {
  fetchOneDogovorInfo,
  fetchOneApplication,
  fetchRouteGroup,
  fetchRoute,
} from "../http/ApplicationAPI";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import AddApplicationToRouteModal from "../components/addApplicationToRoute";

const parseCoordinates = (coordinatesString) => {
  // Предполагаем, что координаты разделены запятой
  const [latitude, longitude] = coordinatesString.split(",").map(Number);

  // Проверка на NaN может быть добавлена, чтобы обработать некорректные значения

  return [latitude, longitude];
};

const ApplicationPage = () => {
  const [dogovorInfoList, setDogovorInfoList] = useState(null);
  const [application, setApplication] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Загружаем данные о договоре
    fetchDatadogovor();

    // Загружаем данные о заявке (application) с использованием новой функции fetchOneApplication
    fetchDataApplication(); // Вызов функции для получения данных при загрузке компонента
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchDatadogovor = async () => {
    try {
      const data = await fetchOneDogovorInfo(id); // Передаем id в функцию fetchOneApplication
      setDogovorInfoList(data);
    } catch (error) {
      console.error("Ошибка при получении договора:", error);
    }
  };

  const fetchDataApplication = async () => {
    try {
      const data = await fetchOneApplication(id); // Передаем id в функцию fetchOneApplication
      setApplication(data);
    } catch (error) {
      console.error("Ошибка при получении заявки:", error);
    }
  };

  const [showAddApplicationToRouteModal, setShowAddApplicationToRouteModal] =
    useState(false);

  const addApplicationToRoute = async (routeGroup) => {
    if (application) {
      // Открываем модальное окно для ввода названия маршрута
      setShowAddApplicationToRouteModal(true);

      // Сохраняем маршрут в БД
      try {
        const data = await fetchRouteGroup(routeGroup);
        console.log("Маршрут успешно сохранен в БД:", data);

        // Сохраняем информацию о заявке в fetchRoute
        const route = {
          applicationId: application.id,
          statusId: 1, // Статус "Новая"
          routeGroupId: data.id,
        };

        const routeData = await fetchRoute(route);
        console.log(
          "Информация о заявке успешно сохранена в fetchRoute:",
          routeData
        );

        // Отображаем сообщение об успешном добавлении заявки в маршрут
        alert(`Заявка успешно добавлена в маршрут "${routeGroup.name}".`);
      } catch (error) {
        console.error("Ошибка при сохранении маршрута в БД:", error);
        alert("Не удалось добавить заявку в маршрут. Попробуйте еще раз.");
      }

      setShowAddApplicationToRouteModal(false);
    }
  };

  return (
    <Container>
      <Col md={5}>
        <Row>
          {dogovorInfoList && (
            <>
              <h2 className="mt-3">{dogovorInfoList.name}</h2>
              <div>ФИО потребителя: {dogovorInfoList.fio}</div>
              <div>телефон: {dogovorInfoList.phone}</div>
              <div>адрес потребителя: {dogovorInfoList.address}</div>
              <div>координаты заявки: {dogovorInfoList.coordinates}</div>
            </>
          )}

          {application && (
            <>
              <h2 className="mt-3">{application.name}</h2>
              <div>Дата: {application.data}</div>
              <div>Адрес: {application.address}</div>
              <div>Координаты: {application.coordinates}</div>
              <div>ФИО: {application.fio}</div>
            </>
          )}
        </Row>
        <Card className="mt-3">
          <Button
            variant="outline-dark"
            onClick={() => setShowAddApplicationToRouteModal(true)}
          >
            Добавить в маршрут
          </Button>
        </Card>
      </Col>
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
            {application && (
              <Placemark
                key={application.id}
                geometry={parseCoordinates(application.coordinates)}
                properties={{
                  balloonContent: `Application: ${application.name}`,
                }}
              />
            )}
          </Map>
        </YMaps>
      </div>
      <AddApplicationToRouteModal
        show={showAddApplicationToRouteModal}
        handleClose={() => setShowAddApplicationToRouteModal(false)}
        addApplicationToRoute={addApplicationToRoute}
      />
    </Container>
  );
};

export default ApplicationPage;
