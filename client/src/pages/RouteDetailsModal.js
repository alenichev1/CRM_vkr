import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { fetchOneRouteGroup, fetchRouteFetch } from "../http/ApplicationAPI";

const RouteDetailsModal = ({ show, handleClose, routeGroupId }) => {
  const [routeGroup, setRouteGroup] = useState(null);
  const [routeFetch, setRouteFetch] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (routeGroupId) {
          const groupData = await fetchOneRouteGroup(routeGroupId);
          setRouteGroup(groupData);

          const fetchRoutesData = await fetchRouteFetch(routeGroupId);
          setRouteFetch(fetchRoutesData);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных о маршруте:", error);
      }
    };

    fetchData();
  }, [routeGroupId]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Подробная информация о маршруте</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {routeGroup ? (
          <>
            <h4>Маршрут:</h4>
            <p>Название маршрута: {routeGroup.name}</p>
            <p>Дата создания: {routeGroup.createdAt}</p>
          </>
        ) : (
          <p>Маршрут не найден.</p>
        )}

        {routeFetch && routeFetch.length > 0 ? (
          <>
            <h4>Заявки в маршруте:</h4>
            {routeFetch.map((route) => (
              <div key={route.id}>
                <p>Route ID: {route.id}</p>
                <p>Application ID: {route.applicationId}</p>
                <p>Status ID: {route.statusId}</p>
                <p>Route Group ID: {route.routeGroupId}</p>
                {/* Добавьте другие необходимые поля */}
              </div>
            ))}
          </>
        ) : (
          <p>Заявки в маршруте не найдены.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RouteDetailsModal;
