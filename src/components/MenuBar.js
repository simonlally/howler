import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function MenuBar() {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu pointing secondary>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item
        name="register"
        active={activeItem === "register"}
        onClick={handleItemClick}
        as={Link}
        to="/register"
      />

      <Menu.Item
        name="friends"
        active={activeItem === "friends"}
        onClick={handleItemClick}
        as={Link}
        to="/friends"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
      </Menu.Menu>
    </Menu>
  );
}
