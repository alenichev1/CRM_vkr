import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import {
  fetchTask,
  fetchStatus,
  createApplication,
  fetchKontragent,
} from "../../http/ApplicationAPI";
import { observer } from "mobx-react-lite";

const CreateApplication = observer(({ show, onHide }) => {
  const { application } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [fio, setFio] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetchTask().then((data) => application.setTask(data));
    fetchStatus().then((data) => application.setStatus(data));
    fetchKontragent().then((data) => application.setKontragent(data));
    // eslint-disable-next-line
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addApplication = () => {
    createApplication({
      name: name,
      data: data,
      address: address,
      coordinates: coordinates,
      fio: fio,
      phone: phone,
      statusId: application.selectedStatus.id,
      taskId: application.selectedTask.id,
      kontragentId: application.selectedKontragent.id,
      info: JSON.stringify(info),
    }).then((data) => {
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить заявку
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {application.selectedTask.name || "Выберите задачу"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {application.task.map((task) => (
                <Dropdown.Item
                  onClick={() => application.setSelectedTask(task)}
                  key={task.id}
                >
                  {task.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {application.selectedStatus.name || "Выберите статус"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {application.status.map((status) => (
                <Dropdown.Item
                  onClick={() => application.setSelectedStatus(status)}
                  key={status.id}
                >
                  {status.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {application.selectedKontragent.name || "Выберите контрагента"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {application.kontragent.map((kontragent) => (
                <Dropdown.Item
                  onClick={() => application.setSelectedKontragent(kontragent)}
                  key={kontragent.id}
                >
                  {kontragent.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите № договора"
          />
          <Form.Control
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="mt-3"
            placeholder="Введите дату договора"
            type="date"
          />
          <Form.Control
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-3"
            placeholder="Введите адрес потребителя"
          />
          <Form.Control
            value={coordinates}
            onChange={(e) => setCoordinates(e.target.value)}
            className="mt-3"
            placeholder="Введите координаты"
          />
          <Form.Control
            value={fio}
            onChange={(e) => setFio(e.target.value)}
            className="mt-3"
            placeholder="Введите ФИО потребителя"
          />
          <Form.Control
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-3"
            placeholder="Введите № телефона"
          />
          <hr />
          <Button variant={"outline-dark"} onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant={"outline-danger"}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addApplication}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateApplication;
