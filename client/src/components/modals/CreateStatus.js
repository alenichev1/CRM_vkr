import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { createStatus } from "../../http/ApplicationAPI";

const CreateStatus = ({ show, onHide }) => {
  const [value, setValue] = useState("");

  const addStatus = () => {
    createStatus({ name: value }).then((data) => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить статус
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите название статуса"}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addStatus}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateStatus;
