import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchRouteGroupCreate } from "../http/ApplicationAPI";
import RouteDetailsModal from "./RouteDetailsModal";

const RouteList = () => {
  const [routeGroups, setRouteGroups] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedRouteGroup, setSelectedRouteGroup] = useState(null);

  useEffect(() => {
    fetchRouteGroupCreate().then((data) => setRouteGroups(data));
  }, []);

  const handleOpenModal = (routeGroup) => {
    setShow(true);
    setSelectedRouteGroup(routeGroup.id); // Предполагая, что у объекта routeGroup есть свойство id
  };
  
  

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Название маршрута</th>
          </tr>
        </thead>
        <tbody>
          {routeGroups.map((routeGroup) => (
            <tr
              key={routeGroup.id}
              onClick={() => handleOpenModal(routeGroup)}
            >
              <td>{routeGroup.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <RouteDetailsModal
  show={show}
  handleClose={handleCloseModal}
  routeGroupId={selectedRouteGroup ? selectedRouteGroup.toString() : null}
/>



    </>
  );
};

export default RouteList;
