import React, { useContext } from "react";
import { Context } from "..";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  CRM_ROUTE,
  LOGIN_ROUTE,
  MAP_ROUTE,
  RUN_ROUTE,
} from "../utils/consts";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  /*const LogOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };*/

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: "beige", fontWeight: "bold" }} to={CRM_ROUTE}>
          CRM УЧЕТА ЗАЯВОК
        </NavLink>

        {user.isAuth ? (
          <Nav className="ml-auto">
            <Button
              variant="outline-light"
              className="ml-3"
              onClick={() => navigate(RUN_ROUTE)}
            >
              Маршруты
            </Button>
            <Button
              variant="outline-light"
              className="ml-3"
              onClick={() => navigate(MAP_ROUTE)}
            >
              Карта
            </Button>
            <Button
              variant="outline-light"
              onClick={() => navigate(ADMIN_ROUTE)}
              className="ml-3"
            >
              Админ панель
            </Button>
            <Button
              variant="outline-light"
              onClick={() => navigate(LOGIN_ROUTE)}
              className="ml-3"
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button
              variant="outline-light"
              onClick={() => user.setIsAuth(true)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
