import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateApplication from "../components/modals/CreateApplication";
import CreateInfoApp from "../components/modals/CreateInfoApp";
import CreateStatus from "../components/modals/CreateStatus";
import DeleteApplication from "../components/modals/DeleteApplication";

const Admin = () => {
  const [ApplicationVisiable, setApplicationVisiable] = useState(false);
  const [InfoAppVisiable, setInfoAppVisiable] = useState(false);
  const [StatusVisiable, setStatusVisiable] = useState(false);
  const [productDelete, setProductDelete] = useState(false);

  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className="mt-3 p-2"
        onClick={() => setApplicationVisiable(true)}
      >
        Добавить заявку
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-3 p-2"
        onClick={() => setInfoAppVisiable(true)}
      >
        Добавить информацию о заявке
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-3 p-2"
        onClick={() => setStatusVisiable(true)}
      >
        Добавить статус
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-3 p-2"
        onClick={() => setProductDelete(true)}
      >
        Удалить заявку
      </Button>
      <CreateApplication
        show={ApplicationVisiable}
        onHide={() => setApplicationVisiable(false)}
      />
      <CreateInfoApp
        show={InfoAppVisiable}
        onHide={() => setInfoAppVisiable(false)}
      />
      <CreateStatus
        show={StatusVisiable}
        onHide={() => setStatusVisiable(false)}
      />
      <DeleteApplication
        show={productDelete}
        onHide={() => setProductDelete(false)}
      />{" "}
    </Container>
  );
};

export default Admin;
