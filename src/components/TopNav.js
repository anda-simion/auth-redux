import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class TopNav extends Component {
  constructor(props) {
    super(props);

    const auth_items = [
      { key: "/", label: "Home" },
      { key: "/login", label: "Login" },
      { key: "/register", label: "Register" }
    ];

    this.state = {
      menu_items: auth_items
    };
  }

  render() {
    return (
      <div>
        {this.state.menu_items.map(menu_item => (
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
      </div>
    );
  }
}

export default TopNav;
