import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import Row from "react-bootstrap/esm/Row";
import ApplicationItem from "./ApplicationItem";

const ApplicationList = observer(() => {
  const { application } = useContext(Context);

  // Получаем выбранную задачу, статус и контрагента
  const selectedTaskId = application.selectedTask?.id;
  const selectedStatusId = application.selectedStatus?.id;
  const selectedKontragentId = application.selectedKontragent?.id;

  // Фильтруем заявки на основе выбранной задачи, статуса и контрагента
  const filteredApplications = application.application.filter(
    (app) =>
      (selectedTaskId ? app.taskId === selectedTaskId : true) &&
      (selectedStatusId ? app.statusId === selectedStatusId : true) &&
      (selectedKontragentId ? app.kontragentId === selectedKontragentId : true)
  );

  return (
    <Row className="d-flex">
      {filteredApplications.map((application) => (
        <ApplicationItem key={application.id} application={application} />
      ))}
    </Row>
  );
});

export default ApplicationList;
