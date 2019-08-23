import React from "react";
import { NavLink } from "react-router-dom";

const TopNav = props => {
  const auth_items = [
    { key: "/dashboard", label: "Dashboard" },
    { key: "/analysis", label: "Analysis" },
    { key: "/logout", label: "Logout" }
  ];

  const not_auth_items = [{ key: "/login", label: "Login" }, { key: "/register", label: "Register" }];

  const general_items = [{ key: "/", label: "Home" }];

  let menu_items = general_items;

  if (props.is_logged_in) {
    menu_items = menu_items.concat(auth_items);
  } else {
    menu_items = menu_items.concat(not_auth_items);
  }

  return (
    <div>
      {menu_items.map(menu_item => (
        <NavLink
          to={menu_item.key}
          exact
          key={menu_item.key}
          activeStyle={{
            fontWeight: "bold",
            color: "red"
          }}>
          {menu_item.label}
        </NavLink>
      ))}
      <span>{props.user && `Logged as: ${props.user.f_name}`}</span>
    </div>
  );
};

export default TopNav;
