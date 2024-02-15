import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Context } from "../index";
import { fetchRouteFetch } from "../http/ApplicationAPI";
import { observer } from "mobx-react-lite";

const RouteGroup = observer(() => {
  const { id } = useParams();
  const { route } = useContext(Context);

  useEffect(() => {
    fetchRouteFetch({ routeGroupId: id }).then((data) => {
      route.setRoutes(data);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Название заявки</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        {route.routes.map((route) => (
          <tr key={route.id}>
            <td>{route.id}</td>
            <td>{route.name}</td>
            <td>{route.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});

export default RouteGroup;
