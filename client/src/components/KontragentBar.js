import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

const KontragentBar = observer(() => {
  const { application } = useContext(Context);
  return (
    <Row className="d-flex">
      {application.kontragent.map((kontragent) => (
        <Card
          style={{ cursor: "pointer", backgroundColor: "grey", color: "white" }}
          key={kontragent.id}
          className="p-3"
          onClick={() => application.setSelectedKontragent(kontragent)}
          border={
            kontragent.id === application.selectedKontragent.id
              ? "danger"
              : "light"
          }
        >
          {kontragent.name}
        </Card>
      ))}
    </Row>
  );
});

export default KontragentBar;
