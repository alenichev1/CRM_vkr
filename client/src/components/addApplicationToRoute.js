import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchRouteGroupCreate, fetchRoute } from "../http/ApplicationAPI";

const AddApplicationToRouteModal = ({
  show,
  handleClose,
  addApplicationToRoute,
}) => {
  const [routeName, setRouteName] = useState("");
  const [existingRoutes, setExistingRoutes] = useState([]);

  useEffect(() => {
    // Загружаем существующие маршруты
    const fetchExistingRoutes = async () => {
      const data = await fetchRouteGroupCreate();
      setExistingRoutes(data);
    };

    fetchExistingRoutes();
  }, []);

  async function handleSave() {
    // Получаем значение названия маршрута из пользовательского интерфейса
    const routeName = document.getElementById("routeName").value;
  
    // Если пользователь ввел название маршрута, сохраняем его в БД
    if (routeName) {
      const routeGroup = {
        name: routeName,
        applications: [],
      };
  
      addApplicationToRoute(routeGroup);
    } else {
      // Если пользователь не ввел название маршрута, проверяем, выбрал ли он существующий маршрут
      const selectedRoute = document.getElementById("routeWindows");
      const routeId = selectedRoute.value;
  
      // Если пользователь выбрал существующий маршрут, добавляем заявку в этот маршрут
      if (routeId !== "undefined" && routeId !== "") {
        const route = await fetchRoute(routeId);
        route.id = routeId;
        addApplicationToRoute(route);
      } else {
        // Если пользователь не выбрал существующий маршрут, не создаем новый маршрут
        alert("Выберите существующий маршрут или введите название нового маршрута.");
      }
    }
  
    handleClose();
  }
  




  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить заявку в маршрут</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="routeName" className="form-label">
              Название маршрута:
            </label>
            <input
              type="text"
              className="form-control"
              id="routeName"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="routeWindows" className="form-label">
              Окна маршрута:
            </label>
            <select className="form-select" id="routeWindows">
              {existingRoutes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddApplicationToRouteModal;
