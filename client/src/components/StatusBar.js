import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

const StatusBar = observer(() => {
  const { application } = useContext(Context);
  return (
    <Row className="d-flex">
      {application.status.map((status) => (
        <Card
          style={{ cursor: "pointer", backgroundColor: "grey", color: "white" }}
          key={status.id}
          className="p-3"
          onClick={() => application.setSelectedStatus(status)}
          border={
            status.id === application.selectedStatus.id ? "danger" : "light"
          }
        >
          {status.name}
        </Card>
      ))}
    </Row>
  );
});

export default StatusBar;
