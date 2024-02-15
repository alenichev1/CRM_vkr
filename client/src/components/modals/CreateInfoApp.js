import React, { useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createDogovorInfo } from "../../http/ApplicationAPI"; // Импортируем функцию

const CreateInfoApp = ({ show, onHide }) => {
  const nameRef = useRef();
  const fioRef = useRef(); // Создаем ссылки для каждого поля формы
  const phoneRef = useRef();
  const addressRef = useRef();
  const coordinatesRef = useRef();

  const addDogovorInfo = async () => {
    // Создаем обработчик событий для кнопки "Добавить"
    const newDogovorInfo = {
      name: nameRef.current.value,
      fio: fioRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      coordinates: coordinatesRef.current.value,
    };
    const data = await createDogovorInfo(newDogovorInfo);
    console.log(data); // Выводим ответ сервера в консоль
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      {/* ... */}
      <Modal.Body>
        <Form>
          {/* ... */}
          <Form.Control
            ref={nameRef}
            className="mt-2"
            placeholder={"Введите № договора"}
          />
          <Form.Control
            ref={fioRef}
            className="mt-2"
            placeholder={"Введите ФИО потребителя"}
          />
          <Form.Control
            ref={phoneRef}
            className="mt-2"
            placeholder={"Введите телефон потребителя"}
          />
          <Form.Control
            ref={addressRef}
            className="mt-2"
            placeholder={"Введите адрес потребителя"}
          />
          <Form.Control
            ref={coordinatesRef}
            className="mt-2"
            placeholder={"Введите координаты заявки"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDogovorInfo}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateInfoApp;
