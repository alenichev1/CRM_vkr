import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { deleteApplication } from "../../http/ApplicationAPI";

const DeleteApplication = ({ show, onHide }) => {
  const [value, setValue] = useState("");

  const handleDelete = () => {
    deleteApplication(value).then(() => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить заявку?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите ID заявки"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="outline-success" onClick={handleDelete}>
          {" "}
          {/* обновить обработчик */}
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteApplication;
