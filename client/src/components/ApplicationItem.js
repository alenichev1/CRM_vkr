import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";
import { APPLICATION_ROUTE } from "../utils/consts";

const ApplicationItem = ({ application }) => {
  const navigate = useNavigate();

  return (
    <Col
      md={3}
      onClick={() => navigate(APPLICATION_ROUTE + "/" + application.id)}
    >
      <Card
        style={{
          width: 200,
          height: 150,
          cursor: "pointer",
          backgroundImage: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          color: "black",
        }}
        border={"grey"}
        className="mt-3 d-flex"
      >
        <div>№{application.name}</div>
        <div>Дата:{application.data}</div>
        <div>Адрес:{application.address}</div>
        <div>Координаты:{application.coordinates}</div>
        <div>ФИО:{application.fio}</div>
      </Card>
    </Col>
  );
};

export default ApplicationItem;
