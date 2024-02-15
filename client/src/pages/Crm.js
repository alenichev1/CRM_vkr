import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import TaskBar from "../components/TaskBar";
import StatusBar from "../components/StatusBar";
import KontragentBar from "../components/KontragentBar";
import ApplicationList from "../components/ApplicationList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import {
  fetchStatus,
  fetchTask,
  fetchApplication,
  fetchKontragent,
} from "../http/ApplicationAPI";

const Crm = observer(() => {
  const { application } = useContext(Context);

  useEffect(() => {
    fetchTask().then((data) => application.setTask(data));
    fetchStatus().then((data) => application.setStatus(data));
    fetchApplication().then((data) => application.setApplication(data));
    fetchKontragent().then((data) => application.setKontragent(data));
  });

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TaskBar />
        </Col>
        <Col md={9}>
          <StatusBar />
          <KontragentBar />
          <ApplicationList />
        </Col>
      </Row>
    </Container>
  );
});

export default Crm;
